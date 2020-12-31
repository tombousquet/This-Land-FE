import React from 'react'
import DrawerToggleButton from '../SideDrawer/DrawerToggleButton'
import './Toolbar.css'

const toolbar = props => (
  <header className='toolbar'>
    <nav className='toolbar_navigation'>
      <div className='toolbar_toggle-button'>
        <DrawerToggleButton onClick={props.drawerClickHandler} />
      </div>
      <div className='toolbar_logo'><a href='/'>T H I S   L A N D</a></div>
      <div className='spacer' />
      <div className='toolbar_navigation-items'>
        <ul>
          <li><a href='/map'>Home</a></li>
          <li><a href='/add'>Add a Point of Interest</a></li>
          <li><a href='/login'>Login/Sign Up</a></li>
        </ul>
      </div>
    </nav>
  </header>
)

export default toolbar
