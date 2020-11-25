import { GetServerSideProps } from 'next'
import Link from 'next/link'
import { useState } from 'react';
import styled from 'styled-components'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { verifyIdToken } from '../utils/auth/firebaseAdmin';
import {
  getUserFromCookie,
} from '../utils/auth/userCookies'
import getCookie from '../utils/getCookie'
import initFirebase from '../utils/auth/initFirebase';
import Layout from '../components/Layout'
import EmptyState from '../components/EmptyState'
import Input from '../components/Input'
import Card from '../components/Card';
import { PRIMARY } from '../constants/style/color';
import { useUser } from '../utils/auth/useUser';
import { ArticleType } from '../interfaces';

const { db } = initFirebase()

interface IndexProps {
  articles: ArticleType[]
}

const Index = (props: IndexProps) => {
  const [value, setValue] = useState('')
  const { user } = useUser()
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


  const handleSetValue = (value: string) => {
    setValue(value)
  }

  const handlePostArticle = () => {
    db.doc(`users/${user!.id}`).collection('articles').add({
      url: value
    }).catch(function(error) {
      console.error("Error adding document: ", error);
    });
  }

  if(!!props && !props.articles.length) {
    return (
      <Layout title="Home | Next.js + TypeScript Example">
        <div className='emptystate-wrapper'>
          <EmptyState />
          <div className='input-wrapper mt-20'>
            <Input setGlovalVale={handleSetValue} />
            <Icon icon={faPlus} className='plus-icon' onClick={handlePostArticle} />
          </div>
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
          .input-wrapper {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
          }
          .mt-20 {
            margin-top: 20px;
          }
        `}</style>
      </Layout>
    )
  }

  return (
    <Layout title="Home | Next.js + TypeScript Example">
      <CardWrapper>
        {props.articles.map(article => {
          const handleDeleteArticle = () => {
            db.doc(`users/${user!.id}`).collection('articles').doc(article.id).delete()
          }
          return (
            <Card key={article.id} url={article.url} onDelete={handleDeleteArticle} />
          )
        })}
      </CardWrapper>
    </Layout>
  )
}

export default Index

export const getServerSideProps: GetServerSideProps = async ({req}) => {
  const cookie = getCookie('auth', req)
  if(!Object.keys(cookie).length) {
    return {
      props: {}
    }
  }
  const value = JSON.parse(cookie)
  const { uid } = await verifyIdToken(value.token)
  const articles: any[] = []
  const quersSnapshot = await db.doc(`users/${uid}`).collection('articles').get()
  quersSnapshot.forEach(doc => {
    const article = {
      id: doc.id,
      ...doc.data()
    }
    articles.push(article)
  })
  
  return {
    props: {
      articles
    }
  }
}

const Icon = styled(FontAwesomeIcon)`
  cursor: pointer;
  margin-left: 15px;
  color: ${PRIMARY};
  font-size: 25px;
  transition: all .3s ease;
  &:hover {
    opacity: .8;
  }
`

const CardWrapper = styled.div`
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
`