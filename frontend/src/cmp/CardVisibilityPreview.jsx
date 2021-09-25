import React from 'react';
import isWatch from '../assets/imgs/visibiltyIcon.svg';
export class CardVisibilityPreview extends React.Component {


    render() {
        const { cardMembers } = this.props;
        return (
            <span>
                {cardMembers.map(member => <span key={member._id}> {member.isWatch && <img src={isWatch} alt="isWatch" />}</span>)}
            </span>
        )

    }

}