import React from 'react'
import { Link } from 'react-router-dom'

export function MemberPreview({ toy, onRemoveToy, onAddToCart, user }) {
    return (
        <li className="toy-preview" >
            <h1>{toy.name}</h1>
            <p>Price: <span>${toy.price}</span></p>
            {toy.labels && toy.labels.length && (
                <>
                    <h4>Categories:</h4>
                    <ul className="clean-list">
                        {toy.labels.map((label, idx) => (<li key={idx}>{label}</li>))}
                    </ul>
                </>
            )}

            {toy.inStock && <h2 className='green'>On Sale!</h2>}
            {!toy.inStock && <h2 className='red'>Out of Stock!</h2>}

            <div className="btns-toy-preview">
                <Link to={`/toy/${toy._id}`} ><button>Details</button></Link>
                {user && user.isAdmin &&
                    <>
                        <Link to={`/toy/edit/${toy._id}`} ><button>Edit</button></Link>

                        <button onClick={() => {
                            onRemoveToy(toy._id)
                        }}>x</button>

                    </>
                }
                {/* <button className="buy" onClick={() => {
                    onAddToCart(toy)
                }}>Add to Cart</button> */}
            </div>
        </li>
    )
}
