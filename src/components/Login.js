import axios from 'axios'
import clsx from 'clsx'
import { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'

export default function Login ({ auth, onLogin }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [feedbackMsg, setFeedbackMsg] = useState('')

  function handleSubmit (event) {
    event.preventDefault()

    axios.get('https://this-land-team-5.herokuapp.com/api/userpass/', {
      auth: {
        username: username,
        password: password
      }
    })
      .then(response => {
        setFeedbackMsg({ type: 'success', message: 'Logged in.' })
        onLogin({ username, password })
      })
      .catch(error => {
        setFeedbackMsg({ type: 'error', message: 'The username or password is invalid' })
        console.log(error)
      })
  }

  if (auth) {
    return <Redirect to='/map' />
  }

  return (
    <div className='bg-img'>
      <div className='Title'>
        <h1 className=' f2 b black'>Welcome to Your History</h1>
        <div className='Login'>
          <h1 className='f3 b black'>Log In or <Link to='/signup'>Sign up</Link></h1>
          {
          feedbackMsg &&
          (
            <div className={clsx(
              'ba', 'bw1', 'pa3', 'w-50',
              {
                'bg-white': (feedbackMsg.type === 'error'),
                'bg-washed-red': (feedbackMsg.type === 'success')
              }
            )}
            >
              {feedbackMsg.message}
            </div>
          )
      }
          <div>
            <form
onSubmit={handleSubmit}
              className='container'
            >
              <label className='db b mv2 black mid-v' htmlFor='username'>Username</label>
              <input
                required
                type='text'
                placeholder='Enter Username'
                id='username'
                value={username}
                onChange={event => setUsername(event.target.value)}
              />
              <div className='mv2'>
                <label className='db b mv2 black' htmlFor='password'>Password</label>
                <input
                  required
                  type='password'
                  placeholder='Enter Password'
                  id='password'
                  value={password}
                  onChange={event => setPassword(event.target.value)}
                />
              </div>
              <div className='button'>
                <button type='submit'>Login</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
