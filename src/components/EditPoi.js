import { useRef, useState, useEffect } from 'react'
import { useParams, Redirect } from 'react-router-dom'
import axios from 'axios'
import clsx from 'clsx'
import mapboxgl from 'mapbox-gl'
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css'

export default function EditPoi ({auth, token}) {
  const [poi, setPoi] = useState({})
  const { id } = useParams()
  const mapContainerRef = useRef(null)
  const mapRef = useRef(null)
  const [locationName, setLocationName] = useState('')
  const [streetAddress, setStreetAddress] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [zipCode, setZipCode] = useState('')
  const [notes, setNotes] = useState('')
  const [category, setCategory] = useState('')
  const [feedbackMsg, setFeedbackMsg] = useState('')

  mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/tombousquet/ckjep6fok7uyw1ao069ohe6wg',
      // centered on durham
      center: [-96, 35],
      zoom: 2
    })

    // zoom buttons
    map.addControl(new mapboxgl.NavigationControl(), 'bottom-right')

    map.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true
        },
        trackUserLocation: true
      }), 'top-left'
    )
    // search and locate by address, name

    const marker = new MapboxGeocoder(
      {
        accessToken: mapboxgl.accessToken,
        marker: {
          color: 'blue'
        },
        placeholder: 'Search for your location',
        mapboxgl: mapboxgl
      })
    map.addControl(marker)

    // This runs when a result is selected in the map search.
    marker.on('result', function (event) {
      const result = event.result
      console.log({ result })
      if (result.place_type[0] === 'poi') {
        const location = result.text
        setLocationName(location)
      } else {
        const location = ''
        setLocationName(location)
      }
      if (result.place_type[0] === 'poi') {
        const address = result.properties.address
        setStreetAddress(address)
      } else {
        const address = result.place_name.split(', ')[0]
        setStreetAddress(address)
      }
      const city = result.context[2].text
      setCity(city)
      const state = result.context[3].short_code.split('-')[1]
      setState(state)
      const zip = result.context[1].text
      setZipCode(zip)
    })

    mapRef.current = map

    return () => map.remove()
  }, [])

  useEffect(() => {
    axios.get('https://this-land-team-5.herokuapp.com/api/pointsofinterest/' + id)
    .then(response => {
      setPoi(response.data)
    })
  }, [id])

  function handleEdit (event) {
    event.preventDefault()

    const data = new FormData()
    data.set('location_name', locationName)
    data.set('street_address', streetAddress)
    data.set('city', city)
    data.set('state', state)
    data.set('notes', notes)
    data.set('zip_code', zipCode)
    data.set('category', category)
    data.set('user', auth)

    const image = document.getElementById('images').files[0]
    if (image) {
      data.set('images', image)
    }

    axios
      .put(
        'https://this-land-team-5.herokuapp.com/api/pointsofinterest/' + id,
        data,
        {
          headers: {
            'content-type': 'multipart/form-data',
            Authorization: `Token ${token}`
          }
        }
      )
      .then((response) => {
        setFeedbackMsg({
          type: 'success',
          message: 'Point of Interest was successfully added!'
        })
        console.log(response)
      })
      .catch((error) => {
        setFeedbackMsg({ type: 'error', message: 'Information was invalid' })
        console.log(error)
      })
  }

  if (feedbackMsg.type === 'success') {
    return <Redirect to={'/detail/' + id} />
  }

  return(

  )
}