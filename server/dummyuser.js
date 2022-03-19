const users = [];
// users join the room 
function userJoin(id, username, room) {
    const user = { id, username, room};

    users.push(user);
    console.log(users, 'users ');

    return user;
}
console.log('users Out => ', users);
// Get current user
function getCurrentuser(id) {
    return users.find((user) => users.id == id);
}

// leave the room
function leaveRoom(id) {
    const index = users.findIndex((user) => user.id == id)

    if (index !== -1) {
        return users.splice(index, 1)[0];
    }
}

module.exports = {
    userJoin,
    getCurrentuser,
    leaveRoom,
};