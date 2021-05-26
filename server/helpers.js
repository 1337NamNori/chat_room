let users = [];

const addUser = (socketID, roomID, userID, username) => {
    const exist = users.some(
        (user) => user.userID === userID && user.roomID === roomID,
    );
    if (exist) {
        return { error: 'User already exists in this room' };
    } else {
        const user = { socketID, roomID, userID, username };
        users.push(user);
        return { user };
    }
};

const removeUser = (socketID) => {
    const index = users.findIndex((user) => user.socketID === socketID);
    if (index !== -1) {
        return users.splice(index, 1)[0];
    }
};

const getUser = (socketID) => users.find((user) => user.socketID === socketID);

module.exports = {
    addUser,
    removeUser,
    getUser,
};
