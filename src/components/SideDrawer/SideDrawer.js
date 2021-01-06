import React from 'react'
import { useLocalStorage } from '../../Hooks'
import { Link } from 'react-router-dom'
import './SideDrawer.css'

export default function SideDrawer (props) {
  const [auth, setAuth] = useLocalStorage('poi_auth', null)

  return (
    <nav className='side-drawer'>
      <ul>
        <li><a href='/'>Map</a></li>
        <li><a href='/add'>Add a Point of Interest</a></li>
        <div>
          {auth
            ? <li>Logged in as {auth} | <Link to='/login' onClick={() => setAuth(null)}>Log out</Link> </li>
            : <li><a href='/login'>Log in to add</a></li>}
        </div>
      </ul>
    </nav>
  )
}
