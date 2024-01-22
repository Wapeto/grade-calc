import React from 'react'

export default function CalculateButton({onClick}) {
  return (
    <button className='py-2 px-4 h-10 flex items-center bg-primary-500 rounded-lg font-semibold text-white' onClick={onClick}>
        Calculer
    </button>
  )
}
