import React from 'react'
import loading from '../assets/img/loading.svg'
export function Loading() {
    return (
        <section className="loader-container">
            <div className="loader">
                <h1> <img src={loading} alt="loading" /></h1>
            </div>
        </section>
    )
}
