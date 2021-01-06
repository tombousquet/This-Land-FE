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
      <div className='body1'>
        <div className='polaroid'> {poi.images && <img src={poi.images} alt='location' width='80%' />}
          <div className='caption'>
            <p> {poi.location_name} love </p>
            <p> {poi.street_address} friends{poi.city} {poi.state} {poi.zip_code} </p>
            <p> {poi.notes} family </p>
          </div>
        </div>
      </div>
      {/* <div>
        {auth === poi.user &&
          <button onClick={deletePoi}>Delete this location</button>}
      </div> */}
      <div>
        <h1> Other Peoples Memories about this Place </h1>
        <div className='body2'>
          <div className='polaroid1 rotate_left'>
            {poi.images && <img src={poi.images} alt='location' width='284' height='213' />}
          </div>
          <div className='caption1'>
            {comments && comments.map((comments, index) => (
              <div key={index}>
                <p> {comments.username} love </p>
                <p> {comments.text} heart </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className='mh1'>
        <button className='mh2 submit' onClick={newComment}>Add your own memory or story to this place!</button>
      </div>
    </div>
  )
}
