import React from 'react'
import ClassCard from './ClassCard.tsx'

export default function ClassCardsContainer() {
  const examLists = {
    "Analyse" : [
      "CC1",
      "CC2",
      "Projet"
    ]
  }
  return (
    <div className='inline-flex max-w-70 justify-center items-start content-center gap-9 flex-wrap mt-32'>
        <ClassCard classTitle="Analyse" imageLink='analyse.png' examList={examLists["Analyse"]}/>
        <ClassCard classTitle="POO" imageLink='poo.png'/>
        <ClassCard classTitle="POO" imageLink='poo.png'/>
        <ClassCard classTitle="POO" imageLink='poo.png'/>
        <ClassCard classTitle="POO" imageLink='poo.png'/>
        <ClassCard classTitle="POO" imageLink='poo.png'/>
        <ClassCard classTitle="POO" imageLink='poo.png'/>
        <ClassCard classTitle="POO" imageLink='poo.png'/>
    </div>
  )
}
