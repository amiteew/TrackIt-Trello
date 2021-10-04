import React from 'react'
import { DebounceInput } from 'react-debounce-input';
import { BiSearch } from 'react-icons/bi'
import { unsplashService } from '../../../services/unsplash.service'
import { connect } from 'react-redux'
import { updateBoard } from '../../../store/board.actions'
import { Loading } from '../../Loading'

class _ChooseBgImg extends React.Component {
    state = {
        searchStr: '',
        imgs: []
    }

    async componentDidMount() {
        this.getImgs()
    }

    handleChange = (ev) => {
        const value = ev.target.value
        this.setState({ searchStr: value }, this.getImgs)
    }

    getImgs = async () => {
        // console.log('getting imgs for:', this.state.searchStr);
        const imgs = await unsplashService.getImgs(this.state.searchStr, 18)
        this.setState(prevState => ({ ...prevState, imgs }))
    }

    setBgImg = (imgIdx) => {
        const img = this.state.imgs[imgIdx]
        const newBoard = { ...this.props.board }
        newBoard.boardStyle = { backgroundImage: `url(${img.full})` }
        this.props.updateBoard(newBoard, 'changed the board background image')
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
                        minLength={2}
                        debounceTimeout={400}
                        onChange={this.handleChange} />
                </div>
                <div className="bg-img-list flex wrap">
                  {imgs.map((img,idx) => (
                      <div key={img.id} className="bg-img" style={{backgroundImage: `url(${img.small})`}} onClick={()=>this.setBgImg(idx)}>
                          <a href={img.link} target="_blank" onClick={this.openLink}>{img.name}</a>
                      </div>
                  ))}
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