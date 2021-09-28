import * as React from 'react';
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
import { MuiPickersUtilsProvider, DatePicker, TimePicker, DateTimePicker, } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

export class DynamicPopover extends React.Component {
    state = {
        anchorEl: null,
    }

    handleClick = (event) => {
        event.preventDefault();
        this.setState({ anchorEl: event.currentTarget })
    };

    handleClose = () => {
        this.setState({ anchorEl: null })
    };

    handleDateChange = () => {
        console.log('im here');
    }

    render() {
        const { type, title, titleModal } = this.props
        const { anchorEl } = this.state
        const open = Boolean(anchorEl);
        const id = open ? 'simple-popover' : undefined;

        const DynamicCmp = (props) => {
            switch (props.type) {
                case 'members':
                    return <MembersPopover {...props} />
                case 'list actions':
                    return <ActionList {...props} />
                case 'labels':
                    return <LabelsPopover {...props} />
                case 'dates':
                    return <DatesPopover {...props} />
                case 'cover':
                    return <CoverPopover {...props} />
                case 'checklist':
                    return <ChecklistPopover {...props} />
                case 'userMenu':
                    return <UserMenuPopover {...props} />
                case 'boardMenu':
                    return <TemporaryDrawer {...props} />
                default:
                    break;
            }
        }


        return (
            <React.Fragment>
                <button onClick={this.handleClick}>
                    <DynamicButton type={type} />
                </button>
                <Popover
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
                        <span>{titleModal}</span>
                        <button className="close-popover" onClick={this.handleClose}></button>
                    </div>
                    <div className="popover-content-container">
                        <DynamicCmp type={type} {...this.props} handleClose={this.handleClose} />
                     </div>
                </Popover >
            </React.Fragment>
        );
    }

}