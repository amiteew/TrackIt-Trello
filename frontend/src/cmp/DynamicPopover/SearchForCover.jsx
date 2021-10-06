import React from 'react';
import { TextareaAutosize } from '@mui/material';
import { unsplashService } from '../../services/unsplash.service';
import { DebounceInput } from 'react-debounce-input';
export class SearchForCover extends React.Component {
    // state = {
    //     searchCover: '',
    // }

    componentDidMount() {
        this.props.getImgForCover(9);
    }

    // handleChange = (ev) => {
    //     const value = ev.target.value;
    //     this.setState({ searchCover: value })
    // }

    // getImgForCover = async () => {
    //     const { searchCover } = this.state;
    //     const coverImgs = await unsplashService.getImgs(searchCover, 9);
    //     this.setState({ ...this.state, coverImgs });
    // }

    render() {
        // const { searchCover } = this.state;
        const { handleChange, searchCover, getImgForCover } = this.props;
        const searchKey = ['Animals', 'Business', 'Nature', 'Organization', 'Colorful', 'Minimal', 'Space', 'Perspective'];
        return (
            <div className="search-cover">
                <div className="search-cover-input">
                    <DebounceInput 
                        minLength={2}
                        debounceTimeout={400}
                        className="search-cover-img text-area-auto"
                        placeholder="Search unsplash photo..."
                        type='text'
                        onChange={handleChange}
                        value={searchCover}
                    />
                </div>
                <h4>Suggested searches</h4>
                <div className="suggested-keywords">
                    {searchKey.map((key, idx) => (
                        <button className="suggested-search-btn" key={idx} onClick={() => { getImgForCover(12, key) }}>
                            {key}
                        </button>))}
                </div>

            </div>
        )
    }
}