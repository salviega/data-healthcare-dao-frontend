import './DHDHome.scss'
import React from 'react'

export function DHDHome() {
	return (
		<div className='home'>
			<div className='home-background'>
				<p className='home__title' />
				<p className='home__subtitle'>
					​Securely record and store your health data on the blockchain
				</p>
				<div className='home-buttons'>
					<button className='home-buttons__weareable'>Get a weareble</button>
					<button className='home-buttons__info'>Learn more</button>
				</div>
				<div className='home-content'>
					<div className='home-content-info'>
						<p className='home-content-info__description'>
							​At DHD, we use state-of-the-art IoT wearables to track and record
							health rate data. These wearables are designed to be comfortable,
							discreet, and easy to use, so you can focus on your daily
							activities without interruption
						</p>
					</div>
				</div>
			</div>
		</div>
	)
}
