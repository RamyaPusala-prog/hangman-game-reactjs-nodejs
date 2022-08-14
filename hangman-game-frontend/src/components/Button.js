import React from 'react'

 function Button({ letter, handleGuess, disabled }) {
    return (
        <button className='alpha-buttons' style={{ width: letter === "reset" ? '150px' : '' }} key={letter} value={letter} onClick={(e) => handleGuess(e.target.value)} disabled={disabled}>
            {letter}
        </button>
    )
}

export default Button;