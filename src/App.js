import MapView from './components/MapView'
import PoiDetail from './components/PoiDetail'
import AddPoi from './components/AddPoi'
import AddComment from './components/AddComment'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { useLocalStorage } from './Hooks'
import './App.css'
import 'tachyons'
import Toolbar from './components/Toolbar/Toolbar'
import SideDrawer from './components/SideDrawer/SideDrawer'
import Backdrop from './components/Backdrop/Backdrop'
import React, { useState } from 'react'
import Register from './components/Register'
import Login from './components/Login'

function App (props) {
  const [sideDrawerOpen, setSideDrawerOpen] = useState(false)
  const [auth, setAuth] = useLocalStorage('poi_auth', null)
  const [token, setToken] = useLocalStorage('token_auth', null)

  return (
    <Router>
      <div style={{ height: '100%' }}>
        <Toolbar
          handleDrawerClick={() => setSideDrawerOpen(!sideDrawerOpen)}
          token={token}
        />
        {sideDrawerOpen && <><SideDrawer token={token} /> <Backdrop onClick={() => setSideDrawerOpen(false)} /></>}
        <main style={{ marginTop: '80px' }} />
        <Switch>
          <Route path='/signup'>
            <Register
              auth={auth}
              onRegister={setAuth}
            />
          </Route>
          <Route path='/login'>
            <Login
              auth={auth}
              onLogin={setAuth}
              token={token}
              onToken={setToken}
            />
          </Route>
          <Route exact path='/'>
            <MapView />
          </Route>
          <Route path='/detail/:id'>
            <PoiDetail
              token={token}
              auth={auth}
            />
          </Route>
          <Route path='/comment/:id/add'>
            <AddComment
              auth={auth}
              token={token}
            />
          </Route>
          <Route path='/add'>
            <AddPoi
              auth={auth}
              token={token}
            />
          </Route>
        </Switch>
      </div>
    </Router>

  )
}

export default App
