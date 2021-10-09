import React from 'react'
import { DebounceInput } from 'react-debounce-input';
import { BiSearch } from 'react-icons/bi'
import { unsplashService } from '../../../services/unsplash.service'
import { connect } from 'react-redux'
import { updateBoard, setSearchBg } from '../../../store/board.actions'
import { Loading } from '../../Loading'

class _ChooseBgImg extends React.Component {
    state = {
        imgs: []
    }

    async componentDidMount() {
        this.getImgs()
    }

    handleChange = async (ev) => {
        const value = ev.target.value
        await this.props.setSearchBg(value)
        this.getImgs()
    }

    getImgs = async () => {
        const imgs = await unsplashService.getImgs(this.props.searchStr, 18)
        this.setState({ imgs })
    }

    setBgImg = (imgIdx) => {
        const img = this.state.imgs[imgIdx]
        const newBoard = { ...this.props.board }
        newBoard.boardStyle = { full: img.full, small: img.small }
        this.props.updateBoard(newBoard, 'changed the board background')
    }

    openLink = (ev) => {
        ev.stopPropagation()
    }

    render() {
        const { imgs } = this.state
        if (!imgs || !imgs.length) return <Loading className="menu-load" />
        return (
            <div className="choose-bg-img">
                <div className="search-photos flex align-center">
                    <BiSearch />
                    <DebounceInput
                        value={this.props.searchStr}
                        minLength={2}
                        debounceTimeout={400}
                        onChange={this.handleChange} />
                </div>
                <div className="bg-img-list flex wrap">
                    {imgs.map((img, idx) => (
                        <div key={img.id} className="bg-img" style={{ backgroundImage: `url(${img.small})` }} onClick={() => this.setBgImg(idx)}>
                            <a href={img.link} target="_blank" onClick={this.openLink}>{img.name}</a>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        searchStr: state.boardReducer.searchBg
    }
}

const mapDispatchToProps = {
    updateBoard,
    setSearchBg
}

export const ChooseBgImg = connect(mapStateToProps, mapDispatchToProps)(_ChooseBgImg)