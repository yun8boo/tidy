import { useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import firebase from 'firebase/app'
import 'firebase/auth'
import initFirebase from '../auth/initFirebase'
import {
  getUserFromCookie,
  setUserCookie,
  removeUserCookkie
} from './userCookies'
import { mapUserData } from './mapUserData'


initFirebase()

const useUser = () => {
  const [user, setUser] = useState<ReturnType<typeof mapUserData>>()
  const router = useRouter()

  const logout = async() => {
    return firebase
      .auth()
      .signOut()
      .then(() => {
        router.push('/auth')
      }).catch(e => {
        console.error(e)
      })
  }

  const login = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithRedirect(provider);
  }

  useEffect(() => {
    const cancelAuthListener = firebase.auth().onAuthStateChanged((user) => {
      if(user) {
        const userData = mapUserData(user)
        setUserCookie(userData)
        setUser(userData)
      }else {
        removeUserCookkie()
        setUser(undefined)
      }
    })
    return () => {
      cancelAuthListener()
    }
  }, [])

  return { user, login, logout }
}

export { useUser }