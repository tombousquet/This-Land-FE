import { useEffect, useState } from 'react'
import { Redirect, useParams } from 'react-router-dom'
import axios from 'axios'

export default function PoiDetail () {
  const { id } = useParams()
  const [poi, setPoi] = useState({})
  const [comment, setComment] = useState({})
  const [addComment, setAddComment] = useState(false)

  useEffect(() => {
    axios.get('http://this-land-team-5.herokuapp.com/api/pointsofinterest/' + id)
      .then(response => {
        setPoi(response.data)
        console.log(response.data)
      })
  }, [id])

  // useEffect(() => {
  //   axios.get('http://this-land-team-5.herokuapp.com/api/tellyourstory/' + id)
  //     .then(response => {
  //       setComment(response.data)
  //       console.log(response.data)
  //     })
  // }, [id])

  function newComment () {
    setAddComment(true)
  }

  console.log(poi)

  const comments = poi.TellYourStories

  if (addComment) {
    return <Redirect to={'/comment/' + id + '/add'} />
  }

  return (
    <div>
      <h1 className='mh2 mv4'>YOUR POINT OF INTEREST </h1>
      <h2> {poi.location_name} </h2>
      <h4> {poi.street_address} {poi.city} {poi.state} {poi.zip_code} </h4>
      <div>
        {poi.images && <img src={poi.images} alt='location' width='150' />}
        <p>Notes: {poi.notes}</p>
      </div>
      <h4> Category: {poi.category} </h4>
      <div className='note mh2 mv4'>
        <h2 className='mh3'>Other Peoples Memories about this Place</h2>
        <div>
          {comments && comments.map((comments, index) => (
            <div key={index}>
              <ul>
                <li>
                  <h3 className='ma2'>{comments.text}</h3>
                </li>
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className='mh1'>
        <button className='mh2' onClick={newComment}>Add your own memory or story to this place!</button>
      </div>
    </div>
  )
}
