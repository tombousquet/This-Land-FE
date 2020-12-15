import React, { useRef, useEffect, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import './App.css'

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN

function App () {
  const mapContainerRef = useRef(null)

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/tombousquet/ckinqejtv0v2617ms4kflvkp8',
      // centered on durham
      center: [-78.8986, 35.9940],
      zoom: 13
    })
    // floating marker
    const marker = new mapboxgl.Marker({
      color: '#999999',
      anchor: 'bottom',
      draggable: true
    }).setLngLat([-78.9035, 35.992])
      .addTo(map)
    // track longitude and latitude
    const lngLat = marker.getLngLat()
    console.log('Long: ' + lngLat.lng + ', Lat: ' + lngLat.lat)
    // zoom buttons
    map.addControl(new mapboxgl.NavigationControl(), 'top-right')
    return () => map.remove()
  }, [])
  return <div className='map-container' ref={mapContainerRef} />
}

export default App
