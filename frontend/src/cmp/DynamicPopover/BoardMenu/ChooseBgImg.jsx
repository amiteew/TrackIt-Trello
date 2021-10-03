import React from 'react'
import { DebounceInput } from 'react-debounce-input';
import { BiSearch } from 'react-icons/bi'
import { unsplashService } from '../../../services/unsplash.service'
import { connect } from 'react-redux'
import { updateBoard } from "../../../store/board.actions"

class _ChooseBgImg extends React.Component {
    state = {
        searchStr: '',
        imgs: []
    }

    async componentDidMount() {
        const imgs = await this.getImgs()
        this.setState({ imgs }, () => console.log(this.state))
    }

    handleChange = (ev) => {
        const value = ev.target.value
        this.setState({ searchStr: value }, () => console.log(this.state))
        this.getImgs()
    }

    getImgs = () => {
        // const imgs = 
        unsplashService.getImgs(this.state.searchStr, 18)
        // console.log('imgs:', imgs);
    }

    changeBgImg = (imgUrl) => {
        const newBoard = { ...this.props.board }
        newBoard.boardStyle = { backgroundImage: `url(${imgUrl})` }
        this.props.updateBoard(newBoard, 'changed background image')
    }

    render() {
        const { searchStr, imgs } = this.state
        // console.log('render imgs',imgs);
        if (!imgs || !imgs.length) return <></>
        return (
            <div className="choose-bg-img">
                <div className="search-photos flex align-center">
                    <BiSearch />
                    <DebounceInput
                        minLength={2}
                        debounceTimeout={400}
                        onChange={this.handleChange} />
                </div>
                <div className="bg-img-list">

                </div>
            </div>
        )
    }
}

function mapStateToProps() {
    return {}
}

const mapDispatchToProps = {
    updateBoard
}

export const ChooseBgImg = connect(mapStateToProps, mapDispatchToProps)(_ChooseBgImg)