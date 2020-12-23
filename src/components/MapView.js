import { useRef, useEffect, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import axios from 'axios'

export default function MapView () {
  mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN

  const mapContainerRef = useRef(null)
  const mapRef = useRef(null)
  const [pois, setPois] = useState([])
  const [newMarker, setNewMarker] = useState([])

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
      const fullAddress = (streetAddress + city + state + zip)
      console.log(fullAddress)

      axios.get('https://api.mapbox.com/geocoding/v5/mapbox.places/' + streetAddress + '%20' + city + '%20' + state + '%20' + zip + '.json?access_token=pk.eyJ1IjoidG9tYm91c3F1ZXQiLCJhIjoiY2tpbnE3eG5iMHFwZjJ4cGYzcTF4ZmI0aiJ9.o8dmBmerSg0lTilbWTqfSw')
        .then(response => {
          setNewMarker(response.data.features[0])
          console.log(response.data.features[0])
        }, [])
    }
  }, [pois])

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
