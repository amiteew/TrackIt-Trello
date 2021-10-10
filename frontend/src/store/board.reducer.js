const initialState = {
  boards: [],
  board: null,
  lastUpdatedBoard: null,
  isLabelOpen: false,
  currCard: null,
  currList: null,
  isNotif: false,
  notifCount: 0,
  filterBy: {
    searchKey: '',
    labels: [],
    members: [],
    isFilter: false,
    cardsCount: 0
  },
  labelsProps: {
    label: {},
    isCreate: false
  },
  searchBg: '',
  isOffline: false
}

export function boardReducer(state = initialState, action = null) {
  switch (action.type) {
    case 'SET_BOARDS':
      return { ...state, boards: action.boards }
    case 'SET_BOARD':
      // console.log('in set board', state.board)
      const lastUpdatedBoard = JSON.parse(JSON.stringify(action.board))
      return { ...state, board: { ...action.board }, lastUpdatedBoard }
    case 'ADD_BOARD':
      return { ...state, board: action.board, boards: [...state.boards, action.board] }
    case 'REMOVE_BOARD':
      return { ...state, boards: state.boards.filter(board => board._id !== action.boardId) }
    // case 'UPDATE_BOARD': {
    //   // console.log('state.board', state.board)
    //   const lastUpdatedBoard = JSON.parse(JSON.stringify(state.board))
    //   // const board = JSON.parse(JSON.stringify(action.board))
    //   return {
    //     ...state, board: action.board, lastUpdatedBoard,
    //     boards: state.boards.map(board =>
    //       board._id === action.board._id ? action.board : board)
    //   }
    // }
    case 'UPDATE_BOARD': {
      return {
        ...state, board: action.board, boards: state.boards.map(board =>
          board._id === action.board._id ? action.board : board)
      }
    }
    case 'UPDATE_LAST_UPDATED_BOARD': {
      const lastUpdatedBoard = JSON.parse(JSON.stringify(state.board))
      return {
        ...state, lastUpdatedBoard
      }
    }
    case 'UNDO_UPDATE_BOARD': {
      if (state.lastUpdatedBoard) {
        const undoLastBoard = JSON.parse(JSON.stringify(state.lastUpdatedBoard))
        return {
          ...state, boards: state.boards.map(board =>
            board._id === state.board._id ? state.lastUpdatedBoard : board),
          board: undoLastBoard
        }
      }
      return state
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
    case 'SET_FILTER':
      return { ...state, filterBy: action.filterBy }
    case 'SET_LABEL':
      return { ...state, labelsProps: action.labelsProps }
    case 'SET_SEARCH_BG':
      return { ...state, searchBg: action.searchStr }
    case 'SET_OFFLINE':
      return { ...state, isOffline: action.isOffline }
    default:
      return state
  }
}
