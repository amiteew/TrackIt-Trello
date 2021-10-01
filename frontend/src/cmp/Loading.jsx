import React from 'react'
import Loader from '../assets/imgs/bars-loader.svg'

// import loading from '../assets/img/loading.svg'
export function Loading() {
    return (
            <div className="loader flex align-center justify-center">
                {/* <div className="screen"></div> */}
                <img src={Loader} alt="loading..." />
                {/* <h1> <img src={loading} alt="loading" /></h1> */}
            </div>
    )
}
