import React from 'react'

function Header({ title }) {
    return (
        <div className='header'>
            <h1 >{title}</h1>
            <h4> Guess the Programming Language ?</h4>
        </div>
    )
}

export default Header;