import MapView from './components/MapView'
import PoiDetail from './components/PoiDetail'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css'
import 'tachyons'
import Toolbar from './components/Toolbar/Toolbar'
import SideDrawer from './components/SideDrawer/SideDrawer'
import Backdrop from './components/Backdrop/Backdrop'
import { render } from '@testing-library/react'

function App () {
  state = {
    sideDrawerOpen: false
  }

  drawerToggleClickHandler = () =>
    thisSetState((prevState) =>{
      return{sideDrawerOpen: !prevState.sideDrawerOpen};
    });
};

render() {
  let sideDrawer;
    letbackdrop;

    if(this.state.sideDrawerOpen){
      sideDrawer = <SideDrawer />;
      backdrop = <Backdrop />
    }

    return (
      <Router>
      <div style={{ height: '100%' }}>
        <Toolbar />
        {sideDrawer}
        {backdrop}
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
