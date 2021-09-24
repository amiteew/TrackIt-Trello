import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { ActionList } from './DynamicPopover/ActionListPopOver';
import { MembersPopover } from './DynamicPopover/MembersPopover';
import { LabelsPopover } from './DynamicPopover/LabelsPopover';

export class DynamicPopover extends React.Component {
    state = {
        anchorEl: null,
    }

    handleClick = (event) => {
        this.setState({ anchorEl: event.currentTarget })
    };

    handleClose = () => {
        this.setState({ anchorEl: null })
    };



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
                default:
                    break;
            }
        }


        return (
            <div>
                <Button aria-describedby={id} variant="contained" onClick={this.handleClick}>
                    {title}
                </Button>
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
                    <div>
                        <h3>{titleModal}</h3>
                        <Button onClick={this.handleClose}>X</Button>
                        <hr></hr>

                    </div>

                    <DynamicCmp type={type} {...this.props} />

                </Popover >
            </div>
        );
    }

}