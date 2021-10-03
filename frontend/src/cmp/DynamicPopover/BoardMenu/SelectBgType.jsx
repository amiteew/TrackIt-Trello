export function SelectBgType(props) {
    // console.log('bg prps', props);
    return (
        <div className="select-bg flex">
            <div className="photos" onClick={() => { props.changeMenu('Photos by Unsplash', 'photos') }}>
                <img src="https://a.trellocdn.com/prgb/dist/images/photos-thumbnail@3x.8f9c1323c9c16601a9a4.jpg" alt="Photos" />
                <p>Photos</p>
            </div>
            <div className="colors" onClick={() => { props.changeMenu('Colors', 'colors') }}>
                <img src="https://a.trellocdn.com/prgb/dist/images/colors@2x.ec32a2ed8dd8198b8ef0.jpg" alt="Colors" />
                <p>Colors</p>
            </div>
        </div>
    )
}