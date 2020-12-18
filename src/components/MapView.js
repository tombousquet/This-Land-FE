import { useRef, useEffect, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import axios from 'axios'

export default function MapView () {
  mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN

  const mapContainerRef = useRef(null)
  const [pois, setPois] = useState([])

  useEffect(() => {
    axios.get('https://api.mapbox.com/geocoding/v5/mapbox.places/409%20Blackwell%20St,%20Durham,%20NC%2027701.json?access_token=pk.eyJ1IjoidG9tYm91c3F1ZXQiLCJhIjoiY2tpbnE3eG5iMHFwZjJ4cGYzcTF4ZmI0aiJ9.o8dmBmerSg0lTilbWTqfSw')
      .then(response => {
        setPois(response.data.features)
      }, [])

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

    console.log(pois)
    const currentMarker = pois[0]
    console.log(currentMarker.center)

    const marker = new mapboxgl.Marker({
      color: '#FFFFFF'
    }).setLngLat(currentMarker.center)
      .addTo(map)

    return () => map.remove()
  })

  return (
    <div className='ma3'>
      <div className='ma3'>
        <h1 className='center title'>Find your location!</h1>
      </div>
      <div className='map-container center ma3' ref={mapContainerRef} />
    </div>
  )
}
