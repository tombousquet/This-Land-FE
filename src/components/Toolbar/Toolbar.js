import { useState } from 'react'
import DrawerToggleButton from '../SideDrawer/DrawerToggleButton'
import './Toolbar.css'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default function Toolbar ({ auth, token, setAuth, setToken, handleDrawerClick }) {
  const [feedbackMsg, setFeedbackMsg] = useState('')

  console.log({ feedbackMsg })
  console.log({ auth })
  console.log({ token })

  function logout () {
    axios.post('https://this-land-team-5.herokuapp.com/auth/token/logout',
      {},
      {
        headers: {
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
    <header className='toolbar'>
      <nav className='toolbar_navigation'>
        <div className='toolbar_toggle-button'>
          <DrawerToggleButton onClick={handleDrawerClick} />
        </div>
        <div className='toolbar_logo'><a href='/'>THIS LAND</a></div>
        <div className='spacer' />
        <div className='toolbar_navigation-items'>
          <ul>
            {auth && (
              <li><a href='/add'>Add a Point of Interest</a></li>
            )}
            <div>
              {auth
                ? <li>{auth} | <Link to='/login' onClick={() => logout()}>Log out</Link> </li>
                : <li><a href='/login'>Log in to add</a></li>}
            </div>
          </ul>
        </div>
      </nav>
    </header>
  )
}
