import React from 'react';
import { AiOutlineEye } from "react-icons/ai";

export class CardVisibilityPreview extends React.Component {
    render() {
        const { cardMembers } = this.props;
        return (
            <span>
                {cardMembers.map(member => <span key={member._id}> {member.isWatch && <AiOutlineEye />}</span>)}
            </span>
        )
    }
}