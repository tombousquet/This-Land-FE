import { useState, useEffect } from 'react'
import { useParams, Redirect } from 'react-router-dom'
import axios from 'axios'
import clsx from 'clsx'
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css'

export default function EditPoi ({ auth, token }) {
  const [poi, setPoi] = useState({})
  const { id } = useParams()
  const [feedbackMsg, setFeedbackMsg] = useState('')

  const setPoiField = (field, value) => {
    setPoi({
      ...poi,
      [field]: value
    })
  }

  useEffect(() => {
    axios.get('https://this-land-team-5.herokuapp.com/api/pointsofinterest/' + id)
      .then(response => {
        setPoi(response.data)
      })
  }, [id])

  function handleEdit (event) {
    event.preventDefault()

    const data = new FormData()
    data.set('location_name', poi.location_name)
    data.set('street_address', poi.street_address)
    data.set('city', poi.city)
    data.set('state', poi.state)
    data.set('notes', poi.notes)
    data.set('zip_code', poi.zip_code)
    data.set('category', poi.category)
    data.set('user', auth)

    const image = document.getElementById('images').files[0]
    if (image) {
      data.set('images', image)
    }

    axios
      .put(
        'https://this-land-team-5.herokuapp.com/api/pointsofinterest/' + id + '/',
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
          message: 'Point of Interest updated!'
        })
        console.log(response)
      })
      .catch((error) => {
        setFeedbackMsg({ type: 'error', message: 'Information was invalid' })
        console.log(error)
      })
  }

  if (feedbackMsg.type === 'success') {
    return <Redirect to={'/detail/' + id} />
  }

  if (!auth) {
    return <Redirect to='/' />
  }

  return (
    <div className='ma3'>
      <div>
        <pre id='coordinates' className='coordinates' />
        <div className='form'>
          {feedbackMsg && (
            <div className={clsx(
              'ba bw2', 'pa3', 'w-100',
              {
                'light-gray': (feedbackMsg.type === 'error'),
                'bg-red': (feedbackMsg.type === 'error'),
                'bg-washed-red': (feedbackMsg.type === 'success')
              }
            )}
            >
              {feedbackMsg.message}
            </div>
          )}
          <form
            onSubmit={handleEdit}
            className='container1 center'
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
                  value={poi.location_name}
                  onChange={(event) => setPoiField('location_name', event.target.value)}
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
                  value={poi.street_address}
                  onChange={(event) => setPoiField('street_address', event.target.value)}
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
                  value={poi.city}
                  onChange={(event) => setPoiField('city', event.target.value)}
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
                  value={poi.state}
                  onChange={(event) => setPoiField('state', event.target.value)}
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
                  value={poi.zip_code}
                  onChange={(event) => setPoiField('zip_code', event.target.value)}
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
                  value={poi.notes}
                  onChange={(event) => setPoiField('notes', event.target.value)}
                  placeholder='Add your notes here...'
                />
              </div>
              <div className='mh2 mv3'>
                <label className='mv1 b mh2' htmlFor='status'>
                  Image
                </label>
                <input
                  className='mv1'
                  type='file'
                  id='images'
                  placeholder='Choose your image to add'
                />
                <button className='mv1' type='reset'>Clear Image</button>
              </div>
              <div className='mh2 mv3'>
                <label className='mv2 b mh2' htmlFor='status'>
                  Category
                </label>
                <select
                  className='mh3'
                  required
                  id='category'
                  value={poi.category}
                  onChange={(event) => setPoiField('category', event.target.value)}
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
