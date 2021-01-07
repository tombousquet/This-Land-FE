
import { useRef, useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import clsx from 'clsx'
import mapboxgl from 'mapbox-gl'
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css'

export default function AddPoi ({ auth, token }) {
  mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN

  console.log({ auth })
  console.log({ token })

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
        placeholder: 'Find your location',
        mapboxgl: mapboxgl
      })
    map.addControl(marker)

    // This runs when a result is selected in the map search.
    marker.on('result', function (event) {
      const result = event.result
      let [location, address, city, stateAndZip] = result.place_name.split(', ')
      stateAndZip = stateAndZip.split(' ')
      const zip = stateAndZip[stateAndZip.length - 1]
      const state = stateAndZip.slice(0, stateAndZip.length - 1).join(' ')
      setLocationName(location)
      setStreetAddress(address)
      setCity(city)
      setState(state)
      setZipCode(zip)
    })

    mapRef.current = map

    return () => map.remove()
  }, [])

  function handleSubmit (event) {
    event.preventDefault()

    const data = new FormData()
    data.set('location_name', locationName)
    data.set('street_address', streetAddress)
    data.set('city', city)
    data.set('state', state)
    data.set('notes', notes)
    data.set('zip_code', zipCode)
    data.set('category', category)
    data.set('user', 'tom')

    const image = document.getElementById('images').files[0]
    if (image) {
      data.set('images', image)
    }

    axios
      .post(
        'https://this-land-team-5.herokuapp.com/api/pointsofinterest/',
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

  // if (feedbackMsg.type === 'success') {
  //   return (
  //     <div>
  //       <Redirect exact to='/' />
  //     </div>
  //   )
  // }

  return (
    <div className='ma3'>
      <div>
        {feedbackMsg && (
          <div
            className={clsx({
              'bg-red': feedbackMsg.type === 'error',
              white: feedbackMsg.type === 'error',
              'bg-green': feedbackMsg.type === 'success'
            })}
          >
            {feedbackMsg.message}
          </div>
        )}
        <pre id='coordinates' className='coordinates' />
        <div
          className='center mapAdd'
          ref={mapContainerRef}
        />
        <div className='form'>
          <form
            onSubmit={handleSubmit}
            className='container1'
          >
            <div>
              <div className='mh2 mv3'>
                <label className='mv2  mh2 b' htmlFor='title'>
                  Location Name
                </label>
                <input
                  className='mh1'
                  required
                  type='text'
                  id='locationName'
                  value={locationName}
                  onChange={(event) => setLocationName(event.target.value)}
                  placeholder='Name of Location'
                />
              </div>
              <div className='mh2 mv3'>
                <label className='mv2 b mh2' htmlFor='street address'>
                  Street Address
                </label>
                <input
                  className='mh1'
                  required
                  type='text'
                  id='streetAddress'
                  value={streetAddress}
                  onChange={(event) => setStreetAddress(event.target.value)}
                  placeholder='Street Address'
                />
              </div>
              <div className='mh2 mv3'>
                <label className='mv2 b mh2' htmlFor='city'>
                  City
                </label>
                <input
                  className='mh1'
                  required
                  type='text'
                  id='city'
                  value={city}
                  onChange={(event) => setCity(event.target.value)}
                  placeholder='City'
                />
              </div>
              <div className='mh2 mv3'>
                <label className='mv2 b mh2' htmlFor='state'>
                  State
                </label>
                <input
                  className='mh1'
                  required
                  type='text'
                  id='state'
                  value={state}
                  onChange={(event) => setState(event.target.value)}
                  placeholder='State'
                />
              </div>
              <div className='mh2 mv3'>
                <label className='mv2 b mh2' htmlFor='zipCode'>
                  Zip Code
                </label>
                <input
                  className='mh1'
                  required
                  type='text'
                  id='zipCode'
                  value={zipCode}
                  onChange={(event) => setZipCode(event.target.value)}
                  placeholder='zipCode'
                />
              </div>
              <div className='mh2 mv3'>
                <label className='mv2 b mh2' htmlFor='status'>
                  Notes
                </label>
                <input
                  className='mh3'
                  required
                  type='text'
                  id='status'
                  value={notes}
                  onChange={(event) => setNotes(event.target.value)}
                  placeholder='Add your notes here...'
                />
              </div>
              <div className='mh2 mv3'>
                <label className='mv2 b mh2' htmlFor='status'>
                  Image
                </label>
                <input
                  className='mh3'
                  type='file'
                  id='images'
                  placeholder='Choose your image to add'
                />
                <button type='reset'>Clear image</button>
              </div>
              <div className='mh2 mv3'>
                <label className='mv2 b mh2' htmlFor='status'>
                  Category
                </label>
                <select
                  className='mh3'
                  required
                  id='category'
                  value={category}
                  onChange={(event) => setCategory(event.target.value)}
                >
                  <option value='null'>Choose from below</option>
                  <option value='business'>Business</option>
                  <option value='church'>Church</option>
                  <option value='house'>House</option>
                  <option value='lot'>Lot</option>
                </select>
              </div>
            </div>
            <div>
              <button className='submit' type='submit'>
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
