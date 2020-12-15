import { useState } from 'react'

export default function PoiDetail () {
  const [poi, setPoi] = useState([
    {
      name: 'White Furniture Company Warehouse',
      address: '201 E Center St Mebane NC 27302',
      image: 'https://media.bizj.us/view/img/5805181/whitefurnitureapt-mebane*1200xx498-280-0-20.jpg',
      comments: 'The White brothers started the company in 1881, the year the town of Mebane incorporated.',
      category: 'Business'
    }
  ])
  return (
    <div>
      {poi.map(poi => (
        <div
          key={poi.id}
        >
          <h1>POI Detail</h1>
          <h2> {poi.name} </h2>
          <h3> {poi.address} </h3>
          <div>
            {poi.image && <img src={poi.image} alt='location' width='150' />}
          </div>
          <h3> {poi.category} </h3>
        </div>
      ))}
    </div>
  )
}
