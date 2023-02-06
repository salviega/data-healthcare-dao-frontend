import './App.scss'
import { Navigate, Route, Routes } from 'react-router-dom'
import { DHDHome } from './pages/DHDHome'
import { Menu } from './shared/Menu'
import { DHDAcquireData } from './pages/DHDAcquireData'
import { DHDDashboard } from './pages/DHDDashboard'
import { DHDGovernance } from './pages/DHDGovernance'
import { useSelector } from 'react-redux'
import React from 'react'
import { Spinner } from './shared/Spinner'
import { Footer } from './shared/Footer'

function App () {
  const loading = useSelector(state => state.ui.loading)

  return (
    <>
      {loading
        ? (
          <Spinner />
          )
        : (
          <>
            <Menu />
            <main>
              <Routes>
                <Route path='/' element={<DHDHome />} />
                <Route path='/acquire-data' element={<DHDAcquireData />} />
                <Route path='/dashboard' element={<DHDDashboard />} />
                <Route path='/governance' element={<DHDGovernance />} />
                <Route path='*' element={<Navigate replace to='/' />} />
              </Routes>
            </main>
            <Footer />
          </>
          )}
    </>
  )
}

export default App
