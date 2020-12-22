import { useRef, useEffect, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import axios from 'axios'

export default function MapView () {
  mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN

  const mapContainerRef = useRef(null)
  const mapRef = useRef(null)
  const [pois, setPois] = useState([])
  const [newMarker, setNewMarker] = useState([])
  let streetAddress
  let city
  let state
  let zip

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/tombousquet/ckinqejtv0v2617ms4kflvkp8',
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
        setPois(response.data[1])
        console.log(response.data[1])
      }, [setPois, mapRef, map, mapContainerRef])

    return () => map.remove()
  }, [])

  useEffect((setPois) => {
    console.log(pois)
    const streetAddress = pois.street_address
    const city = pois.city
    const state = pois.state
    const zip = pois.zip_code
    const fullAddress = (streetAddress + city + state + zip)
    console.log(fullAddress)

    axios.get('https://api.mapbox.com/geocoding/v5/mapbox.places/' + streetAddress + '%20' + city + '%20' + state + '%20' + zip + '.json?access_token=pk.eyJ1IjoidG9tYm91c3F1ZXQiLCJhIjoiY2tpbnE3eG5iMHFwZjJ4cGYzcTF4ZmI0aiJ9.o8dmBmerSg0lTilbWTqfSw')
      .then(response => {
        setNewMarker(response.data.features[0])
        console.log(response.data.features[0])
      }, [])
  }, [setPois, pois, streetAddress, city, state, zip])

  useEffect(() => {
    if (newMarker.center && mapRef.current) {
      console.log('location coordinates', newMarker.center)

      const marker = new mapboxgl.Marker({
        color: '#FFFFFF'
      }).setLngLat(newMarker.center)
        .addTo(mapRef.current)
    }
  }, [newMarker, mapRef])

  return (
    <div className='ma3'>
      <div className='ma3'>
        <h1 className='center title'>Find your location!</h1>
      </div>
      <div className='map-container center ma3' ref={mapContainerRef} />
    </div>
  )
}
