let users = [];

const addUser = (socketID, roomID, userID, username) => {
    const exist = users.some(user => user.userID === userID && user.roomID === roomID);
    if (exist) {
        return { error: 'User already exists in this room' };
    } else {
        const user = { socketID, roomID, userID, username };
        users.push(user);
        console.log(users);
        return { user };
    }
}

module.exports = {
    addUser,
}