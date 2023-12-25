import React from 'react'
import ArrowIcon from './ArrowIcon.tsx'

export default function LvlDropdown() {
  return (
    <div className="inline-flex px-4 py-2 mt-20 justify-center items-center gap-3 rounded-lg border-primary-600 border bg-primary-300">
        <p className="text-3xl text-no-fill text-stroke-black font-bold">S3</p>
        <ArrowIcon />
    </div>
  )
}
