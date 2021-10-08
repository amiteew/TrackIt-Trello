import React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { ActionList } from './DynamicPopover/ActionListPopOver';
import { MembersPopover } from './DynamicPopover/MembersPopover';
import { LabelsPopover } from './DynamicPopover/LabelsPopover';
import { DatesPopover } from './DynamicPopover/DatesPopover';
import { ChecklistPopover } from './DynamicPopover/ChecklistPopover';
import { CoverPopover } from './DynamicPopover/CoverPopover';
import { DynamicButton } from './DynamicCmps/DynamicButton';
import { UserMenuPopover } from './DynamicPopover/UserMenuPopover';
import { TemporaryDrawer } from '../cmp/DroweMenu.jsx';
import { AttachmentsPopover } from './DynamicPopover/AttachmentsPopover';
import { DeleteCardPopover } from './DynamicPopover/DeleteCardPopover';
import { MoveCopyCardPopover } from './DynamicPopover/MoveCopyCardPopover';
import { MuiPickersUtilsProvider, DatePicker, TimePicker, DateTimePicker, } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { removeUser } from '../store/user.actions';
import { UserBoardsPopover } from './DynamicPopover/UserBoardsPopover';
import { NotifPopover } from './DynamicPopover/NotifPopover';
import { IoChevronBackOutline } from 'react-icons/io5';
import { EditLabel } from './DynamicPopover/EditLabel';


export class DynamicPopover extends React.Component {
    state = {
        anchorEl: null,
        isEditLabel: false,
        newTitle: '',
        isChangeTitle: false,
        currLabel: '',
        isSearch: false
    }

    handleClick = (event) => {
        event.preventDefault();
        this.setState({ anchorEl: event.currentTarget })
    };

    handleClose = () => {
        if (this.props.type === 'userBoards' || this.props.type === 'starredBoards') this.props.onToggle()
        this.setState({ anchorEl: null })
        if (this.props.markReadNotif) this.props.markReadNotif()
    };

    handleDateChange = () => {
        console.log('im in DynamicPopover.handleDateChange');
    }

    changeTitle = (isChangeTitle, newTitle, currLabel = '') => {
        if (newTitle === 'change cover') {
            var isSearch = true
        }
        this.setState({ ...this.state, newTitle, isChangeTitle, currLabel, isSearch })
    }

    handleBack = () => {
        if (this.props.titleModal === 'cover') {
            var isSearch = true
        }
        this.setState({ ...this.state, isChangeTitle: !this.state.isChangeTitle, newTitle: this.props.titleModal, isSearch })
    }

    render() {
        let { type, title, titleModal } = this.props
        const { anchorEl, isChangeTitle, newTitle, currLabel, isSearch } = this.state
        const open = Boolean(anchorEl);
        const dnmTitleModal = isChangeTitle ? newTitle : titleModal;
        let id = open ? 'simple-popover' : undefined;
        const DynamicCmp = (props) => {
            switch (props.type) {
                case 'members':
                case 'add-members':
                case 'change members':
                    return <MembersPopover {...props} />
                case 'list actions':
                    return <ActionList {...props} />
                case 'labels':
                case 'edit labels':
                    if (isChangeTitle)
                        return <EditLabel {...props} />
                case 'add-labels':
                    if (isChangeTitle) return <EditLabel {...props} />
                    return <LabelsPopover {...props} />
                case 'labels-preview':
                    if (isChangeTitle) return <EditLabel {...props} />
                    return <LabelsPopover {...props} />
                case 'dates-edit':
                case 'edit-dates':
                case 'dates':
                    return <DatesPopover {...props} />
                case 'attachments':
                case 'add-attachments':
                    return <AttachmentsPopover {...props} />
                case 'cover':
                case 'change cover':
                    return <CoverPopover {...props} />
                case 'checklist':
                    return <ChecklistPopover {...props} />
                case 'userMenu':
                    return <UserMenuPopover {...props} />
                case 'userBoards':
                case 'starredBoards':
                    return <UserBoardsPopover {...props} handleClose={this.handleClose} />
                case 'boardMenu':
                    return <TemporaryDrawer {...props} />
                case 'delete-card':
                    return <DeleteCardPopover {...props} />
                case 'move-card':
                    return <MoveCopyCardPopover {...props} />
                case 'copy-card':
                    return <MoveCopyCardPopover {...props} isCopy={true} />
                case 'newNotif':
                case 'noNotif':
                    return <NotifPopover {...props} />

                default:
                    break;
            }
        }

        return (
            <React.Fragment>
                <button onClick={this.handleClick}>
                    <DynamicButton type={type} {...this.props} />
                </button>
                <Popover
                    className={type}
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={this.handleClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                >
                    {/* OPEN MODAL */}
                    <div className="popover-header-title flex">
                        {isChangeTitle &&
                            <span onClick={this.handleBack} className="back-icon pointer" >
                                <IoChevronBackOutline />
                            </span>}
                        <span>{dnmTitleModal}</span>
                        <button className="close-popover" onClick={this.handleClose}></button>
                    </div>
                    <div className="popover-content-container">
                        {<DynamicCmp type={type} currLabel={currLabel} isSearch={isSearch} changeTitle={this.changeTitle} {...this.props} handleClose={this.handleClose} />}
                    </div>
                </Popover >
            </React.Fragment>
        );
    }

}

