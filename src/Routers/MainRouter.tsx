import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Home, ButtonLink, DownshiftSelect, DownloadCsv, Filter  } from '../Components'

const MainRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* <Route path='/json-to-csv-file' element={< />} /> */}
        <Route path='/button-link' element={<ButtonLink/>} />
        <Route path='/downshift-select' element={<DownshiftSelect/>} />
        <Route path='/download-csv' element={<DownloadCsv/>} />
        <Route path='/filter' element={<Filter/>} />
        <Route path='/home' element={<Home/>} />
        <Route path='/' element={<Home/>} />
      </Routes>
    </Router>
  )
}

export default MainRouter
