import React from 'react'
import { Header } from '../Layout/Header'
interface Props {
    children:React.ReactNode
}
export const LayoutDefault = ({children}:Props) => {
  return (
    <div>
        <Header />
        <div className='mt-[100px]'>
            {children}
        </div>
    </div>
  )
}
