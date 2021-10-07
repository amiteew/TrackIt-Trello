import React from 'react';
import { connect } from 'react-redux';
import { updateBoard, loadListAndCard, loadBoard, setFilterBy } from '../store/board.actions.js';
import Divider from '@mui/material/Divider';
import { TextareaAutosize } from '@mui/material';
import { DebounceInput } from 'react-debounce-input';
import DoneIcon from '@mui/icons-material/Done';
import AvatarGroup from '@mui/material/AvatarGroup';
import Avatar from '@mui/material/Avatar';

class _SearchMenu extends React.Component {

    state = {
        filterBy: {
            searchKey: '',
            labels: [],
            members: [],
            dueDate: [],
            isFilter: false
        }
    }

    componentDidMount() {
        // const {filterBy} = this.props;

        // console.log('filterby', filterBy);
        // this.setState({ filterBy: { ...this.state.filterBy, searchKey:filterBy.searchKey, members:filterBy.members,labels:filterBy.labels }})
    }

    handleChange = (ev) => {
        const value = ev.target.value;
        const { filterBy } = this.props;
        filterBy.searchKey = value;
        filterBy.isFilter = true;
        this.props.setFilterBy(filterBy, this.props.board._id);
    }

    onFilterBy = (type, id) => {
        let filterType = this.props.filterBy[type];
        const filterIdx = filterType.findIndex(filteryid => filteryid === id)
        // this.onToggleSearch();
        if (filterIdx !== -1) {
            filterType.splice(filterIdx, 1);
        } else {
            filterType.push(id);
        }
        this.setState({ filterBy: { ...this.state.filterBy, [type]: filterType, isFilter: true } }, () => {
            this.props.setFilterBy(this.state.filterBy, this.props.board._id);
        });
    }

    onToggleSearch = (type, id) => {
        return this.props.filterBy[type].some(searchId => searchId === id)
    }

    render() {
        const { board, filterBy } = this.props;
        return (
            <div className="search-cards">
                <DebounceInput
                    minLength={2}
                    debounceTimeout={2000}
                    className="search-cards"
                    type='text'
                    onChange={this.handleChange}
                    forceNotifyByEnter={false}
                    value={filterBy.searchKey}
                />
                <p>Search by term, label or member</p>

                <Divider />
                <div className="search-types">
                    <ul className="clean-list">
                        {board.labels.map(label => (
                            <li className="labels pointer" key={label.id} onClick={() => this.onFilterBy('labels', label.id)} >
                                <div className="label-menu">
                                    <div className="label-list-item">
                                        <div className={`label-menu-color pointer ${label.color}`}>
                                            <span >
                                            </span>
                                        </div>
                                        <span> {this.onToggleSearch('labels', label.id) && <DoneIcon />}</span>
                                    </div>
                                    <span>
                                        {label.title}
                                    </span>
                                </div>
                            </li>
                        ))}
                    </ul>

                    <Divider />
                    <div className="members-type">
                        <ul className="members-search clean-list">
                            {/* <AvatarGroup max={6} > */}
                            {board.boardMembers.map(member => (
                                <li className="members-list flex align-center" key={member._id} onClick={() => this.onFilterBy('members', member._id)} >
                                    <div>
                                        <Avatar alt={member.username} src={member.imgUrl} key={member._id} />
                                    </div>
                                    <span>{member.username}</span>
                                    <span> {this.onToggleSearch('members', member._id) && <DoneIcon />}</span>
                                </li>
                            ))}
                            {/* </AvatarGroup> */}
                        </ul>
                    </div>
                </div>
            </div>
        )

    }
}

function mapStateToProps(state) {
    return {
        board: state.boardReducer.board,
        loggedInUser: state.userReducer.loggedInUser,
        filterBy: state.boardReducer.filterBy,
    }
}
const mapDispatchToProps = {
    updateBoard,
    loadListAndCard,
    loadBoard,
    setFilterBy
}

export const SearchMenu = connect(mapStateToProps, mapDispatchToProps)(_SearchMenu)