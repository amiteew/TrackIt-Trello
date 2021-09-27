import React from 'react';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import ScheduleOutlinedIcon from '@mui/icons-material/ScheduleOutlined';
import CallToActionOutlinedIcon from '@mui/icons-material/CallToActionOutlined';
export class DynamicButton extends React.Component {
    render() {
        const { type } = this.props
        const DynamicCmp = (props) => {
            switch (props.type) {
                case 'members':
                    return <><PersonOutlineOutlinedIcon /> Members</>
                case 'list actions':
                    return <></>
                case 'labels':
                    return <>< LocalOfferOutlinedIcon /> Labels</>
                case 'checklist':
                    return <><CheckBoxOutlinedIcon /> Checklist</>
                case 'dates':
                    return <><ScheduleOutlinedIcon /> Date</>
                case 'cover':
                    return <>< CallToActionOutlinedIcon /> Cover</>
                default:
                    return props.type
            }
        }
        return (
            <DynamicCmp type={type} />
        )
    }
}