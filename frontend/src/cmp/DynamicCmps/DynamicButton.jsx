import React from 'react';
import { connect } from 'react-redux'
import Avatar from '@mui/material/Avatar';

import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import ScheduleOutlinedIcon from '@mui/icons-material/ScheduleOutlined';
import CallToActionOutlinedIcon from '@mui/icons-material/CallToActionOutlined';

import { BsThreeDots } from "react-icons/bs";  //merge conflict- is this needed here? <AW>

class _DynamicButton extends React.Component {
    render() {
        const { type, loggedInUser } = this.props
        const DynamicCmp = (props) => {
            switch (props.type) {
                case 'members':
                    return <><PersonOutlineOutlinedIcon /> Members</>
                case 'list actions':
                    return <><BsThreeDots /></>
                case 'labels':
                    return <>< LocalOfferOutlinedIcon /> Labels</>
                case 'checklist':
                    return <><CheckBoxOutlinedIcon /> Checklist</>
                case 'dates':
                    return <><ScheduleOutlinedIcon /> Date</>
                case 'cover':
                    return <>< CallToActionOutlinedIcon /> Cover</>
                case 'userMenu': {
                    return <>
                        <Avatar alt="" src={loggedInUser.imgUrl} className="logged-in-avatar">
                            <p>{loggedInUser.initials}</p>
                        </Avatar>
                    </>
                }
                case 'boardMenu':
                    return <>< BsThreeDots /> show menu</>
                default:
                    return props.type
            }
        }
        return (
            <DynamicCmp type={type} />
        )
    }
}

function mapStateToProps(state) {
    return {
        loggedInUser: state.userReducer.loggedInUser
    }
}

export const DynamicButton = connect(mapStateToProps)(_DynamicButton)