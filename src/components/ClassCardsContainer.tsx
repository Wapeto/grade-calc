import React from 'react'
import ClassCard from './ClassCard.tsx'

export default function ClassCardsContainer() {
  return (
    <div className='inline-flex max-w-full justify-center items-center content-center gap-6 flex-wrap mt-32'>
        <ClassCard classTitle="Analyse" imageLink='analyse.png'/>
        <ClassCard classTitle="POO" imageLink='poo.png'/>
    </div>
  )
}
