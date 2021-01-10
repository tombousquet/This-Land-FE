import { useEffect, useState } from 'react'
import { Redirect, useParams } from 'react-router-dom'
import axios from 'axios'

export default function PoiDetail ({ token, auth }) {
  console.log({ token })
  const { id } = useParams()
  const [poi, setPoi] = useState({})
  const [deletedPoi, setDeletedPoi] = useState(false)
  const [addComment, setAddComment] = useState(false)
  const [deletedComment, setDeletedComment] = useState(false)

  useEffect(() => {
    axios.get('https://this-land-team-5.herokuapp.com/api/pointsofinterest/' + id)
      .then(response => {
        setPoi(response.data)
        console.log(response.data)
      })
  }, [id])

  function deletePoi () {
    axios.delete('https://this-land-team-5.herokuapp.com/api/pointsofinterest/' + id + '/delete',
      {},
      {
        headers: {
          Authorization: `Token ${token}`
        }
      })
      .then(response => {
        setDeletedPoi(true)
      })
  }

  if (deletedPoi) {
    return <Redirect to='/' />
  }

  function deleteComment () {
    axios.delete('https://this-land-team-5.herokuapp.com/api/tellyourstory/' + id + '/delete',
      {},
      {
        headers: {
          Authorization: `Token ${token}`
        }
      })
      .then(response => {
        setDeletedComment(true)
      })
  }

  if (deletedComment) {
    return <Redirect to={'/detail/' + id} />
  }

  function newComment () {
    setAddComment(true)
  }

  console.log(poi)

  const comments = poi.TellYourStories
  console.log({ comments })

  console.log({ auth })

  if (addComment) {
    return <Redirect to={'/comment/' + id + '/add'} />
  }

  return (
    <div className='Poi'>
      <div className='body1'>
        <div className='polaroid center '> {poi.images && <img src={poi.images} alt='location' width='70%' />}
          <div className='caption'>
            <div className='name'> {poi.location_name} </div>
            <div className='address'> {poi.street_address} {poi.city} {poi.state} {poi.zip_code} </div>
            <p className='notes'> {poi.notes} </p>
            <div> {poi.user} </div>
          </div>
        </div>
      </div>
      <div>
        {/* {auth === poi.user && */}
        <button onClick={deletePoi}>Delete this location</button>
      </div>
      <div>
        {token && (
          <div className='mh1'>
            <button className='submit' onClick={newComment}>Click here to add your own memory or story to this place!</button>
          </div>
        )}
        <div className='body2'>
          <div className='caption1'>
            {comments && comments.map((comments, index) => (
              <div key={index}>
                <div className='polaroid1 rotate_left'>
                  {comments.images && <img src={comments.images} alt='location' width='284' height='213' />}
                  <p> {comments.user} </p>
                  <p> {comments.text} </p>
                  <p>{comments.id}</p>
                  {/* {auth === comments.user && */}
                  <button onClick={deleteComment}>Delete this memory</button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  )
}
