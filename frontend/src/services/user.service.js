import { storageService } from './async-storage.service'
import { httpService } from './http.service'
// import { socketService, SOCKET_EVENT_USER_UPDATED } from './socket.service'

const USER_KEY = 'usersDB'
const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'
const GUEST_USER_ID = '615f4586c375bb154681275d'

export const userService = {
    login,
    logout,
    signup,
    getLoggedinUser,
    getUsers,
    getById,
    remove,
    update,
    filterUserBoards,
    isBoardStarred,
    toggleStarBoard,
    getGuestUser
}
function getUsers() {
    return httpService.get(`user`);
}

async function getById(userId) {
    const user = await httpService.get(`user/${userId}`)
    return user;
}
function remove(userId) {
    return storageService.remove(USER_KEY, userId)
}

async function update(user) {
    await storageService.put(USER_KEY, user)
    if (getLoggedinUser()._id === user._id) _saveLocalUser(user)
    return user;
}

async function login(userCred) {

    const user = await httpService.post('auth/login', userCred)
    if (!user) {
        throw new Error('login service error')
    }
    return _saveLocalUser(user)

}
async function signup(userCred) {
    userCred.initials = _getUserInitials(userCred.fullname)
    const user = await httpService.post('auth/signup', userCred)
    return _saveLocalUser(user)
}
async function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
    return await httpService.post('auth/logout')
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER) || 'null')
}

async function getGuestUser() {
    const guest = await getById(GUEST_USER_ID)
    return guest
}

function filterUserBoards(boards, userId, type) {
    return boards.filter(board => {
        if (!board.createdBy) return false
        if (type === "all") return true
        else if (type === "owner") return (board.createdBy._id === userId)
        else if (type === "guest") return (board.createdBy._id !== userId)
        else if (type === "starred") return isBoardStarred(board, userId)
        else return []
    })
}

function isBoardStarred(board, userId) {
    const memberIdx = board.boardMembers.findIndex(member => member._id === userId)
    if (memberIdx > -1) return board.boardMembers[memberIdx].isStarred
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


