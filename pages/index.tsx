import Link from 'next/link'
import { useUser } from '../utils/auth/useUser';
import Layout from '../components/Layout'

const Index = () => {
  const { user, logout } = useUser()

  if(!user) {
    return (
      <div>
        <p>{process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}</p>
        <Link href='/auth'>
          <a href="">Sign in</a>
        </Link>
    </div>
    )
  }

  return (
    <Layout title="Home | Next.js + TypeScript Example">
      <h1>Hello Next.js 👋</h1>
    </Layout>
  )
}

export default Index
