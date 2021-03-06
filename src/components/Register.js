import axios from 'axios'
import clsx from 'clsx'
import { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'

export default function Register ({ auth, onRegister, onToken }) {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [feedbackMsg, setFeedbackMsg] = useState('')
  const [registered, setRegistered] = useState(false)

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
      .then(() => {
        axios.post('https://this-land-team-5.herokuapp.com/auth/token/login', {
          username: username,
          password: password
        })
          .then(response => {
            setFeedbackMsg({ type: 'success', message: 'Logged in.' })
            onToken(response.data.auth_token)
            setRegistered(true)
          })
          .catch(error => {
            setFeedbackMsg({ type: 'error', message: 'The username or password is invalid' })
            console.log(error)
          })
      })
      .catch(error => {
        setFeedbackMsg({ type: 'error', message: Object.values(error.response.data)[0] })
        console.log('here is the error message', Object.values(error.response.data)[0])
      })
  }

  if (registered) {
    return <Redirect to='/' />
  }

  return (
    <div className='bg-img2'>
      <div className='Register'>
        <form
          onSubmit={handleSubmit}
          className='container mh5 mt5'
        >{
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
          <label className='db b mt1 black f3' htmlFor='username'>Email</label>
          <input
            className=''
            required
            type='text'
            placeholder='Enter Email'
            id='email'
            value={email}
            onChange={event => setEmail(event.target.value)}
          />
          <label className='db b black f3' htmlFor='username'>Username</label>
          <input
            required
            type='text'
            placeholder='Enter Username'
            id='username'
            value={username}
            onChange={event => setUsername(event.target.value)}
          />
          <div className='mv2'>
            <label className='db b black f3' htmlFor='password'>Password</label>
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
            <h4>Log in <Link to='/login'>here</Link></h4>
          </div>
        </form>
      </div>
    </div>
  )
}
