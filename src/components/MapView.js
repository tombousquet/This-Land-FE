import { useRef, useEffect, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import axios from 'axios'
import { useLocalStorage } from '../Hooks'

export default function MapView () {
  mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN

  const mapContainerRef = useRef(null)
  const mapRef = useRef(null)
  const [pois, setPois] = useState([])
  const [showPopUp1, setShowPopUp1] = useLocalStorage('showPopUp1', true)
  const [showPopup2, setShowPopUp2] = useLocalStorage('showPopUp2', true)
  const [showPopUp3, setShowPopUp3] = useLocalStorage('showPopUp3', true)

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/tombousquet/ckjep6fok7uyw1ao069ohe6wg',
      // centered on lower 48
      center: [-96, 35],
      zoom: 3
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

    map.addControl(new mapboxgl.FullscreenControl({
      container: mapContainerRef.current
    }))

    // zoom buttons
    map.addControl(new mapboxgl.NavigationControl(), 'top-right')

    mapRef.current = map

    axios.get('https://this-land-team-5.herokuapp.com/api/pointsofinterest/')
      .then(response => {
        setPois(response.data)
        console.log('pois:', response.data)
      })

    if (showPopUp1 === true) {
      const popup1 = new mapboxgl.Popup(
        {
          closeOnClick: false,
          offset: 25
        }
      )
        .setLngLat([-110, 43])
        .addTo(mapRef.current)
        .setHTML(
        `<div>
        <h5>Use the geolocater button in the top-right corner to find your location</h5>
        </div>`)

      // function sets ShowPopUp state to false so pop up only appears until it is closed
      popup1.on('close', function () {
        setShowPopUp1(false)
      })
    }

    if (showPopup2 === true) {
      const popup2 = new mapboxgl.Popup(
        {
          closeOnClick: false,
          offset: 25
        }
      )
        .setLngLat([-103, 29])
        .addTo(mapRef.current)
        .setHTML(
            `<div>
            <h5>Select a marker on the map to see the name of the location and a link for more details</h5>
            </div>`)

      popup2.on('close', function () {
        setShowPopUp2(false)
      })
    }

    if (showPopUp3 === true) {
      const popup3 = new mapboxgl.Popup(
        {
          closeOnClick: false,
          offset: 25
        }
      )
        .setLngLat([-85, 36])
        .addTo(mapRef.current)
        .setHTML(
                `<div>
                <h5>Add a story to a particular point of interest or create your own point of interest to learn more!</h5>
                </div>`)

      popup3.on('close', function () {
        setShowPopUp3(false)
      })
    }

    // prevents memory leak
    return () => map.remove()
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    // isolating address info based on database poi data
    for (const poi of pois) {
      const streetAddress = poi.street_address
      const city = poi.city
      const state = poi.state
      const zip = poi.zip_code

      // creates search query for mapbox forward geocode - address into coordinates
      axios.get('https://api.mapbox.com/geocoding/v5/mapbox.places/' + streetAddress + '%20' + city + '%20' + state + '%20' + zip + '.json?access_token=pk.eyJ1IjoidG9tYm91c3F1ZXQiLCJhIjoiY2tpbnE3eG5iMHFwZjJ4cGYzcTF4ZmI0aiJ9.o8dmBmerSg0lTilbWTqfSw')
        .then(response => {
          addMarker(response.data.features[0], poi)
        }, [])
    }
  }, [pois])

  const addMarker = (location, poi) => {
    // if the data is available and the map is loaded, create a marker for each location
    if (location.center && mapRef.current) {
      const locationName = poi.location_name
      const newPopup = new mapboxgl.Popup(
        {
          offset: 25
        }
      ).setHTML(
        `<div className='marker-popup'>
        <a href='/detail/${poi.id}'>${locationName}</a>
        </div>`)

      new mapboxgl.Marker({
        color: '#708090'
      }).setLngLat(location.center)
        .setPopup(newPopup)
        .addTo(mapRef.current)
    }
  }

  return (
    <div>
      <div className='map-container' ref={mapContainerRef} />
    </div>
  )
}
