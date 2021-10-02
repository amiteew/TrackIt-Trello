import { storageService } from './async-storage.service'
import { httpService } from './http.service'
// import { socketService, SOCKET_EVENT_USER_UPDATED } from './socket.service'

const USER_KEY = 'usersDB'
const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'

export const userService = {
    login,
    logout,
    signup,
    getLoggedinUser,
    getUsers,
    getById,
    remove,
    update,
    isBoardStarred,
    toggleStarBoard
}
getUsers()
function getUsers() {
    // return storageService.query(USER_KEY)
    //     .then((users) => {
    //         if (!users.length) {
    //             users = require('../data/users.json');
    //             storageService.save(USER_KEY, users)
    //             return users
    //         }
    //     })
    return httpService.get(`user`);
}

async function getById(userId) {
    // const user = await storageService.get(USER_KEY, userId)
    const user = await httpService.get(`user/${userId}`)
    // gWatchedUser = user;
    return user;
}
function remove(userId) {
    return storageService.remove(USER_KEY, userId)
    // return httpService.delete(`user/${userId}`)
}

async function update(user) {
    await storageService.put(USER_KEY, user)
    // user = await httpService.put(`user/${user._id}`, user)
    // Handle case in which admin updates other user's details
    if (getLoggedinUser()._id === user._id) _saveLocalUser(user)
    return user;
}

async function login(userCred) {
    // console.log('usercred',userCred);
    
    // const users = await storageService.query(USER_KEY)
    console.log('userCred', userCred);
    
    const user = await httpService.post('auth/login', userCred)
    // const user = users.find(user => user.username === userCred.username)
    if (!user) {
        throw new Error('login service error')
    }
    return _saveLocalUser(user)

    // socketService.emit('set-user-socket', user._id);
    // if (user) return _saveLocalUser(user)
}
async function signup(userCred) {
    userCred.initials = _getUserInitials(userCred.fullname)
    // const user = await storageService.post(USER_KEY, userCred)
    const user = await httpService.post('auth/signup', userCred)
    // socketService.emit('set-user-socket', user._id);
    return _saveLocalUser(user)
}
async function logout() {
    // sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
    // socketService.emit('unset-user-socket');
    return await httpService.post('auth/logout')
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER) || 'null')
}

function isBoardStarred(board, userId) {
    return board.boardMembers.find(member => member._id === userId).isStarred
}

function toggleStarBoard(board, userId) {
    const boardMembersIdx = board.boardMembers.findIndex(member => member._id === userId)
    board.boardMembers[boardMembersIdx].isStarred = !board.boardMembers[boardMembersIdx].isStarred
    return board
}

function _saveLocalUser(user) {
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    return user
}

function _getUserInitials(fullname) {
    const nameParts = fullname.split(' ')
    return nameParts.map(part => part.charAt(0).toUpperCase()).join('')
}


// This is relevant when backend is connected
// (async () => {
//     var user = getLoggedinUser()
//     if (user) socketService.emit('set-user-socket', user._id)
// })();

