import React from 'react';
import isWatch from '../assets/imgs/visibiltyIcon.svg';
export class CardVisibilityPreview extends React.Component {


    render() {
        const { cardMembers } = this.props;
        return (
            <div className="card-preview-icon" >
                {cardMembers.map(member => member.isWatch && <img src={isWatch} alt="isWatch" />)}
            </div>
        )

    }

}