
export class CardLabelsPreview extends React.Component {
    state = {
        isOpen: false
    }

    toggleLabel = () =>{
        this.setState({isOpen: !this.state.isOpen});
    }

    render() {
        const {isOpen} = this.state;
        const className = isOpen ? 'label-preview-open' : 'label-preview'; 
        return (
            <div onClick={this.toggleLabel} className={className} >
                <p>{currLabel.title}</p>
            </div>
        )
    }

}