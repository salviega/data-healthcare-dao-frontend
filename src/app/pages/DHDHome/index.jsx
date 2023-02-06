import './DHDHome.scss'
import figure1 from '../../../assets/images/usecase-fig1.svg'
import figure2 from '../../../assets/images/usecase-fig2.svg'
import figure3 from '../../../assets/images/usecase-fig3.svg'
import React from 'react'

export function DHDHome () {
  return (
    <div className='home'>
      <div className='home-spacer' />
      <p className='home__title' />
      <p className='home__subtitle'>
        ​Securely record and store your health data on the blockchain
      </p>
      <div className='home-buttons'>
        <button className='home-buttons__weareable'>Get a weareble</button>
        <button className='home-buttons__info'>Learn more</button>
      </div>
      <p className='home__info'>
        ​At DHD, we use state-of-the-art IoT wearables to track and record
        health rate data. These wearables are designed to be comfortable,
        discreet, and easy to use, so you can focus on your daily activities
        without interruption
      </p>
      <div className='home-panel'>
        <p className='home-panel__title'>Our first sensor</p>
        <p className='home-panel__description'>
          A high-precision heart rate sensor
        </p>
        <p className='home-panel__info' />
        <button className='home-panel__button'>Get a wearable</button>
      </div>
      <div className='home-usecase'>
        <p className='home-usecase__info'>
          IoT devices plus Blockchain technology brings a lot of benefits; your
          hearbeats. your data, your decisión. These are some use cases
        </p>
        <div className='home-usecase-list'>
          <div className='home-usecase-list-item'>
            <figure>
              <img src={figure1} alt='figure' />
            </figure>
            <p className='home-usecase-list-item__title'>Track your health</p>
            <p className='home-usecase-list-item__description'>
              Individuals can use our device to track their heart health over
              time, identifying patterns and trends that can help inform{' '}
            </p>
          </div>
          <div className='home-usecase-list-item'>
            <figure>
              <img src={figure2} alt='figure' />
            </figure>
            <p className='home-usecase-list-item__title'>Track your health</p>
            <p className='home-usecase-list-item__description'>
              Researchers may acquire HeartBeats data to study heart health in
              large populations, uncovering new insights and
            </p>
          </div>
          <div className='home-usecase-list-item'>
            <figure>
              <img src={figure3} alt='figure' />
            </figure>
            <p className='home-usecase-list-item__title'>Track your health</p>
            <p className='home-usecase-list-item__description'>
              Healthcare professionals may use your data to provide more
              accurate diagnoses and more effective treatment plans for
            </p>
          </div>
        </div>
      </div>
      <div className='home-research'>
        {/* <button className='home-research__app'>For Research Teams</button> */}
        <p className='home-research__title' />
        <p className='home-research__description' />
        <button className='home-research__acquire'>Acquire data</button>
      </div>
      <div className='home-newsletter'>
        <p className='home-newsletter__title'>
          Your health, your data, your decission
        </p>
        <input className='home-newsletter__input' placeholder='Your email' />
        <button className='home-newsletter__submit'>
          Subscribe to our newsletter
        </button>
      </div>
    </div>
  )
}
