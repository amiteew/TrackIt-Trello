function uploadImg(ev) {
    const CLOUD_NAME = 'looply'
    const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`

    const formData = new FormData();
    console.log('target', ev.target)
    formData.append('file', ev.target.files[0])
    console.log('ev.target.files[0]):', ev.target.files[0])
    formData.append('upload_preset', 'oxageyls');
    console.log('formData:', formData)

    return fetch(UPLOAD_URL, {
        method: 'POST',
        body: formData
    })
        .then(res => res.json())
        .then(res => {
            const elImg = document.createElement('img');
            elImg.src = res.url;
            document.body.append(elImg);
        })
        .catch(err => console.error(err))
}
