import { useState } from 'react'
import { Redirect, useParams } from 'react-router-dom'
import axios from 'axios'
import clsx from 'clsx'

export default function AddComment ({ auth, token }) {
  const { id } = useParams()
  const [comment, setComment] = useState('')
  const [feedbackMsg, setFeedbackMsg] = useState('')

  function handleSubmit (e) {
    e.preventDefault()

    const data = new FormData()
    data.set('text', comment)
    data.set('poi', id)
    data.set('user', auth)
    const image = document.getElementById('images').files[0]
    if (image) {
      data.set('images', image)
    }

    axios.post('https://this-land-team-5.herokuapp.com/api/tellyourstory/',
      data,
      {
        headers: {
          'content-type': 'multipart/form-data',
          Authorization: `Token ${token}`
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

  return (
    <div>
      <h1 className='mh2 mv4'>Tell Your Story</h1>
      {
        feedbackMsg &&
        (
          <div className={clsx(
            'ba bw2', 'pa3', 'w-100',
            {
              'light-gray': (feedbackMsg.type === 'error'),
              'bg-red': (feedbackMsg.type === 'error'),
              white: (feedbackMsg.type === 'success'),
              'bg-navy': (feedbackMsg.type === 'success')
            }
          )}
          >
            {feedbackMsg.message}
          </div>
        )
      }
      <div className='form'>
        <form className='container2 center' onSubmit={handleSubmit}>
          <div>
            <div className='mh2 mv3'>
              <label className='mv2  mh2 b' htmlFor='title'>Comments</label>
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
                type='file'
                id='images'
                placeholder='Choose your image to add'
              />
              <div>
                <button className='mv2 mh2' type='reset'>Clear image</button>
              </div>
            </div>
            <button className='submit' type='submit'>Submit</button>
          </div>
        </form>
      </div>
    </div>
  )
}
