import React from 'react'
import RoundLoader from '../assets/imgs/oval-loader.svg'

export function Loading() {
    return (
            <div className="loader">
                <img src={RoundLoader} alt="loading..." />
            </div>
    )
}
