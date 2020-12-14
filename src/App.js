import React, { useRef, useEffect } from 'react'
import mapboxgl from 'mapbox-gl'
import './App.css'

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN

function App () {
  const mapContainerRef = useRef(null)

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/tombousquet/ckinqejtv0v2617ms4kflvkp8',
      center: [-78.8986, 35.9940],
      zoom: 13
    })
    map.addControl(new mapboxgl.NavigationControl(), 'top-right')
    return () => map.remove()
  }, [])
  return <div className='map-container' ref={mapContainerRef} />
}

export default App
