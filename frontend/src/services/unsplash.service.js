import Axios from 'axios'

const KEY = "dXZ90rFg6fkomwI0ttsljiR3C_o35DBKwIhHcoX6oow"

export const unsplashService = {
    getImgs
}

async function getImgs(keyword, count = 10) {
    if (!keyword) {
        keyword = 'scenery'
        count++
    }
    const res = await Axios.get(`https://api.unsplash.com/search/photos?query=${keyword}&per_page=${count}&orientation=landscape&client_id=${KEY}`)
    const imgs = res.data.results.map(img => ({ id: img.id, small: img.urls.small, full: `${img.urls.full}&auto=format&fit=crop&w=1920`, link: img.links.html, name:img.user.name }))
    if (keyword === 'scenery') imgs.shift()
    return imgs
}