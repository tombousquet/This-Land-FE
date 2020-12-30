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
  const [auth, setAuth] = useLocalStorage('book_auth', null)

  return (
    <Router>
      <div style={{ height: '100%' }}>
        <Toolbar
          drawerClickHandler={() => setSideDrawerOpen(!sideDrawerOpen)}
        />
        {sideDrawerOpen && <><SideDrawer /> <Backdrop /></>}
        <main style={{ marginTop: '80px' }} />
        {auth && (
          <div>
            <span> {auth.username}</span> | <button onClick={() => setAuth(null)}>Log out</button>
          </div>
        )}
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
            />
          </Route>
          <Route path='/map'>
            <MapView />
          </Route>
          <Route path='/detail/:id'>
            <PoiDetail />
          </Route>
          <Route path='/comment/:id/add'>
            <AddComment />
          </Route>
          <Route path='/add'>
            <AddPoi />
          </Route>
        </Switch>
      </div>
    </Router>

  )
}

export default App
