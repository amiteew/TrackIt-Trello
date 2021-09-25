import React from 'react';
import { connect } from 'react-redux';
import { loadBoards } from '../store/board.actions.js'
import { boardService } from '../services/board.service.js'
import { NativeSelect, FormControl, InputLabel } from '@mui/material';
import { MenuItem } from '@mui/material';


class _MoveCard extends React.Component {
    state = {
        boardsCount: 0,
        listsCount: 0,
        cardsCount: 0
    }

    // componentDidMount() {
    //     this.props.loadBoards();
    // }

    countOptions = () => {
        const { boards } = this.props;
        const trelloCount = boards.reduce((acc, board) => {
            board.lists.forEach(list => {
                acc['listsCount']++
                list.cards.forEach(card => {
                    acc['cardsCount']++;
                })
            });
            return acc
        }, { listsCount: 0, cardsCount: 0 })
        trelloCount.boardsCount = boards.length;
    }

    render() {
        const { boards } = this.props;
        console.log(boards);
        return (
            <div>
                <FormControl fullWidth>
                    <InputLabel variant="standard" htmlFor="uncontrolled-native">
                        position
                    </InputLabel>
                    <NativeSelect
                        value={'hello'}
                        inputProps={{
                            name: 'position',
                            id: 'uncontrolled-native',
                        }}
                    >
                         <MenuItem value={'hello'}>{'hello'}</MenuItem>                        
                    </NativeSelect>
                </FormControl>
                <p onClick={this.countOptions}>hello</p>
            </div>
        )
    }

}
function mapStateToProps(state) {
    return {
        boards: state.boardReducer.boards
    }
}
const mapDispatchToProps = {
    loadBoards
}

export const MoveCard = connect(mapStateToProps, mapDispatchToProps)(_MoveCard)