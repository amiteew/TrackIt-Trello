import React from 'react';
import Avatar from '@mui/material/Avatar';
import { connect } from 'react-redux';
import { loadBoards, removeBoard, addBoard, updateBoard } from '../../store/board.actions.js';
import DoneIcon from '@mui/icons-material/Done';
import { unsplashService } from '../../services/unsplash.service';
import { color } from '@mui/system';
import { SearchForCover } from '../DynamicPopover/SearchForCover';
import { cloudinaryService } from '../../services/cloudinary.service.js';


class _CoverPopover extends React.Component {
    state = {
        board: null,
        currListIdx: null,
        currCardIdx: null,
        isCoverSelected: 'selected',
        coverImgs: [],
        isSearch: false,
        searchCover: '',
    }

    componentDidMount() {
        const { board, currListIdx, currCardIdx } = this.props
        this.setState({ board, currListIdx, currCardIdx });
        this.getImgForCover(6);
    }

    onToggleCover = async (cover) => {
        const { currListIdx, currCardIdx } = this.state
        const newBoard = { ...this.state.board }
        const currCard = newBoard.lists[currListIdx].cards[currCardIdx]
        if (this.isCoverOnCard(currCard, cover.id)) {
            newBoard.lists[currListIdx].cards[currCardIdx].cardStyle = {}
            var action = `Removed Cover from `
        } else {
            newBoard.lists[currListIdx].cards[currCardIdx].cardStyle = {
                id: cover.id,
                color: cover.color,
                isCover: false
            }
            var action = `Added Cover to `
        }
        await this.props.updateBoard(newBoard, action, currCard)
    }

    isCoverOnCard = (currCard, coverId) => {
        return (currCard.cardStyle.id === coverId)
    }

    handelSize = (currCard, isCover) => {
        const { board } = this.props
        currCard.cardStyle.isCover = isCover;
        this.props.updateBoard(board);
    }

    onRemoveCover = (currCard) => {
        const { board } = this.props;
        currCard.cardStyle = {};
        var action = `Removed Cover from `
        this.props.updateBoard(board, action, currCard);
    }

    handleChange = (ev) => {
        const value = ev.target.value
        this.setState({ searchCover: value }, () => { this.getImgForCover(12) })
    }

    getImgForCover = async (imgToShow, key = '') => {
        let { searchCover } = this.state;
        if (key) {
            searchCover = key
        }
        const coverImgs = await unsplashService.getImgs(searchCover, imgToShow);
        this.setState({ ...this.state, coverImgs });
    }

    onToggleImgCover = (currCard, coverImg) => {
        const { board } = this.props;
        if (this.isCoverOnCard(currCard, coverImg.id)) {
            currCard.cardStyle = {}
            var action = `Removed Cover from `
        } else {
            currCard.cardStyle = {
                id: coverImg.id,
                img: coverImg.small,
                isCover: false
            }
            var action = `Added Cover to `
        }
        this.props.updateBoard(board, action, currCard)
    }

    onAddImage = async (ev) => {
        const coverUploadImg = await cloudinaryService.uploadFile(ev);
        this.onSaveCover(coverUploadImg);
    }

    onSaveCover = (coverUploadImg) => {
        const { board, currListIdx, currCardIdx } = this.props;
        const currCard = board.lists[currListIdx].cards[currCardIdx];
        if (this.isCoverOnCard(currCard, coverUploadImg.id)) {
            currCard.cardStyle = {}
            var action = `Removed Cover from `
        } else {
            currCard.cardStyle = {
                id: coverUploadImg.id,
                img: coverUploadImg.url,
                isCover: false
            }
            var action = `Added Cover to `
        }
        currCard.attachments.unshift(coverUploadImg);
        this.props.updateBoard(board, action, currCard)

    }


    render() {
        const { board, currListIdx, currCardIdx, coverImgs, isSearch, searchCover } = this.state
        if (!board || currCardIdx === null || currListIdx === null) return <></>
        const currCard = board.lists[currListIdx].cards[currCardIdx];
        const halfCover = !currCard.cardStyle.isCover ? 'selected' : '';
        const fullCover = currCard.cardStyle.isCover ? 'selected' : '';
        return (
            <section className="popover-cover">
                {isSearch && <SearchForCover searchCover={searchCover} getImgForCover={this.getImgForCover} handleChange={this.handleChange} />}
                {!isSearch && <h4>Size</h4>}
                {!isSearch && <div className="header-cover">
                    <div onClick={() => { this.handelSize(currCard, false) }} className={`header-half-cover pointer  ${halfCover}`}>
                        <div className="paragraph"></div>
                        <div className="row"></div>
                        <div className="row second"></div>
                    </div>
                    <div onClick={() => { this.handelSize(currCard, true) }} className={`header-full-cover pointer ${fullCover}`}>
                        <div className="row full"></div>
                        <div className="row second full"></div>
                    </div>
                    {currCard.cardStyle.id && <span onClick={() => { this.onRemoveCover(currCard) }}>Remove cover</span>}
                </div>}
                {!isSearch && <h4>Colors</h4>}
                {!isSearch && <div className="color-plate">
                    {board.covers.length && board.covers.map(cover => (
                        <div key={cover.id} onClick={() => this.onToggleCover(cover)}
                            className={`color-sqr pointer ${cover.color} 
                             ${this.isCoverOnCard(currCard, cover.id) ? 'color-selected' : ''} `}>
                        </div>
                    ))}
                </div>}

                {!isSearch && <div>
                    <label htmlFor="file-input">
                        <div className="uplaod-img">Upload a cover image</div>
                    </label>
                    <input type="file" className="file-input" id={'file-input'} onChange={this.onAddImage} />
                </div>}

                <div className="cover-img-plate">
                    {coverImgs.map(coverImg => (<div key={coverImg.id} onClick={() => this.onToggleImgCover(currCard, coverImg)}
                        className={`img-cover ${this.isCoverOnCard(currCard, coverImg.id) ? 'cover-selected' : ''} `} style={{ backgroundImage: `url(${coverImg.small})` }}></div>))}
                </div>
                <div>
                    {!isSearch && <p onClick={() => {
                        this.setState({ ...this.state, isSearch: !this.state.isSearch })
                    }}>Search for photos</p>}
                </div>
            </section>
        )
    }
}

function mapStateToProps(state) {
    return {
        boards: state.boardReducer.boards
    }
}

const mapDispatchToProps = {
    loadBoards,
    removeBoard,
    addBoard,
    updateBoard
}

export const CoverPopover = connect(mapStateToProps, mapDispatchToProps)(_CoverPopover)