import React from 'react';
import { connect } from 'react-redux'
import Avatar from '@mui/material/Avatar';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import ScheduleOutlinedIcon from '@mui/icons-material/ScheduleOutlined';
import CallToActionOutlinedIcon from '@mui/icons-material/CallToActionOutlined';
import AddIcon from '@mui/icons-material/Add';
import AttachFileOutlinedIcon from '@mui/icons-material/AttachFileOutlined';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import { LabelPreview } from '../LabelPreview';
import { BsThreeDots } from "react-icons/bs";  //merge conflict- is this needed here? <AW>
import { DueDatePreview } from '../DueDatePreview';

class _DynamicButton extends React.Component {
    render() {
        const { type, loggedInUser } = this.props
        const DynamicCmp = (props) => {
            switch (props.type) {
                case 'members':
                    return <><PersonOutlineOutlinedIcon /> Members</>
                case 'add-members':
                case 'add-labels':
                    return <><AddIcon /></>
                case 'list actions':
                    return <><BsThreeDots /></>
                case 'labels':
                    return <><LocalOfferOutlinedIcon /> Labels</>
                case 'labels-preview':
                    return <LabelPreview {...props} />
                case 'checklist':
                    return <><CheckBoxOutlinedIcon /> Checklist</>
                case 'dates':
                    return <><ScheduleOutlinedIcon /> Date</>
                case 'dates-edit':
                    return <><DueDatePreview  {...props} /> </>
                case 'attachments':
                    return <><AttachFileOutlinedIcon className="attachment-icon" /> Attachments</>
                case 'add-attachments':
                    return <>Add an attachment</>
                case 'cover':
                    return <><CallToActionOutlinedIcon /> <span>Cover</span></>
                case 'delete-card':
                    return <> <HorizontalRuleIcon /> Delete</>
                case 'move-card':
                    return <> <ArrowForwardIcon />  Move</>
                case 'copy-card':
                    return <> <ContentCopyIcon /> Copy</>
                case 'userMenu': {
                    return <>
                        <Avatar alt="" src={loggedInUser.imgUrl} className="logged-in-avatar">
                            <p>{loggedInUser.initials}</p>
                        </Avatar>
                    </>
                }
                default:
                    return props.type
            }
        }
        return (
            <DynamicCmp type={type} {...this.props} />
        )
    }
}

function mapStateToProps(state) {
    return {
        loggedInUser: state.userReducer.loggedInUser
    }
}

export const DynamicButton = connect(mapStateToProps)(_DynamicButton)