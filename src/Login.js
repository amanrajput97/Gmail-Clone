import { Button } from '@material-ui/core'
import React from 'react'
import { login } from './features/userSlice'
import { auth, provider } from './firebase'
import './Login.css'
import {useDispatch} from 'react-redux'
function Login() {
    const dispatch=useDispatch();
    const signIn = () => {
        auth.signInWithPopup(provider)
        .then(({user}) => {
            dispatch(login({
                displayName: user.displayName,
                email:user.email,
                photoUrl: user.photoURL 
            }))
        })
        .catch(error => alert(error.message));
    }
  return (
    //https://cellphones.com.vn/sforum/wp-content/uploads/2020/10/newgmaillogo.0.jpg
    <div className='login'>
        <div className='login__container'>
            <img src='https://logos-world.net/wp-content/uploads/2020/11/Gmail-Emblem.png' alt ='' />
            <Button variant='contained' color='primary' onClick={signIn}>
                Login
            </Button>
        </div>

    </div>
  )
}

export default Login