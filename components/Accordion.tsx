import React from 'react';

interface ModalProps {
  children: React.ReactElement
  onCloseModal: () => void
}

const Accordion = (props: ModalProps) => {
  const { children, onCloseModal } = props
  return (
    <div className='container' onClick={onCloseModal}>
      <div className='overlay' />
      {children}
      <style jsx>
        {`
          .container {
            position: absolute;
            top: 66px;
            right: 0px;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 220px;
            background-color: transparent;
          }
          .overlay {
            position: fixed;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
          }
        `}
      </style>
    </div>
  )
}

export default Accordion