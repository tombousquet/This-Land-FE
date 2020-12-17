import { useState } from 'react'

export default function PoiDetail () {
  const [poi, setPoi] = useState([
    {
      location_name: 'White Furniture Company Warehouse',
      address: '201 E Center St Mebane NC 27302',
      image: 'https://media.bizj.us/view/img/5805181/whitefurnitureapt-mebane*1200xx498-280-0-20.jpg',
      notes: 'The White brothers started the company in 1881, the year the town of Mebane incorporated.',
      category: 'Business'
    }
  ])
  const [comment, setComment] = useState([
    {
      user: 'tombousquet',
      comment: 'My family still has an old rocking chair from White Furniture!',
      image: 'https://render.fineartamerica.com/images/rendered/default/metal-print/6.5/10/break/images-medium-5/old-wooden-rocking-chair-edward-fielding.jpg'

    }]
  )
  return (
    <div className='ma2'>
      {poi.map(poi => (
        <div
          key={poi.id}
        >
          <h1>POI Detail</h1>
          <h2> {poi.location_name} </h2>
          <h3> {poi.address} </h3>
          <div>
            {poi.image && <img src={poi.image} alt='location' width='150' />}
            <p>Notes: {poi.notes}</p>
          </div>
          <h3> Category: {poi.category} </h3>
        </div>
      ))}
      <div>
        {comment.map(comment => (
          <div
            key={comment.id}
          >
            <div>
              <h2>
                Memories section:
              </h2>
              <div className='comment'>
                <p>From: {comment.user} </p>
                <div>
                  {comment.image && <img src={comment.image} alt='memory' width='100' />}
                  <p>{comment.comment}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
