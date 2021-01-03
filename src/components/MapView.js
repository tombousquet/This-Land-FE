import { useRef, useEffect, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import axios from 'axios'

export default function MapView () {
  mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN

  const mapContainerRef = useRef(null)
  const mapRef = useRef(null)
  const [pois, setPois] = useState([])

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/tombousquet/ckjep6fok7uyw1ao069ohe6wg',
      // centered on durham
      center: [-78.8986, 35.9940],
      zoom: 10
    })

    // locate user
    map.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true
        },
        trackUserLocation: true
      })
    )

    // zoom buttons
    map.addControl(new mapboxgl.NavigationControl(), 'top-right')

    mapRef.current = map

    axios.get('http://this-land-team-5.herokuapp.com/api/pointsofinterest/')
      .then(response => {
        setPois(response.data)
        console.log('pois:', response.data)
      })

    return () => map.remove()
  }, [])

  useEffect(() => {
    for (const poi of pois) {
      const streetAddress = poi.street_address
      const city = poi.city
      const state = poi.state
      const zip = poi.zip_code

      axios.get('https://api.mapbox.com/geocoding/v5/mapbox.places/' + streetAddress + '%20' + city + '%20' + state + '%20' + zip + '.json?access_token=pk.eyJ1IjoidG9tYm91c3F1ZXQiLCJhIjoiY2tpbnE3eG5iMHFwZjJ4cGYzcTF4ZmI0aiJ9.o8dmBmerSg0lTilbWTqfSw')
        .then(response => {
          addMarker(response.data.features[0], poi)
        }, [])
    }
  }, [pois])

  const addMarker = (location, poi) => {
    if (location.center && mapRef.current) {
      const locationName = poi.location_name

      const newPopup = new mapboxgl.Popup({ offset: 25 }).setHTML(
        `<div>
        <h5'>${locationName}</h5>
        <a href='/detail/${poi.id}'>More detail</a>
        </div>`)
      const marker = new mapboxgl.Marker({
        color: '#FFFFFF'
      }).setLngLat(location.center)
        .setPopup(newPopup)
        .addTo(mapRef.current)
      console.log(marker)
    }
  }

  return (
    <div className='ma3'>
      <div className='ma3'>
        <h1 className='center title'>Find your location!</h1>
      </div>
      <div className='map-container center ma3' ref={mapContainerRef} />
    </div>
  )
}
