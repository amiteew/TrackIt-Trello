import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { MembersPopover } from './DynamicPopover/MembersPopover';

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
        const { type, title } = this.props
        const { anchorEl } = this.state
        const open = Boolean(anchorEl);
        const id = open ? 'simple-popover' : undefined;

        const DynamicCmp = (props) => {
            switch (props.type) {
                case 'members':
                    return <MembersPopover {...props} />
                // case 'fontSize':
                //     return <FontSizeInput {...props} />
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
                        <h3>{title}</h3>
                        <Button onClick={this.handleClose}>X</Button>

                    </div>

                    <DynamicCmp type={type} />

                </Popover >
            </div>
        );
    }

}