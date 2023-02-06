import './Footer.scss'
import React from 'react'

export function Footer (props) {
  return (
    <footer className='footer'>
      <p className='footer__title'>© DHD Data Healthcare DAO 2023</p>
      <div className='footer-social'>
        <p className='footer-social__item'>LinkedIn</p>
        <p className='footer-social__item'>Telgram</p>
        <p className='footer-social__item'>Github</p>
      </div>
    </footer>
  )
}
