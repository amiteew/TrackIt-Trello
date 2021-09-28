import { userService } from '../services/user.service.js'


const initialState = {
    loggedInUser: userService.getLoggedinUser()
}
export function userReducer(state = initialState, action) {
    var newState = state;
    switch (action.type) {
        case 'SET_USER':
            newState = { ...state, loggedInUser: action.user }
            break;
        default:
    }
    // For debug:
    // window.userState = newState;
    // console.log('State:', newState);
    return newState;

}
