import React from 'react';
import isWatch from '../assets/imgs/visibiltyIcon.svg';
export class CardVisibilityPreview extends React.Component {


    render() {
        const { cardMembers } = this.props;
        return (
            <div className="card-preview-icon" >
                {cardMembers.map(member => <div key={member._id}> {member.isWatch && <img src={isWatch} alt="isWatch" />}</div>)}
            </div>
        )

    }

}