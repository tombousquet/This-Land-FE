import React from 'react'

import './SideDrawer.css'

const sideDrawer = props => (
  <nav className='side-drawer'>
    <ul>
      <li><a href='/map'>Home</a></li>
      <li><a href='/add'>Add a Point of Interest</a></li>
      <li><a href='/login'>Login/Sign up</a></li>
    </ul>
  </nav>
)

export default sideDrawer
