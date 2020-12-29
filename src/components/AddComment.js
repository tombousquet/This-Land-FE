import { useState } from 'react'
import { Redirect, useParams } from 'react-router-dom'
import axios from 'axios'
import clsx from 'clsx'

export default function AddComment () {
  const { id } = useParams()
  const [comment, setComment] = useState('')
  const [image, setImage] = useState('')
  const [feedbackMsg, setFeedbackMsg] = useState('')

  function handleSubmit (e) {
    e.preventDefault()

    const data = new FormData()
    data.set('text', comment)
    data.set('poi', id)
    const image = document.getElementById('images').files[0]
    if (image) {
      data.set('images', image)
    }

    axios.post('http://this-land-team-5.herokuapp.com/api/tellyourstory/',
      data,
      {
        headers: {
          'content-type': 'multipart/form-data'
        }
      }
    )
      .then(response => {
        setFeedbackMsg({ type: 'success', message: 'This comment was added successfully.' })
        console.log(response)
      })
      .catch(error => {
        setFeedbackMsg({ type: 'error', message: 'The information you entered is not valid' })
        console.log(error)
      })
  }

  if (feedbackMsg.type === 'success') {
    return (
      <div>
        <Redirect to={'/detail/' + id} />
      </div>
    )
  }

  //   if (!auth) {
  //     return <Redirect to='/' />
  //   }

  return (
    <div>
      <h1 className='mh2 mv4'>New Comment Entry</h1>
      {
        feedbackMsg &&
        (
          <div className={clsx(
            {
              'bg-red': (feedbackMsg.type === 'error'),
              white: (feedbackMsg.type === 'error'),
              'bg-green': (feedbackMsg.type === 'success')
            }
          )}
          >
            {feedbackMsg.message}
          </div>
        )
      }
      <form className='form' onSubmit={handleSubmit}>
        <div>
          <div className='mh2 mv3'>
            <label className='mv2  mh2 b' htmlFor='title'>Tell Your Story</label>
            <input
              className='mh3'
              required
              type='text'
              id='comment'
              value={comment}
              onChange={event => setComment(event.target.value)}
              name='poiNote'
              component='input'
              placeholder='Add comment here'
            />
          </div>
          <div className='mh2 mv3'>
            <label className='mv2 b mh2' htmlFor='status'>
              Image
            </label>
            <input
              className='mh3'
              type='file'
              id='images'
              placeholder='Choose your image to add'
            />
          </div>
          <button className='mh6 mv2' type='submit'>Submit</button>
        </div>
      </form>
    </div>
  )
}
