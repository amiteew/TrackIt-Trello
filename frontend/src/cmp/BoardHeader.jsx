import React from "react"
import { connect } from 'react-redux'
import { IconContext } from "react-icons";
import { FiStar } from 'react-icons/fi';
import { BsThreeDots } from "react-icons/bs";
import AutosizeInput from 'react-input-autosize';
import { userService } from "../services/user.service"
import { updateBoard, setNotif, setFilterBy, addBoard, setSearchBg } from "../store/board.actions"
import { MembersListBoard } from "./MembersListBoard"
import { TemporaryDrawer } from '../cmp/DroweMenu.jsx';
import { Loading } from "./Loading";
import { DynamicBoardMenu } from "./DynamicBoardMenu";
import { socketService } from '../services/socket.service';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import close from '../assets/imgs/close-filter.svg';
import { DynamicPopover } from "./DynamicPopover";

class _BoardHeader extends React.Component {
  state = {
    isEditTitle: false,
    title: '',
    isMenuOpen: false,
    menuTitle: 'Menu',
    menuTarget: 'main',
    cardsCount: 0
  }

  componentDidMount() {
    this.setState({ title: this.props.board.boardTitle })
    // socketService.setup()

    // socketService.on('sending notification', (isNotif) => {
    //   this.props.setNotif(isNotif)
    // })
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.filterBy && prevProps.filterBy !== this.props.filterBy) {
      this.onFilterCards()
    }
  }

  handleChange = (ev) => {
    const value = ev.target.value
    this.setState({ title: value })
  }

  toggleChangeTitle = () => {
    const { isEditTitle } = this.state
    this.setState({ isEditTitle: !isEditTitle })
  }

  saveBoardTitle = (ev) => {
    ev.preventDefault()
    let { title } = this.state
    const { board, updateBoard } = this.props
    if (!title) title = 'Untitled'
    if (title === board.boardTitle) {
      this.toggleChangeTitle()
      return
    }
    board.boardTitle = title
    updateBoard(board, "changed board title")
    this.toggleChangeTitle()
  }

  onToggleStarBoard = () => {
    const { board, updateBoard, loggedInUser } = this.props
    const updatedBoard = userService.toggleStarBoard(board, loggedInUser._id)
    updateBoard(updatedBoard)
  }

  onFilterCards = () => {
    const { board, filterBy } = this.props;
    if (!filterBy.members.length && !filterBy.labels.length && filterBy.searchKey === '') {
      this.setState({ ...this.state, cardsCount: 0 });
      filterBy.isFilter = false;
    } else {
      this.setState({ ...this.state, cardsCount: board.cardsCount });
    }
  }

  resetSearch = () => {
    this.props.setFilterBy({
      searchKey: '',
      labels: [],
      members: [],
      isFilter: false
    }, this.props.board._id)
    this.setState({ ...this.state, cardsCount: 0 });
  }

  toggleMenu = () => {
    const { isMenuOpen } = this.state
    // this.setState(prevState => ({ ...prevState, isMenuOpen: !isMenuOpen }))
    this.setState(prevState => ({ ...prevState, isMenuOpen: !isMenuOpen, menuTitle: 'Menu', menuTarget: 'main' }))
    this.props.setSearchBg('')
  }

  changeMenu = (menuTitle, menuTarget) => {
    this.setState(prevState => ({ ...prevState, menuTitle, menuTarget }))
  }

  cloneTemplate = async () => {
    const newBoard = { ...this.props.board }
    delete newBoard._id
    newBoard.createdBy = this.props.loggedInUser
    newBoard.boardMembers.push(this.props.loggedInUser)
    const addedBoard = await this.props.addBoard(newBoard)
    this.props.goToTemplateClone(addedBoard._id)
  }

  render() {
    const { board, loggedInUser, filterBy } = this.props
    const { title, isEditTitle, isMenuOpen, menuTarget, menuTitle, notification } = this.state
    const isStarred = board.createdBy ? userService.isBoardStarred(board, loggedInUser._id) : false
    return (
      <div className="board-header flex align-center space-between wrap">
        <div className="header-left flex align-center">
          {!isEditTitle && <h1 className="board-btn header-title" onClick={this.toggleChangeTitle}>{board.boardTitle}</h1>}
          {isEditTitle &&
            <form onSubmit={this.saveBoardTitle}>
              <AutosizeInput
                className="header-title-input"
                autoFocus
                name="boardTitle"
                type="text"
                placeholder="Enter Title"
                value={title}
                inputStyle={{ fontSize: 18, fontWeight: 700, color: "#172b4d" }}
                onChange={this.handleChange}
                onBlur={this.saveBoardTitle}
              />
            </form>
          }
          <button className={`board-btn star ${isStarred ? " active" : ""}`} onClick={this.onToggleStarBoard}>
            <IconContext.Provider value={{ className: "star-icon" }} >
              <FiStar />
            </IconContext.Provider>
          </button>
          <span className="board-header-divider"></span>
          {!board.createdBy && <button className="board-btn template" onClick={this.cloneTemplate}>Create board from template</button>}

          <div className="board-members">
            <MembersListBoard members={board.boardMembers} />
            {/* {board.boardMembers.map((member) => {
              if (member.username === 'pandaguest') return
              return <DynamicPopover type={'boardMember'} titleModal={''} member={member} from="BoardHeader" />
            })} */}
          </div>
          <span className="board-btn invite">
            <DynamicPopover type={'invite'} title={'Invite'} titleModal={'Invite to board'}
              board={board} />
          </span>

        </div>
        <div className="header-right flex">
          {filterBy.isFilter && <div className="cards-count pointer">
            <span onClick={this.openSearchOnMenu} className="number-count">{board.cardsCount} search results</span>
            <span onClick={this.resetSearch} className="close-filter-btn"><img src={close} alt="close" /></span>
          </div>}
          {board.createdBy ? <button className="board-btn flex align-center" onClick={this.props.onOpenDashboard}>
            <span className="icon"><EqualizerIcon /></span>
            <span className="title">Dashboard</span>
          </button> : <></>}
          {!isMenuOpen && <button className="board-btn show-menu flex align-center" onClick={this.toggleMenu}>
            <span className="icon flex justify-center align-center"><BsThreeDots /> </span>
            <span className="title">Show menu</span>
          </button>}
          {isMenuOpen && <DynamicBoardMenu board={board} toggleMenu={this.toggleMenu} onFilterCards={this.onFilterCards}
            isMenuOpen={isMenuOpen} target={menuTarget} title={menuTitle} changeMenu={this.changeMenu} />}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    loggedInUser: state.userReducer.loggedInUser,
    notifCount: state.boardReducer.notifCount,
    filterBy: state.boardReducer.filterBy,
  }
}

const mapDispatchToProps = {
  updateBoard,
  setNotif,
  setFilterBy,
  addBoard,
  setSearchBg
}

export const BoardHeader = connect(mapStateToProps, mapDispatchToProps)(_BoardHeader)