import React from 'react'
import { Routes,Route } from 'react-router-dom'
import { Movies } from '../Page/Movies'
import { Tvshow } from '../Page/Tvshow'
import { Action } from '../Page/Action'
import { SearchList } from '../component/SearchList'
import { Players } from '../component/PLayer'
export const AllPage = () => {
  return (
    <Routes>
        <Route path='/' element={<Action />} />
        <Route path='/movies' element={<Movies />} />
        <Route path='/tvshow' element = {<Tvshow />} />
        <Route path='/search/:searchName' element={<SearchList />} />
        <Route path='/player/:playId' element={<Players />}/>
    </Routes>
  )
}
