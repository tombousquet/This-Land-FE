import React from 'react'
import DrawerToggleButton from '../SideDrawer/DrawerToggleButton'
import './Toolbar.css'

const toolbar = props => (
  <header className='toolbar'>
    <nav className='toolbar_navigation'>
      <div>
        <DrawerToggleButton />
      </div>
      <div className='toolbar_logo'><a href='/'>THIS LAND</a></div>
      <div className='spacer' />
      <div className='toolbar_navigation-items'>
        <ul>
          <li><a href='/'>Home</a></li>
          <li><a href='/'>Add a Point of Interest</a></li>
          <li><a href='/'>Add a Comment</a></li>
        </ul>
      </div>
    </nav>
  </header>
)

export default toolbar
