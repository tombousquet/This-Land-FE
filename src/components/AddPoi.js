import { useRef, useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import clsx from 'clsx'
import mapboxgl from 'mapbox-gl'
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css'

export default function AddPoi ({ auth }) {
  mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN

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
  const [newMarker, setNewMarker] = useState({})

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/tombousquet/ckinqejtv0v2617ms4kflvkp8',
      // centered on durham
      center: [-78.8986, 35.994],
      zoom: 13
    })
    map.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true
        },
        trackUserLocation: true
      })
    )
    // search and locate by address, name
    map.addControl(
      new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl

      })
    )

    // zoom buttons
    map.addControl(new mapboxgl.NavigationControl(), 'top-right')

    const coordinates = document.getElementById('coordinates')

    const marker = new mapboxgl.Marker({
      draggable: true
    })
      .setLngLat([-78.9, 36])
      .addTo(map)

    function onDragEnd () {
      const lngLat = marker.getLngLat()
      // coordinates.style.display = 'block'
      coordinates.innerHTML = 'Longitude: ' + lngLat.lng + '<br />Latitude: ' + lngLat.lat

      axios.get('https://api.mapbox.com/geocoding/v5/mapbox.places/' + lngLat.lng + ',' + lngLat.lat + '.json?access_token=pk.eyJ1IjoidG9tYm91c3F1ZXQiLCJhIjoiY2tpbnE3eG5iMHFwZjJ4cGYzcTF4ZmI0aiJ9.o8dmBmerSg0lTilbWTqfSw')
        .then(response => {
          setNewMarker(response.data.features[0])
        })
    }
    console.log(newMarker.place_name)
    marker.on('dragend', onDragEnd)

    mapRef.current = map

    return () => map.remove()
  }, [newMarker])

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
    data.set('username', auth.username)

    const image = document.getElementById('images').files[0]
    if (image) {
      data.set('images', image)
    }

    axios
      .post(
        'http://this-land-team-5.herokuapp.com/api/pointsofinterest/',
        data,
        {
          headers: {
            'content-type': 'multipart/form-data'
          }
        }, { auth }
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
    return (
      <div>
        <Redirect exact to='/map' />
      </div>
    )
  }

  return (
    <div className='ma3'>
      <div className='ma3'>
        <h1 className='center title'>Add a Point of Interest</h1>
      </div>
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
          className='map-container center ma3 mapAdd'
          ref={mapContainerRef}
        />
        <div>
          <form className='form' onSubmit={handleSubmit}>
            <div>
              <div className='mh2 mv3'>
                <label className='mv2  mh2 b' htmlFor='title'>
                  Location Name
                </label>
                <input
                  className='mh4'
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
              <button className='ml6 mv2 ' type='submit'>
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
