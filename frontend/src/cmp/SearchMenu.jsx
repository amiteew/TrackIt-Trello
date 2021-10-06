import React from 'react';
import { connect } from 'react-redux';
import { updateBoard, loadListAndCard, loadBoard, setFilterBy } from '../store/board.actions.js';
import Divider from '@mui/material/Divider';
import { TextareaAutosize } from '@mui/material';
import { DebounceInput } from 'react-debounce-input';

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

    componentDidMount (){
        const {filterBy} = this.props;

        console.log('filterby', filterBy);
        // this.setState({ filterBy: { ...this.state.filterBy, searchKey:filterBy.searchKey, members:filterBy.members,labels:filterBy.labels }})
    }

    handleChange = (ev) => {
        const value = ev.target.value;
        this.setState({ searchKey: value });
        this.setState({ filterBy: { ...this.state.filterBy, searchKey: value, isFilter: true } }, () => {
            this.props.setFilterBy(this.state.filterBy, this.props.board._id);
        })
    }

    onFilterBy = (type, id) => {
        let filterType = this.state.filterBy[type];
        const filterIdx = filterType.findIndex(filteryid => filteryid === id)
        console.log('type', filterIdx);
        if(filterIdx === 0) {
            filterIdx.splice(filterIdx, 1);
        } else{
            filterType.push(id);
        }
        this.setState({ filterBy: { ...this.state.filterBy, [type]: filterType, isFilter: true } }, () => {
            console.log('filter', this.state.filterBy);
            this.props.setFilterBy(this.state.filterBy, this.props.board._id);
        });
    }

    render() {
        const { board, filterBy } = this.props;
        const { searchKey } = this.state;
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
                            <li className="pointer" key={label.id} onClick={() => this.onFilterBy('labels', label.id)} >
                               <div className="label-menu">
                                   <div className="label-list-item">
                                <div className={`label-menu-color pointer ${label.color}`}>
                                    <span >
                                    </span>
                                    </div>
                                </div>
                                <span>
                                    {label.title}
                                </span>
                                </div>
                            </li>
                        ))}
                    </ul>

                    <Divider />
                    <ul className="members-search clean-list">
                        <AvatarGroup max={6} >
                            {board.boardMembers.map(member => (
                                <li key={member._id} onClick={() => this.onFilterBy('members', member._id)} >
                                    <div>
                                        <Avatar alt={member.username} src={member.imgUrl} key={member._id} />
                                    </div>
                                </li>
                            ))}
                        </AvatarGroup>
                    </ul>
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