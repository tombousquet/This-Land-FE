import React from 'react'

import './SideDrawer.css'

const sideDrawer = props => (
  <nav className='side-drawer'>
    <ul>
      <li><a href='/'>Home</a></li>
      <li><a href='/'>Add a Point of Interest</a></li>
      <li><a href='/'>Add a Comment</a></li>
    </ul>
  </nav>
)

export default sideDrawer
