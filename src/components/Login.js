import axios from 'axios'
import clsx from 'clsx'
import { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'

export default function Login ({ auth, onLogin, onToken }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [feedbackMsg, setFeedbackMsg] = useState('')

  function handleSubmit (event) {
    event.preventDefault()

    axios.post('https://this-land-team-5.herokuapp.com/auth/token/login', {
      username: username,
      password: password
    })
      .then(response => {
        setFeedbackMsg({ type: 'success', message: 'Logged in.' })
        onLogin(username, password)
        onToken(response.data.auth_token)
        console.log(response.data.auth_token)
      })
      .catch(error => {
        setFeedbackMsg({ type: 'error', message: 'The username or password is invalid' })
        console.log(error)
      })
  }

  if (feedbackMsg.type === 'success') {
    return <Redirect to='/' />
  }

  return (
    <div className='bg-img'>
      <div className='Title'>
        {/* <h1 className='f2 b shadow'>Welcome to Your History</h1> */}
        <div className='Login'>
          {/* <h1 className='f2.5 b shadow'>Log In or <Link to='/signup'>Register</Link></h1> */}

          <div>
            <form
              onSubmit={handleSubmit}
              className='container mh5 mt5'
            >
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
              <label className='db b mv2 black mid-v f3' htmlFor='username'>Username</label>
              <input
                required
                type='text'
                placeholder='Enter Username'
                id='username'
                value={username}
                onChange={event => setUsername(event.target.value)}
              />
              <div className='mv2'>
                <label className='db b mv2 black f3' htmlFor='password'>Password</label>
                <input
                  required
                  type='password'
                  placeholder='Enter Password'
                  id='password'
                  value={password}
                  onChange={event => setPassword(event.target.value)}
                />
              </div>
              <div>
                <button className='submit' type='submit'>
                  Submit
                </button>
                <h4>Log in or create an account <Link to='/signup'>here</Link></h4>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
