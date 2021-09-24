import React from 'react'
import RoundLoader from '../assets/imgs/oval-loader.svg'

// import loading from '../assets/img/loading.svg'
export function Loading() {
    return (
            <div className="loader">
                <img src={RoundLoader} alt="loading..." />
                {/* <h1> <img src={loading} alt="loading" /></h1> */}
            </div>
    )
}
