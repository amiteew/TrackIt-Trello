import React from "react";
import { DebounceInput } from "react-debounce-input";
export class SearchForCover extends React.Component {
  componentDidMount() {
    this.props.getImgForCover(9);
  }

  render() {
    const { handleChange, searchCover, getImgForCover } = this.props;
    const searchKey = [
      "Animals",
      "Business",
      "Architect",
      "Construction",
      "Organization",
      "Foundation",
      "Minimal",
      "Space",
      "Perspective",
    ];
    return (
      <div className="search-cover">
        <div className="search-cover-input">
          <DebounceInput
            minLength={2}
            debounceTimeout={400}
            className="search-cover-img text-area-auto"
            placeholder="Search unsplash photo..."
            type="text"
            onChange={handleChange}
            value={searchCover}
          />
        </div>
        <h4>Suggested searches</h4>
        <div className="suggested-keywords">
          {searchKey.map((key, idx) => (
            <button
              className="suggested-search-btn"
              key={idx}
              onClick={() => {
                getImgForCover(12, key);
              }}
            >
              {key}
            </button>
          ))}
        </div>
      </div>
    );
  }
}
