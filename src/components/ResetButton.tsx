import React from 'react'

export default function ResetButton({onClick}) {
  return (
    <button className='py-2 px-4 h-10 flex items-center border border-secondary-200 rounded-lg font-semibold text-text-950' onClick={onClick}>
        Réinitialiser
    </button>
  )
}
