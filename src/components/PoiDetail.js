import { useEffect, useState } from 'react'
import { Redirect, useParams } from 'react-router-dom'
import axios from 'axios'

export default function PoiDetail ({ token, auth }) {
  console.log({ token })
  const { id } = useParams()
  const [poi, setPoi] = useState({})
  const [deletedPoi, setDeletedPoi] = useState(false)
  const [editPoi, setEditPoi] = useState(false)
  const [editComment, setEditComment] = useState(false)
  const [addComment, setAddComment] = useState(false)
  const [commentList, setCommentList] = useState([])
  const [commentId, setCommentId] = useState('')
  console.log(commentList)

  useEffect(() => {
    axios.get('https://this-land-team-5.herokuapp.com/api/pointsofinterest/' + id)
      .then(response => {
        setPoi(response.data)
        console.log(response.data)
        setCommentList(response.data.TellYourStories)
        console.log(response.data.TellYourStories)
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

  function editPoiFunction () {
    setEditPoi(true)
  }

  if (editPoi) {
    return <Redirect to={'/edit/' + id} />
  }
  function editCommentFunction (commentToEdit) {
    setEditComment(true)
    setCommentId(commentToEdit.id)
  }
  if (editComment) {
    return <Redirect to={'/edit/comment/' + commentId} />
  }

  function deleteComment (commentToDelete) {
    axios.delete('https://this-land-team-5.herokuapp.com/api/tellyourstory/' + commentToDelete.id + '/delete',
      {},
      {
        headers: {
          Authorization: `Token ${token}`
        }
      })
      .then(response => {
        setCommentList(commentList.filter(currentComment => (
          currentComment.id !== commentToDelete.id)
        ))
      })
  }

  function newComment () {
    setAddComment(true)
  }

  if (addComment) {
    return <Redirect to={'/add/comment/' + id} />
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
        <button onClick={editPoiFunction}>Edit this location</button>
      </div>
      <div>
        {token && (
          <div className='mh1'>
            <button className='submit' onClick={newComment}>Click here to add your own memory or story to this place!</button>
          </div>
        )}
        <div className='body2'>
          <div className='caption1'>
            {commentList && commentList.map((comment, index) => (
              <div key={index}>
                <div className='polaroid1 rotate_left'>
                  {comment.images && <img src={comment.images} alt='location' width='284' height='213' />}
                  <p> {comment.user} </p>
                  <p> {comment.text} </p>
                  {/* {auth === comment.user && */}
                  <button onClick={() => deleteComment(comment)}>Delete this memory</button>
                  <p><button onClick={() => editCommentFunction(comment)}>Edit this memory</button></p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  )
}
