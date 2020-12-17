import MapView from './components/MapView'
import PoiDetail from './components/PoiDetail'
import AddPoi from './components/AddPoi'
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
          <Route path='/detail'>
            <PoiDetail />
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
