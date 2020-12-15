import MapView from './components/MapView'
import PoiDetail from './components/PoiDetail'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css'
import 'tachyons'

function App () {
  return (
    <Router>
      <div>
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
