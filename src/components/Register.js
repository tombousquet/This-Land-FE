import axios from 'axios'
import clsx from 'clsx'
import { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'

export default function Register ({ auth, onRegister }) {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [feedbackMsg, setFeedbackMsg] = useState('')

  function handleSubmit (event) {
    event.preventDefault()

    axios.post('https://this-land-team-5.herokuapp.com/auth/users/', {
      username: username,
      email: email,
      password: password
    })
      .then(response => {
        setFeedbackMsg({ type: 'success', message: 'User successfully created.' })
        onRegister(username, email, password)
      })
      .catch(error => {
        setFeedbackMsg({ type: 'error', message: error.response.data.errors })
        console.log(error.response.data)
      })
  }
  if (auth) {
    return <Redirect to='/' />
  }

  // if (feedbackMsg.type === 'success') {
  //   return <Redirect to='/' />
  // }

  return (
    <div className='bg-img2'>
      <div className='Register'>
        <h1 className=' f2 b black'>Welcome to Your History</h1>
        <h1 className='f3 b black'>Sign Up or <Link to='/login'>Log In</Link></h1>
        {
          feedbackMsg &&
          (
            <div className={clsx(
              'ba', 'bw1', 'pa3', 'w-50',
              {
                'bg-black': (feedbackMsg.type === 'error'),
                'bg-washed-yellow': (feedbackMsg.type === 'success')
              }
            )}
            >
              {feedbackMsg.message}
            </div>
          )
      }
        <form
          onSubmit={handleSubmit}
          className='container'
        >
          <label className='db b mv2 black' htmlFor='username'>Email</label>
          <input
            required
            type='text'
            placeholder='Enter Email'
            id='email'
            value={email}
            onChange={event => setEmail(event.target.value)}
          />
          <label className='db b mv2 black' htmlFor='username'>Username</label>
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
          <div>
            <button className='submit' type='submit'>
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
