// import axios from 'axios'
// import clsx from 'clsx'
// import { useState } from 'react'
// import { Link, Redirect } from 'react-router-dom'

// export default function Login ({ auth, onLogin }) {
//   const [username, setUsername] = useState([
//     { username: 'Charlette' }
//   ])
//   const [password, setPassword] = useState([
//     { password: 'pass' }
//   ])
//     const [feedbackMsg, setFeedbackMsg] = useState('')

//   function handleSubmit (event) {
//     event.preventDefault(

//       axios.get('https://books-api.glitch.me/api/users', {
//         auth: {
//           username: username,
//           password: password
//         }
//       })
//             .then(response => {
//               setFeedbackMsg({ type: 'success', message: 'Logged in.' })
//               onLogin({ username, password })
//             })
//             .catch(error => {
//               setFeedbackMsg({ type: 'error', message: 'The username or password is invalid' })
//               console.log(error)
//             })
//         }

//     if (auth) {
//         return <Redirect to='/' />

//     )

//     return (
//       <div className='Title'>
//         <h1 className=' f1 b white'>This Land</h1>

//         <div className='Login'>
//           <h1 className='f3 b white'>Log In or <Link to='/signup'>Sign up</Link></h1>
//           {
//           feedbackMsg &&
//           (
//             <div className={clsx(
//               'ba', 'bw1', 'pa3', 'w-50',
//               {
//                 'bg-black': (feedbackMsg.type === 'error'),
//                 'bg-washed-yellow': (feedbackMsg.type === 'success')
//               }
//             )}
//             >
//               {feedbackMsg.message}
//             </div>
//           )
//       }
//           <form onSubmit={handleSubmit}>
//             <div className='mv2'>
//               <label className='db b mv2 washed-yellow' htmlFor='username'>Username</label>
//               <input
//                 required
//                 className='f5 pa2 w-50'
//                 type='text'
//                 id='username'
//                 value={username}
//                 onChange={event => setUsername(event.target.value)}
//               />
//             </div>
//             <div className='mv2'>
//               <label className='db b mv2 washed-yellow' htmlFor='password'>Password</label>
//               <input
//                 required
//                 className='f5 pa2 w-50'
//                 type='password'
//                 id='password'
//                 value={password}
//                 onChange={event => setPassword(event.target.value)}
//               />
//             </div>
//             <div className='mv2 washed-yellow'>
//               <button type='submit'>Log In</button>
//             </div>
//           </form>
//         </div>
//       </div>
//     )
//   }
// }
