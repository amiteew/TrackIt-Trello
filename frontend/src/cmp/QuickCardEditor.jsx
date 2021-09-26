import React from 'react';
import { Modal, Button, Box, Typography } from '@mui/material';
import { TextareaAutosize } from '@mui/material';

export class QuickCardEditor extends React.Component {

    state = {
        cardTitle: "",
    }

    componentDidMount () {
        const {card} = this.props;
        this.setState({...this.state, cardTitle: card.cardTitle});
    }
    handleChange = (ev) => {
        if (ev.key === 'Enter') {
            ev.preventDefault();
            this.props.onSaveCardTitle(this.state.cardTitle);
            return;
        }
        const value = ev.target.value;
        this.setState({ ...this.state,cardTitle: value });
    }

    render() {
        const { cardTitle } = this.state;
        const { handleClose, onSaveCardTitle } = this.props
        return (
            <div className="window-overlay">
                <div className="quic-card-editor">
                    <span onClick={handleClose}>x</span>
                    <div quic-card-editor-card>
                        <TextareaAutosize
                            value={cardTitle}
                            aria-label="card title"
                            onChange={this.handleChange}
                            onKeyPress={this.handleChange}
                            autoFocus
                        />
                    </div>
                    <button onClick={()=>{onSaveCardTitle(cardTitle)}}>Save</button>
                </div>
            </div>
        )
    }
}