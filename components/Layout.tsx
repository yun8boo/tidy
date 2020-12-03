import React, { ReactNode } from 'react'
import Head from 'next/head'
import { BASE_TEXT, TITLE, BACK_GROUND } from '../constants/style/color';
import Header from './Header';

type Props = {
  children?: ReactNode
  title?: string
}

const Layout = ({ children, title = 'This is the default title' }: Props) => {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Header />
      <div className='container'>
        {children}
      </div>
      <style jsx>
        {`
          .container {
            max-width: 1200px;
            margin: 0 auto;
            width: 100%;
          }
        `}
      </style>
      <style global jsx>{`
        *,*::before,*::after{box-sizing:border-box}ul[class],ol[class]{padding:0}body,h1,h2,h3,h4,p,ul[class],ol[class],figure,blockquote,dl,dd{margin:0}html{scroll-behavior:smooth}body{min-height:100vh;text-rendering:optimizeSpeed;line-height:1.5}ul[class],ol[class]{list-style:none}a:not([class]){text-decoration-skip-ink:auto}img,picture{max-width:100%;display:block}article>*+*{margin-top:1em}input,button,textarea,select{font:inherit}img:not([alt]){filter:blur(10px)}@media(prefers-reduced-motion:reduce){*{animation-duration:.01ms !important;animation-iteration-count:1 !important;transition-duration:.01ms !important;scroll-behavior:auto !important}}
        body {
          background-color: ${BACK_GROUND};
        }
        p, span, li {
          color: ${BASE_TEXT};
        }
        h1, h2, h3, h4, h5 {
          color: ${TITLE};
        }
      `}</style>
    </div>
  ) 
}

export default Layout
