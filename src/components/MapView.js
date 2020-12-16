import { useRef, useEffect } from 'react'
import mapboxgl from 'mapbox-gl'

export default function MapView () {
  mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN

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
  return (
    <div className='ma3'>
      <div className='ma3'>
        <h1 className='center title'>This Land</h1>
      </div>
      <div className='map-container center ma3' ref={mapContainerRef} />
    </div>
  )
}
