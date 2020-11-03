import { useState } from 'react'
import { GRAY } from '../constants/style/color';
import lazyFunction from '../utils/lazyFunction';

interface InputProps {
  setGlovalVale: (value: string) => void
}

const Input = (props: InputProps) => {
  const { setGlovalVale } = props
  const [value, setValue] = useState('')
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
    lazyFunction(setGlovalVale, 500)(e.target.value)
  }
  return(
    <>
      <input
        type="text"
        placeholder='https://...'
        value={value}
        onChange={handleOnChange}
      />
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