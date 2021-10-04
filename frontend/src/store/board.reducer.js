const initialState = {
  boards: [],
  board: null,
  isLabelOpen: false,
  currCard: null,
  currList: null,
  isNotif: false,
  notifCount: 0
}

export function boardReducer(state = initialState, action = null) {
  switch (action.type) {
    case 'SET_BOARDS':
      return { ...state, boards: action.boards }
    case 'SET_BOARD':
      return { ...state, board: { ...action.board } }
    case 'ADD_BOARD':
      return { ...state, board: action.board, boards: [...state.boards, action.board] }
    case 'REMOVE_BOARD':
      return { ...state, boards: state.boards.filter(board => board._id !== action.boardId) }
    case 'UPDATE_BOARD': {
      return {
        ...state, board: action.board, boards: state.boards.map(board =>
          board._id === action.board._id ? action.board : board)
      }
    }
    case 'TOGGLE_LABELS': {
      const isLabelOpen = state.isLabelOpen
      return { ...state, isLabelOpen: !isLabelOpen }
    }
    case 'SET_LIST':
      return { ...state, currList: action.list }
    case 'SET_CARD':
      return { ...state, currCard: action.card }
    // return {
    //   ...state, boards: state.boards.map(board => board._id === action.board._id ?
    //     action.board : board)
    // }
    case 'SET_NOTIF':
      return { ...state, isNotif: action.isNotif }
    case 'SET_NOTIF_COUNT':
      return { ...state, notifCount: action.count }
    case 'SET_NOTIF_COUNT++':
      return { ...state, notifCount: state.notifCount + 1 }
    default:
      return state
  }
}
