import MapView from './components/MapView'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css'

function App () {
  return (
    <Router>
      <MapView />
      <Switch>
        <Route path='/map'>
          <MapView />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
