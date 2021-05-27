(this.webpackJsonpclient = this.webpackJsonpclient || []).push([
    [0],
    {
        187: function (e, t, s) {},
        214: function (e, t) {},
        366: function (e, t, s) {},
        369: function (e, t, s) {
            'use strict';
            s.r(t);
            var c = s(0),
                n = s.n(c),
                a = s(168),
                r = s.n(a),
                i = (s(187), s(17)),
                o = s.n(i),
                l = s(30),
                j = s(7),
                u = s(29),
                d = s(6),
                b = Object(c.createContext)(null),
                m = s(70),
                O = s(69),
                h = s.n(O),
                x = s(182),
                p = s(1);
            function f(e) {
                var t = e.message;
                return Object(p.jsxs)('p', {
                    className: 'from-them right-align',
                    children: [t.username, ': ', t.message],
                });
            }
            function v(e) {
                var t = e.message;
                return Object(p.jsx)('p', {
                    className: 'from-me right-align',
                    children: t.message,
                });
            }
            function g(e) {
                var t = e.message,
                    s = e.currentUser === t.userID;
                return Object(p.jsx)('div', {
                    className: 'imessage-item',
                    children: s
                        ? Object(p.jsx)(v, { message: t })
                        : Object(p.jsx)(f, { message: t }),
                });
            }
            function N(e) {
                var t = e.messages,
                    s = e.currentUser;
                return Object(p.jsx)(x.a, {
                    className: 'imessage',
                    children: t.map(function (e) {
                        return Object(p.jsx)(
                            g,
                            { message: e, currentUser: s },
                            e._id,
                        );
                    }),
                });
            }
            function w(e) {
                var t = e.message,
                    s = e.setMessage,
                    c = e.sendMessage;
                return Object(p.jsx)('div', {
                    children: Object(p.jsxs)('form', {
                        children: [
                            Object(p.jsx)('input', {
                                type: 'text',
                                name: 'message',
                                value: t,
                                onChange: function (e) {
                                    return s(e.target.value);
                                },
                            }),
                            Object(p.jsx)('button', {
                                type: 'submit',
                                onClick: c,
                                className: 'btn',
                                children: 'SEND',
                            }),
                        ],
                    }),
                });
            }
            var S, y;
            s(366);
            function C() {
                var e = Object(c.useContext)(b),
                    t = e.user,
                    s = (e.setUser, Object(c.useState)('')),
                    n = Object(j.a)(s, 2),
                    a = n[0],
                    r = n[1],
                    i = Object(c.useState)([]),
                    o = Object(j.a)(i, 2),
                    l = o[0],
                    u = o[1],
                    O = Object(d.g)(),
                    x = O.roomID,
                    f = O.roomName;
                Object(c.useEffect)(function () {
                    S = h()('localhost:5000');
                    var e = t ? t.username : '',
                        s = t ? t._id : '';
                    e &&
                        s &&
                        S.emit('join', { roomID: x, username: e, userID: s });
                }, []),
                    Object(c.useEffect)(
                        function () {
                            S.on('receive-message', function (e) {
                                u([].concat(Object(m.a)(l), [e]));
                            });
                        },
                        [l],
                    ),
                    Object(c.useEffect)(function () {
                        S.on('messages-loaded', function (e) {
                            u(e);
                        });
                    }, []);
                return t
                    ? Object(p.jsxs)('div', {
                          className: 'container',
                          children: [
                              Object(p.jsxs)('h2', {
                                  children: ['Roomname: ', f],
                              }),
                              Object(p.jsx)('h4', {
                                  children: t
                                      ? ''.concat(t.username, "'s Account")
                                      : 'Not Login yet',
                              }),
                              Object(p.jsx)(N, {
                                  messages: l,
                                  currentUser: t ? t._id : '',
                              }),
                              Object(p.jsx)(w, {
                                  message: a,
                                  setMessage: r,
                                  sendMessage: function (e) {
                                      e.preventDefault(),
                                          a &&
                                              S.emit(
                                                  'send-message',
                                                  a,
                                                  x,
                                                  function () {
                                                      return r('');
                                                  },
                                              );
                                  },
                              }),
                          ],
                      })
                    : Object(p.jsx)(d.a, { to: '/login' });
            }
            function k(e) {
                var t = e.name;
                return Object(p.jsx)('div', {
                    children: Object(p.jsx)('div', {
                        className: 'card horizontal',
                        children: Object(p.jsx)('div', {
                            className: 'card-stacked',
                            children: Object(p.jsx)('div', {
                                className: 'card-content',
                                children: Object(p.jsx)('h4', { children: t }),
                            }),
                        }),
                    }),
                });
            }
            function U(e) {
                var t = e.rooms;
                return Object(p.jsx)('div', {
                    children:
                        t &&
                        t.map(function (e) {
                            return Object(p.jsx)(
                                u.b,
                                {
                                    to: '/chat/'
                                        .concat(e._id, '/')
                                        .concat(e.name),
                                    children: Object(p.jsx)(k, {
                                        name: e.name,
                                    }),
                                },
                                e._id,
                            );
                        }),
                });
            }
            function D() {
                var e = Object(c.useState)(''),
                    t = Object(j.a)(e, 2),
                    s = t[0],
                    n = t[1],
                    a = Object(c.useState)([]),
                    r = Object(j.a)(a, 2),
                    i = r[0],
                    o = r[1],
                    l = 'localhost:5000';
                Object(c.useEffect)(
                    function () {
                        return (
                            (y = h()(l)),
                            function () {
                                y.emit('disconnect'), y.off();
                            }
                        );
                    },
                    [l],
                ),
                    Object(c.useEffect)(
                        function () {
                            y.on('room-created', function (e) {
                                o([].concat(Object(m.a)(i), [e]));
                            });
                        },
                        [i],
                    ),
                    Object(c.useEffect)(function () {
                        y.on('rooms-loaded', function (e) {
                            o(e);
                        });
                    }, []);
                var u = Object(c.useContext)(b),
                    O = u.user;
                u.setUser;
                return O
                    ? Object(p.jsx)('div', {
                          className: 'container',
                          children: Object(p.jsxs)('div', {
                              className: 'row',
                              children: [
                                  Object(p.jsx)('div', {
                                      className: 'col s12 m6',
                                      children: Object(p.jsx)('div', {
                                          className: 'card blue-grey darken-1',
                                          children: Object(p.jsxs)('div', {
                                              className:
                                                  'card-content white-text',
                                              children: [
                                                  Object(p.jsxs)('span', {
                                                      className: 'card-title',
                                                      children: [
                                                          'Welcome ',
                                                          O ? O.username : '',
                                                      ],
                                                  }),
                                                  Object(p.jsx)('div', {
                                                      className: 'row',
                                                      children: Object(p.jsxs)(
                                                          'form',
                                                          {
                                                              className:
                                                                  'col s12',
                                                              onSubmit:
                                                                  function (e) {
                                                                      e.preventDefault(),
                                                                          y.emit(
                                                                              'create-room',
                                                                              s,
                                                                          ),
                                                                          n('');
                                                                  },
                                                              children: [
                                                                  Object(p.jsx)(
                                                                      'div',
                                                                      {
                                                                          className:
                                                                              'row',
                                                                          children:
                                                                              Object(
                                                                                  p.jsxs,
                                                                              )(
                                                                                  'div',
                                                                                  {
                                                                                      className:
                                                                                          'input-field col s12',
                                                                                      children:
                                                                                          [
                                                                                              Object(
                                                                                                  p.jsx,
                                                                                              )(
                                                                                                  'input',
                                                                                                  {
                                                                                                      placeholder:
                                                                                                          'Enter a Room Name',
                                                                                                      id: 'room-name',
                                                                                                      type: 'text',
                                                                                                      className:
                                                                                                          'validate',
                                                                                                      value: s,
                                                                                                      onChange:
                                                                                                          function (
                                                                                                              e,
                                                                                                          ) {
                                                                                                              return n(
                                                                                                                  e
                                                                                                                      .target
                                                                                                                      .value,
                                                                                                              );
                                                                                                          },
                                                                                                  },
                                                                                              ),
                                                                                              Object(
                                                                                                  p.jsx,
                                                                                              )(
                                                                                                  'label',
                                                                                                  {
                                                                                                      htmlFor:
                                                                                                          'room-name',
                                                                                                      children:
                                                                                                          'Room',
                                                                                                  },
                                                                                              ),
                                                                                          ],
                                                                                  },
                                                                              ),
                                                                      },
                                                                  ),
                                                                  Object(p.jsx)(
                                                                      'button',
                                                                      {
                                                                          className:
                                                                              'btn',
                                                                          children:
                                                                              'Create Room',
                                                                      },
                                                                  ),
                                                              ],
                                                          },
                                                      ),
                                                  }),
                                              ],
                                          }),
                                      }),
                                  }),
                                  Object(p.jsx)('div', {
                                      className: 'col s12 m6',
                                      children: Object(p.jsx)(U, { rooms: i }),
                                  }),
                              ],
                          }),
                      })
                    : Object(p.jsx)(d.a, { to: '/login' });
            }
            function E(e) {
                var t = e.logout;
                return Object(p.jsx)('div', {
                    children: Object(p.jsx)('li', {
                        onClick: t,
                        children: Object(p.jsx)('a', {
                            href: '#',
                            children: 'Logout',
                        }),
                    }),
                });
            }
            function F() {
                return Object(p.jsxs)('div', {
                    children: [
                        Object(p.jsx)('li', {
                            children: Object(p.jsx)('a', {
                                href: '/login',
                                children: 'Login',
                            }),
                        }),
                        Object(p.jsx)('li', {
                            children: Object(p.jsx)('a', {
                                href: '/signup',
                                children: 'Signup',
                            }),
                        }),
                    ],
                });
            }
            function I() {
                var e = Object(c.useContext)(b),
                    t = e.user,
                    s = e.setUser,
                    n = (function () {
                        var e = Object(l.a)(
                            o.a.mark(function e() {
                                var t, c;
                                return o.a.wrap(
                                    function (e) {
                                        for (;;)
                                            switch ((e.prev = e.next)) {
                                                case 0:
                                                    return (
                                                        (e.prev = 0),
                                                        (e.next = 3),
                                                        fetch(
                                                            'http://localhost:5000/logout',
                                                            {
                                                                credentials:
                                                                    'include',
                                                            },
                                                        )
                                                    );
                                                case 3:
                                                    return (
                                                        (t = e.sent),
                                                        (e.next = 6),
                                                        t.json()
                                                    );
                                                case 6:
                                                    (c = e.sent),
                                                        console.log(c),
                                                        s(null),
                                                        (e.next = 14);
                                                    break;
                                                case 11:
                                                    (e.prev = 11),
                                                        (e.t0 = e.catch(0)),
                                                        console.log(e.t0);
                                                case 14:
                                                case 'end':
                                                    return e.stop();
                                            }
                                    },
                                    e,
                                    null,
                                    [[0, 11]],
                                );
                            }),
                        );
                        return function () {
                            return e.apply(this, arguments);
                        };
                    })(),
                    a = t
                        ? Object(p.jsx)(E, { logout: n })
                        : Object(p.jsx)(F, {});
                return Object(p.jsxs)('div', {
                    children: [
                        Object(p.jsx)('nav', {
                            children: Object(p.jsxs)('div', {
                                className: 'nav-wrapper container',
                                children: [
                                    Object(p.jsx)('a', {
                                        href: '/',
                                        className: 'brand-logo',
                                        children: 'ChatRoom',
                                    }),
                                    Object(p.jsx)('a', {
                                        href: '#',
                                        'data-target': 'mobile-demo',
                                        className: 'sidenav-trigger',
                                        children: Object(p.jsx)('i', {
                                            className: 'material-icons',
                                            children: 'menu',
                                        }),
                                    }),
                                    Object(p.jsx)('ul', {
                                        className: 'right hide-on-med-and-down',
                                        children: a,
                                    }),
                                ],
                            }),
                        }),
                        Object(p.jsx)('ul', {
                            className: 'sidenav',
                            id: 'mobile-demo',
                            children: a,
                        }),
                    ],
                });
            }
            function L() {
                var e = Object(c.useContext)(b),
                    t = e.user,
                    s = e.setUser,
                    n = Object(c.useState)(''),
                    a = Object(j.a)(n, 2),
                    r = a[0],
                    i = a[1],
                    u = Object(c.useState)(''),
                    m = Object(j.a)(u, 2),
                    O = m[0],
                    h = m[1],
                    x = Object(c.useState)(''),
                    f = Object(j.a)(x, 2),
                    v = f[0],
                    g = f[1],
                    N = Object(c.useState)(''),
                    w = Object(j.a)(N, 2),
                    S = w[0],
                    y = w[1],
                    C = (function () {
                        var e = Object(l.a)(
                            o.a.mark(function e(t) {
                                var c, n;
                                return o.a.wrap(
                                    function (e) {
                                        for (;;)
                                            switch ((e.prev = e.next)) {
                                                case 0:
                                                    return (
                                                        t.preventDefault(),
                                                        h(''),
                                                        y(''),
                                                        (e.prev = 3),
                                                        (e.next = 6),
                                                        fetch(
                                                            'http://localhost:5000/login',
                                                            {
                                                                method: 'POST',
                                                                credentials:
                                                                    'include',
                                                                body: JSON.stringify(
                                                                    {
                                                                        username:
                                                                            r,
                                                                        password:
                                                                            v,
                                                                    },
                                                                ),
                                                                headers: {
                                                                    'Content-Type':
                                                                        'application/json',
                                                                },
                                                            },
                                                        )
                                                    );
                                                case 6:
                                                    return (
                                                        (c = e.sent),
                                                        (e.next = 9),
                                                        c.json()
                                                    );
                                                case 9:
                                                    (n = e.sent).errors &&
                                                        (h(n.errors.username),
                                                        y(n.errors.password)),
                                                        n.user && s(n.user),
                                                        (e.next = 17);
                                                    break;
                                                case 14:
                                                    (e.prev = 14),
                                                        (e.t0 = e.catch(3)),
                                                        console.log(e.t0);
                                                case 17:
                                                case 'end':
                                                    return e.stop();
                                            }
                                    },
                                    e,
                                    null,
                                    [[3, 14]],
                                );
                            }),
                        );
                        return function (t) {
                            return e.apply(this, arguments);
                        };
                    })();
                return t
                    ? Object(p.jsx)(d.a, { to: '/' })
                    : Object(p.jsxs)('div', {
                          className: 'container',
                          children: [
                              Object(p.jsx)('h2', {
                                  className: 'center',
                                  children: 'Login',
                              }),
                              Object(p.jsx)('div', {
                                  className: 'row',
                                  children: Object(p.jsxs)('form', {
                                      className: 'col s12',
                                      onSubmit: C,
                                      children: [
                                          Object(p.jsx)('div', {
                                              className: 'row',
                                              children: Object(p.jsxs)('div', {
                                                  className:
                                                      'input-field col s12',
                                                  children: [
                                                      Object(p.jsx)('input', {
                                                          id: 'username',
                                                          name: 'username',
                                                          type: 'text',
                                                          className: 'validate',
                                                          value: r,
                                                          onChange: function (
                                                              e,
                                                          ) {
                                                              return i(
                                                                  e.target
                                                                      .value,
                                                              );
                                                          },
                                                      }),
                                                      Object(p.jsx)('label', {
                                                          htmlFor: 'username',
                                                          children: 'User Name',
                                                      }),
                                                      Object(p.jsx)('p', {
                                                          className: 'red-text',
                                                          children: O,
                                                      }),
                                                  ],
                                              }),
                                          }),
                                          Object(p.jsx)('div', {
                                              className: 'row',
                                              children: Object(p.jsxs)('div', {
                                                  className:
                                                      'input-field col s12',
                                                  children: [
                                                      Object(p.jsx)('input', {
                                                          id: 'password',
                                                          name: 'password',
                                                          type: 'password',
                                                          className: 'validate',
                                                          value: v,
                                                          onChange: function (
                                                              e,
                                                          ) {
                                                              return g(
                                                                  e.target
                                                                      .value,
                                                              );
                                                          },
                                                      }),
                                                      Object(p.jsx)('label', {
                                                          htmlFor: 'password',
                                                          children: 'Password',
                                                      }),
                                                      Object(p.jsx)('p', {
                                                          className: 'red-text',
                                                          children: S,
                                                      }),
                                                  ],
                                              }),
                                          }),
                                          Object(p.jsx)('div', {
                                              className: 'row center',
                                              children: Object(p.jsx)(
                                                  'button',
                                                  {
                                                      type: 'submit',
                                                      className: 'btn',
                                                      children: 'Log In',
                                                  },
                                              ),
                                          }),
                                      ],
                                  }),
                              }),
                          ],
                      });
            }
            function P() {
                var e = Object(c.useContext)(b),
                    t = e.user,
                    s = e.setUser,
                    n = Object(c.useState)(''),
                    a = Object(j.a)(n, 2),
                    r = a[0],
                    i = a[1],
                    u = Object(c.useState)(''),
                    m = Object(j.a)(u, 2),
                    O = m[0],
                    h = m[1],
                    x = Object(c.useState)(''),
                    f = Object(j.a)(x, 2),
                    v = f[0],
                    g = f[1],
                    N = Object(c.useState)(''),
                    w = Object(j.a)(N, 2),
                    S = w[0],
                    y = w[1],
                    C = Object(c.useState)(''),
                    k = Object(j.a)(C, 2),
                    U = k[0],
                    D = k[1],
                    E = Object(c.useState)(''),
                    F = Object(j.a)(E, 2),
                    I = F[0],
                    L = F[1],
                    P = (function () {
                        var e = Object(l.a)(
                            o.a.mark(function e(t) {
                                var c, n;
                                return o.a.wrap(
                                    function (e) {
                                        for (;;)
                                            switch ((e.prev = e.next)) {
                                                case 0:
                                                    return (
                                                        t.preventDefault(),
                                                        h(''),
                                                        L(''),
                                                        y(''),
                                                        (e.prev = 4),
                                                        (e.next = 7),
                                                        fetch(
                                                            'http://localhost:5000/signup',
                                                            {
                                                                method: 'POST',
                                                                credentials:
                                                                    'include',
                                                                body: JSON.stringify(
                                                                    {
                                                                        username:
                                                                            r,
                                                                        password:
                                                                            v,
                                                                        email: U,
                                                                    },
                                                                ),
                                                                headers: {
                                                                    'Content-Type':
                                                                        'application/json',
                                                                },
                                                            },
                                                        )
                                                    );
                                                case 7:
                                                    return (
                                                        (c = e.sent),
                                                        (e.next = 10),
                                                        c.json()
                                                    );
                                                case 10:
                                                    (n = e.sent).errors &&
                                                        (h(n.errors.username),
                                                        L(n.errors.email),
                                                        y(n.errors.password)),
                                                        n.user && s(n.user),
                                                        (e.next = 18);
                                                    break;
                                                case 15:
                                                    (e.prev = 15),
                                                        (e.t0 = e.catch(4)),
                                                        console.log(e.t0);
                                                case 18:
                                                case 'end':
                                                    return e.stop();
                                            }
                                    },
                                    e,
                                    null,
                                    [[4, 15]],
                                );
                            }),
                        );
                        return function (t) {
                            return e.apply(this, arguments);
                        };
                    })();
                return t
                    ? Object(p.jsx)(d.a, { to: '/' })
                    : Object(p.jsxs)('div', {
                          className: 'container',
                          children: [
                              Object(p.jsx)('h2', {
                                  className: 'center-align',
                                  children: 'Signup',
                              }),
                              Object(p.jsx)('div', {
                                  className: 'row',
                                  children: Object(p.jsxs)('form', {
                                      className: 'col s12',
                                      onSubmit: P,
                                      children: [
                                          Object(p.jsx)('div', {
                                              className: 'row',
                                              children: Object(p.jsxs)('div', {
                                                  className:
                                                      'input-field col s12',
                                                  children: [
                                                      Object(p.jsx)('input', {
                                                          id: 'username',
                                                          name: 'username',
                                                          type: 'text',
                                                          className: 'validate',
                                                          value: r,
                                                          onChange: function (
                                                              e,
                                                          ) {
                                                              return i(
                                                                  e.target
                                                                      .value,
                                                              );
                                                          },
                                                      }),
                                                      Object(p.jsx)('label', {
                                                          htmlFor: 'username',
                                                          children: 'User Name',
                                                      }),
                                                      Object(p.jsx)('p', {
                                                          className: 'red-text',
                                                          children: O,
                                                      }),
                                                  ],
                                              }),
                                          }),
                                          Object(p.jsx)('div', {
                                              className: 'row',
                                              children: Object(p.jsxs)('div', {
                                                  className:
                                                      'input-field col s12',
                                                  children: [
                                                      Object(p.jsx)('input', {
                                                          id: 'email',
                                                          name: 'email',
                                                          type: 'email',
                                                          className: 'validate',
                                                          value: U,
                                                          onChange: function (
                                                              e,
                                                          ) {
                                                              return D(
                                                                  e.target
                                                                      .value,
                                                              );
                                                          },
                                                      }),
                                                      Object(p.jsx)('label', {
                                                          htmlFor: 'email',
                                                          children: 'Email',
                                                      }),
                                                      Object(p.jsx)('p', {
                                                          className: 'red-text',
                                                          children: I,
                                                      }),
                                                  ],
                                              }),
                                          }),
                                          Object(p.jsx)('div', {
                                              className: 'row',
                                              children: Object(p.jsxs)('div', {
                                                  className:
                                                      'input-field col s12',
                                                  children: [
                                                      Object(p.jsx)('input', {
                                                          id: 'password',
                                                          name: 'password',
                                                          type: 'password',
                                                          className: 'validate',
                                                          value: v,
                                                          onChange: function (
                                                              e,
                                                          ) {
                                                              return g(
                                                                  e.target
                                                                      .value,
                                                              );
                                                          },
                                                      }),
                                                      Object(p.jsx)('label', {
                                                          htmlFor: 'password',
                                                          children: 'Password',
                                                      }),
                                                      Object(p.jsx)('p', {
                                                          className: 'red-text',
                                                          children: S,
                                                      }),
                                                  ],
                                              }),
                                          }),
                                          Object(p.jsx)('div', {
                                              className: 'row center',
                                              children: Object(p.jsx)(
                                                  'button',
                                                  {
                                                      type: 'submit',
                                                      className: 'btn',
                                                      children: 'Sign Up',
                                                  },
                                              ),
                                          }),
                                      ],
                                  }),
                              }),
                          ],
                      });
            }
            var T = function () {
                    var e = Object(c.useState)(null),
                        t = Object(j.a)(e, 2),
                        s = t[0],
                        n = t[1];
                    return (
                        Object(c.useEffect)(function () {
                            (function () {
                                var e = Object(l.a)(
                                    o.a.mark(function e() {
                                        var t, s;
                                        return o.a.wrap(
                                            function (e) {
                                                for (;;)
                                                    switch ((e.prev = e.next)) {
                                                        case 0:
                                                            return (
                                                                (e.prev = 0),
                                                                (e.next = 3),
                                                                fetch(
                                                                    'http://localhost:5000/verify',
                                                                    {
                                                                        credentials:
                                                                            'include',
                                                                        headers:
                                                                            {
                                                                                'Content-Type':
                                                                                    'application/json',
                                                                            },
                                                                    },
                                                                )
                                                            );
                                                        case 3:
                                                            return (
                                                                (t = e.sent),
                                                                (e.next = 6),
                                                                t.json()
                                                            );
                                                        case 6:
                                                            (s = e.sent) &&
                                                                n(s),
                                                                (e.next = 13);
                                                            break;
                                                        case 10:
                                                            (e.prev = 10),
                                                                (e.t0 =
                                                                    e.catch(0)),
                                                                console.log(
                                                                    e.t0,
                                                                );
                                                        case 13:
                                                        case 'end':
                                                            return e.stop();
                                                    }
                                            },
                                            e,
                                            null,
                                            [[0, 10]],
                                        );
                                    }),
                                );
                                return function () {
                                    return e.apply(this, arguments);
                                };
                            })()();
                        }, []),
                        Object(p.jsx)(u.a, {
                            children: Object(p.jsx)('div', {
                                className: 'App',
                                children: Object(p.jsxs)(b.Provider, {
                                    value: { user: s, setUser: n },
                                    children: [
                                        Object(p.jsx)(I, {}),
                                        Object(p.jsxs)(d.d, {
                                            children: [
                                                Object(p.jsx)(d.b, {
                                                    exact: !0,
                                                    path: '/',
                                                    component: D,
                                                }),
                                                Object(p.jsx)(d.b, {
                                                    path: '/login',
                                                    component: L,
                                                }),
                                                Object(p.jsx)(d.b, {
                                                    path: '/signup',
                                                    component: P,
                                                }),
                                                Object(p.jsx)(d.b, {
                                                    path: '/chat/:roomID/:roomName',
                                                    component: C,
                                                }),
                                            ],
                                        }),
                                    ],
                                }),
                            }),
                        })
                    );
                },
                M = function (e) {
                    e &&
                        e instanceof Function &&
                        s
                            .e(3)
                            .then(s.bind(null, 370))
                            .then(function (t) {
                                var s = t.getCLS,
                                    c = t.getFID,
                                    n = t.getFCP,
                                    a = t.getLCP,
                                    r = t.getTTFB;
                                s(e), c(e), n(e), a(e), r(e);
                            });
                };
            r.a.render(
                Object(p.jsx)(n.a.StrictMode, {
                    children: Object(p.jsx)(T, {}),
                }),
                document.getElementById('root'),
            ),
                M();
        },
    },
    [[369, 1, 2]],
]);
//# sourceMappingURL=main.3c4ed074.chunk.js.map
