import { useEffect, useState } from 'react'
import { Redirect, useParams } from 'react-router-dom'
import axios from 'axios'
import clsx from 'clsx'

export default function EditComment ({ auth, token }) {
  const { id } = useParams()
  const [comment, setComment] = useState({})
  const [feedbackMsg, setFeedbackMsg] = useState('')

  const setCommentField = (field, value) => {
    setComment({
      ...comment,
      [field]: value
    })
  }
  console.log(comment)
  useEffect(() => {
    axios.get('https://this-land-team-5.herokuapp.com/api/tellyourstory/' + id)
      .then(response => {
        setComment(response.data)
        console.log(response.data)
      })
  }, [id])

  function handleEdit (event) {
    event.preventDefault()

    const data = new FormData()
    data.set('text', comment.text)

    const image = document.getElementById('images').files[0]
    if (image) {
      data.set('images', image)
    }

    axios
      .put(
        'https://this-land-team-5.herokuapp.com/api/tellyourstory/' + id + '/',
        data,
        {
          headers: {
            'content-type': 'multipart/form-data',
            Authorization: `Token ${token}`
          }
        }
      )
      .then((response) => {
        setFeedbackMsg({
          type: 'success',
          message: 'Comment was successfully edited!'
        })
        console.log(response)
      })
      .catch((error) => {
        setFeedbackMsg({ type: 'error', message: 'Information was invalid' })
        console.log(error)
      })
  }

  if (feedbackMsg.type === 'success') {
    return <Redirect to={'/detail/' + comment.poi} />
  }

  if (!auth) {
    return <Redirect to='/' />
  }

  return (
    <div>
      <div>
        <h1 className='mh2 mv4'>Edit your Story</h1>
        <form className='container2 center' onSubmit={handleEdit}>
          {
          feedbackMsg &&
          (
            <div className={clsx(
              'ba bw2', 'pa3', 'w-100',
              {
                'light-gray': (feedbackMsg.type === 'error'),
                'bg-red': (feedbackMsg.type === 'error'),
                'bg-washed-red': (feedbackMsg.type === 'success')
              }
            )}
            >
              {feedbackMsg.message}
            </div>
          )
        }

          <div>
            <div className='mh2 mv3'>
              <label className='mv2  mh2 b' htmlFor='title'>Comments</label>
              <input
                className='mh3'
                required
                type='text'
                id='comment'
                value={comment.text}
                onChange={event => setCommentField('text', event.target.value)}
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
              <button type='reset'>Clear image</button>
            </div>
            <button className='submit' type='submit'>Submit</button>
          </div>
        </form>
      </div>
    </div>
  )
}
