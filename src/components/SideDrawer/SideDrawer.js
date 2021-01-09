import { useState } from 'react'
import axios from 'axios'
import { useLocalStorage } from '../../Hooks'
import { Link } from 'react-router-dom'
import './SideDrawer.css'

export default function SideDrawer (props) {
  const [feedbackMsg, setFeedbackMsg] = useState('')
  const [auth, setAuth] = useLocalStorage('poi_auth', null)
  const [token, setToken] = useLocalStorage('token_auth', null)

  console.log({ feedbackMsg })
  console.log({ auth })
  console.log({ token })

  function logout () {
    axios.post('https://this-land-team-5.herokuapp.com/auth/token/logout',
      {

      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`
        }
      }
    ).then(response => {
      setAuth(null)
      setToken(null)
      setFeedbackMsg({ type: 'success', message: 'Logged out.' })
      console.log({ response })
    })
      .catch(error => {
        setFeedbackMsg({ type: 'error', message: 'You were unable to log out' })
        console.log(error)
      })
  }

  return (
    <nav className='side-drawer'>
      <ul>
        <li><a href='/'>Map</a></li>
        {auth && (
          <li><a href='/add'>Add a Point of Interest</a></li>
        )}
        <div>
          {auth
            ? <li>{auth} | <Link to='/login' onClick={() => logout()}>Log out</Link> </li>
            : <li><a href='/login'>Log in to add</a></li>}
        </div>
      </ul>
    </nav>
  )
}
