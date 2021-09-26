import React from 'react';
import { Modal, Button, Box, Typography } from '@mui/material';
import { TextareaAutosize } from '@mui/material';

export class QuickCardEditor extends React.Component {

    state = {
        cardTitle: "",
        isEditTitle: false,
        isModalOpen: false,
    }

    handleChange = (ev) => {
        const value = ev.target.value;
        this.setState({ cardTitle: value });
    }

    toggleModal = () => {
        this.setState({ isModalOpen: !this.stata.isModalOpen })
    }

    render() {
        const { cardTitle } = this.state;
        return (
            <div className="window-overlay">
                <div className="quic-card-editor">
                    <span onClick={this.toggleModal}>x</span>
                    <div quic-card-editor-card>
                        <TextareaAutosize
                            value={cardTitle}
                            aria-label="empty textarea"
                            placeholder="Enter list title"
                            style={{ width: 200 }}
                            onChange={this.handleChange}
                            maxRows={1}
                            autoFocus
                        />
                    </div>
                </div>
            </div>
        )
    }
}