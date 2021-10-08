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
        } else {
            newBoard.lists[currListIdx].cards[currCardIdx].cardStyle = {
                id: cover.id,
                color: cover.color,
                isCover: false
            }
        }
        await this.props.updateBoard(newBoard)
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
        this.props.updateBoard(board);
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
        } else {
            currCard.cardStyle = {
                id: coverImg.id,
                img: coverImg.small,
                isCover: false
            }
        }
        this.props.updateBoard(board)
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
        } else {
            currCard.cardStyle = {
                id: coverUploadImg.id,
                img: coverUploadImg.url,
                isCover: false
            }
        }
        currCard.attachments.unshift(coverUploadImg);
        this.props.updateBoard(board)

    }


    render() {
        const { board, currListIdx, currCardIdx, coverImgs, searchCover } = this.state
        const { changeTitle, isSearch } = this.props;
        if (!board || currCardIdx === null || currListIdx === null) return <></>
        const currCard = board.lists[currListIdx].cards[currCardIdx];
        const halfCover = !currCard.cardStyle.isCover ? 'selected' : '';
        const fullCover = currCard.cardStyle.isCover ? 'selected' : '';
        return (
            <section className="popover-cover">
                {isSearch && <SearchForCover searchCover={searchCover} getImgForCover={this.getImgForCover} handleChange={this.handleChange} />}
                {!isSearch && <h4>Size</h4>}
                {!isSearch && <div>
                    <div className="header-cover">
                        <div onClick={() => { this.handelSize(currCard, false) }} className={`header-half-cover pointer  ${halfCover}`}>
                            <div className="paragraph"></div>
                            <div className="row"></div>
                            <div className="row second"></div>
                        </div>
                        <div onClick={() => { this.handelSize(currCard, true) }} className={`header-full-cover pointer ${fullCover}`}>
                            <div className="row full"></div>
                            <div className="row second full"></div>
                        </div>
                    </div>
                    {currCard.cardStyle.id && <div className="remove-cover btn" onClick={() => { this.onRemoveCover(currCard) }}>Remove cover</div>}
                </div>
                }

                {/* { <div className="colors-for-cover"> */}
                {!isSearch && <h4 className="color-title">Colors</h4>}
                {!isSearch && <div className="color-plate">
                    {board.covers.length && board.covers.map(cover => (
                        <div key={cover.id} onClick={() => this.onToggleCover(cover)}
                            className={`color-sqr pointer ${cover.color} 
                             ${this.isCoverOnCard(currCard, cover.id) ? 'color-selected' : ''} `}>
                        </div>
                    ))}
                </div>}
                {/* </div>} */}
                {!isSearch && <div>
                    <h4>Attachment</h4>
                    <label htmlFor="file-input">
                        <div className="uplaod-img btn pointer">Upload a cover image</div>
                    </label>
                    <input type="file" className="file-input" id={'file-input'} onChange={this.onAddImage} />
                </div>}

                <div >
                    {!isSearch && <h4>Unsplash</h4>}
                    {isSearch && <h4>Top photos</h4>}
                    <div className="cover-img-plate ">
                        {coverImgs.map(coverImg => (<div key={coverImg.id} onClick={() => this.onToggleImgCover(currCard, coverImg)}
                            className={`img-cover ${this.isCoverOnCard(currCard, coverImg.id) ? 'cover-selected' : ''} `} style={{ backgroundImage: `url(${coverImg.small})` }}></div>))}
                    </div>
                </div>

                <div className="search-cover btn pointer">
                    {!isSearch && <span onClick={() => {
                        changeTitle(true, 'change cover')
                        // this.setState({ ...this.state, isSearch: !this.state.isSearch })
                    }}>Search for photos</span>}
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