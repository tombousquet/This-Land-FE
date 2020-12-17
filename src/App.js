import MapView from './components/MapView'
import PoiDetail from './components/PoiDetail'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css'
import 'tachyons'
import Toolbar from './components/Toolbar/Toolbar'
import SideDrawer from './components/SideDrawer/SideDrawer'
import Backdrop from './components/Backdrop/Backdrop'
import React, { useState } from 'react'

function App (props) {
  const { App } = props

  const [sideDrawerOpen, setSideDrawerOpen] = useState(false)

  return (
    <Router>
      <div style={{ height: '100%' }}>
        <Toolbar
          if drawerClickHandler={() => setSideDrawerOpen(!sideDrawerOpen)}
        />
        {sideDrawerOpen && <><SideDrawer /> <Backdrop /></>}
        <main style={{ marginTop: '80px' }} />
        <Switch>
          <Route path='/map'>
            <MapView />
          </Route>
          <Route path='/location'>
            <PoiDetail />
          </Route>
        </Switch>
      </div>
    </Router>

  )
}

export default App
