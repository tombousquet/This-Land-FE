import React from 'react'
import DrawerToggleButton from '../SideDrawer/DrawerToggleButton'
import './Toolbar.css'
import { useLocalStorage } from '../../Hooks'
import { Link } from 'react-router-dom'

export default function Toolbar (props) {
  const [auth, setAuth] = useLocalStorage('poi_auth', null)

  return (
    <header className='toolbar'>
      <nav className='toolbar_navigation'>
        <div className='toolbar_toggle-button'>
          <DrawerToggleButton onClick={props.handleDrawerClick} />
        </div>
        <div className='toolbar_logo'><a href='/map'>THIS LAND</a></div>
        <div className='spacer' />
        <div className='toolbar_navigation-items'>
          <ul>
            <li><a href='/map'>Home</a></li>
            {auth && (
              <li><a href='/add'>Add a Point of Interest</a></li>
            )}
            <div>
              {auth
                ? <li>Logged in as {auth.username} | <Link to='/login' onClick={() => setAuth(null)}>Log out</Link> </li>
                : <li><a href='/login'>Log in to add</a></li>}
            </div>
          </ul>
        </div>
      </nav>
    </header>
  )
}
