import { useUser } from '../../utils/auth/useUser'
import { useRouter } from 'next/router'

const AuthPage = () => {
  const { user, login } = useUser()
  const router = useRouter()
  if(user) {
    router.push('/')
  }
  return (
    <>
      {process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}
      <h1>Hello Next.js 👋</h1>
      <button onClick={login}>sign in</button>
    </>
  )
}

export default AuthPage
