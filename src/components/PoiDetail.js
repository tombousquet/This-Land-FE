import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

export default function PoiDetail () {
  const { id } = useParams()
  const [poi, setPoi] = useState({})
  const [comment, setComment] = useState([
    {
      user: 'tombousquet',
      comment: 'My family still has an old rocking chair from White Furniture!',
      image: 'https://render.fineartamerica.com/images/rendered/default/metal-print/6.5/10/break/images-medium-5/old-wooden-rocking-chair-edward-fielding.jpg'

    }]
  )

  useEffect(() => {
    axios.get('http://this-land-team-5.herokuapp.com/api/pointsofinterest/' + id)
      .then(response => {
        setPoi(response.data)
        console.log(response.data)
      })
  }, [id])

  return (
    <div className='ma2'>

      <h1>POI Detail</h1>
      <h2> {poi.location_name} </h2>
      <h4> {poi.street_address} {poi.city} {poi.state} {poi.zip_code} </h4>
      <div>
        {poi.images && <img src={poi.images} alt='location' width='150' />}
        <p>Notes: {poi.notes}</p>
      </div>
      <h3> Category: {poi.category} </h3>

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
