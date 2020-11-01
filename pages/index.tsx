import Link from 'next/link'
import {
  getUserFromCookie,
} from '../utils/auth/userCookies'
import Layout from '../components/Layout'
import EmptyState from '../components/EmptyState'
import Input from '../components/Input'

const Index = () => {
  const userFromCookie = getUserFromCookie()
  if(!userFromCookie) {
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
      <div className='emptystate-wrapper'>
        <EmptyState />
        <div className='mt-20' />
        <Input />
      </div>
      <style jsx>{`
        .emptystate-wrapper {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          margin-top: 50px;
          padding: 0 40px;
          max-width: 1200px;
          width: 100%; 
        }
        .mt-20 {
          margin-top: 20px;
        }
      `}</style>
    </Layout>
  )
}

export default Index
