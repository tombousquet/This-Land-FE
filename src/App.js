import './App.css'
import 'tachyons'
import Register from './components/Profile'
import Login from './components/Login'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import { useLocalStorage } from './Hooks'
import Addpoi from './components/Addpoi'

function App () {
  const [auth, setAuth] = useLocalStorage('poi_auth', null)

  
