import React from 'react'

export default function CalculateButton({onClick}) {
  return (
    <button className='my-12 py-2 px-4 bg-primary-500/60 rounded-lg border-secondary-500 border-2 font-semibold' onClick={onClick}>
        Calculate
    </button>
  )
}
