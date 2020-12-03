import Link from 'next/link'
import { useState } from 'react';
import { BASE_TEXT, GRAY, PRIMARY } from '../constants/style/color';
import { useUser } from '../utils/auth/useUser';
import Accordion from './Accordion'

const Header = () => {
  const { logout } = useUser()
  const [isOpenAccordion, setIsOpenAccordion] = useState(false)

  const handleOpenAccordion = () => {
    setIsOpenAccordion(true)
  }

  const handleCloseAccordion = () => {
    setIsOpenAccordion(false)
  }

  return (
    <div className='wrapper'>
      <header>
        <Link href="/">
          <img src='/icon.png' alt='logo' className='logo' />
        </Link>
        <img src="/default-user-icon.png" alt="user-icon" className='user-icon' onClick={handleOpenAccordion} />
        {
          isOpenAccordion && (
            <Accordion onCloseModal={handleCloseAccordion}>
              <div className='accordion-contents-wrapper'>
                <p className='accordion-contents' onClick={logout}>logout</p>
              </div>
            </Accordion>
          )
        }
          {/* <button onClick={logout}>logout</button> */}
      </header>
      <style jsx>
        {`
          .wrapper {
            border-bottom: 1px solid ${GRAY};
          }
          header {
            position: relative;
            display: flex;
            justify-content: space-between;
            margin: 0 auto;
            padding: 15px;
            max-width: 1200px;
            width: 100%;
            height: 66px;
          }
          .logo {
            cursor: pointer;
            height: 100%;
          }
          .user-icon {
            cursor: pointer;
            border-radius: 50%;
            height: 100%;
          }
          .accordion-contents-wrapper {
            z-index: 1;
            box-shadow: rgba(0, 61, 111, 0.25) 0px 3px 12px;
            width: 100%;
          }
          .accordion-contents{
            text-align: left;
            font-size: 12px;
            padding: 10px;
            color: ${BASE_TEXT};
            transition: all 0.2s ease;
          }
          .accordion-contents:hover {
            color: ${PRIMARY};
          }
        `}
      </style>
    </div>
  )
}

export default Header

