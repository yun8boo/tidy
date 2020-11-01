import { GRAY } from '../constants/style/color';

const Input = () => {
  return(
    <>
      <input type="text" placeholder='https://...' />
      <style jsx>{`
        input {
          border-radius: 5px;
          border: 2px solid ${GRAY};
          padding: 12px;
          height: 46px;
          width: 60%;
          background-color: ${GRAY};
        }
    `}</style>
    </>
  )
}

export default Input