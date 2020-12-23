import React from 'react'

import './SideDrawer.css'

const sideDrawer = props => (
  <nav className='side-drawer'>
    <ul>
      <li><a href='/map'>Home</a></li>
      <li><a href='/add'>Add a Point of Interest</a></li>
      <li><a href='/'>Sign In/Log In</a></li>
      <li><a href='/add'>Log Out</a></li>
    </ul>
  </nav>
)

export default sideDrawer
