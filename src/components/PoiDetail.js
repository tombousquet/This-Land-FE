import { useEffect, useState } from 'react'
import { Redirect, useParams } from 'react-router-dom'
import axios from 'axios'

export default function PoiDetail () {
  const { id } = useParams()
  const [poi, setPoi] = useState({})
  // const [deletedPoi, setDeletedPoi] = useState(false)
  const [addComment, setAddComment] = useState(false)
  // const [deletedComment, setDeletedComment] = useState(false)

  useEffect(() => {
    axios.get('https://this-land-team-5.herokuapp.com/api/pointsofinterest/' + id)
      .then(response => {
        setPoi(response.data)
        console.log(response.data)
      })
  }, [id])

  // function deletePoi () {
  //   axios.delete('https://this-land-team-5.herokuapp.com/api/pointsofinterest/' + id, {
  //     // auth: auth
  //   })
  //     .then(response => {
  //       setDeletedPoi(true)
  //     })
  // }

  // if (deletedPoi) {
  //   return <Redirect to='/map' />
  // }

  // function deleteComment () {
  //   axios.delete('https://this-land-team-5.herokuapp.com/api/pointsofinterest/' + id, {
  //     // auth: auth
  //   })
  //     .then(response => {
  //       setDeletedComment(true)
  //     })
  // }

  // if (deletedComment) {
  //   return <Redirect to={'/detail/' + id} />
  // }

  function newComment () {
    setAddComment(true)
  }

  console.log(poi)

  const comments = poi.TellYourStories
  console.log({ comments })

  if (addComment) {
    return <Redirect to={'/comment/' + id + '/add'} />
  }

  return (
    <div>
      <div className='POI'>
        <div>
          <h2 className='head'> {poi.location_name} </h2>
          <h3 className='nav2'>{poi.street_address} {poi.city} {poi.state} {poi.zip_code}
          </h3>
        </div>
        <div className='main'>
          {poi.images && <img src={poi.images} alt='location' width='500' />}
        </div>
        <div className='nav'>
          <p> {poi.notes} </p>
        </div>
        {/* <h5 className='footer'> {poi.category} </h5> */}
      </div>
      {/* <div>
        {auth === poi.user &&
          <button onClick={deletePoi}>Delete this location</button>}
      </div> */}
      <div>
        <h1 className='mh3'>Other Peoples Memories about this Place
        </h1>
        <div className='Note'>
          {comments && comments.map((comments, index) => (
            <div key={index}>
              <ul>
                <li className='Comment'>
                  <h4 className='header'>{comments.username}</h4>
                  <h3 className='nav3'>{comments.text}</h3>
                  <div className='main'>
                    {comments.images && <img src={comments.images} alt='location' width='400' />}
                  </div>
                  {/* <div>
                    {auth === poi.TellYourStories.user &&
                      <button onClick={deleteComment}>Delete this comment</button>}
                  </div> */}
                </li>
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className='mh1'>
        <button className='mh2 submit' onClick={newComment}>Add your own memory or story to this place!</button>
      </div>
    </div>
  )
}
