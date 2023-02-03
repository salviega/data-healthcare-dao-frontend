import './DHDAcquireData.scss'
import React from 'react'
import { Footer } from '../../shared/Footer'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

export function DHDAcquireData() {
	const user = useSelector(store => store.auth)

	if (user.address === 'Connect wallet') {
		return <Navigate to='/' />
	}

	return (
		<div className='acquire'>
			<p className='acquire__title' />
			<p className='acquire__subtitle'>
				Access hundreds of records on health tracking through our secure
				blockchain infrastructure
			</p>
			<div className='acquire-buttons'>
				<button className='acquire-buttons__weareable'>Get a weareble</button>
				<button className='acquire-buttons__info'>Learn more</button>
			</div>
			<div className='acquire-container'>
				<p className='acquire-container__title'>Request data form</p>
				<form className='acquire-container-form'>
					<input
						className='acquire-container-form__primary'
						placeholder='Institution, Organization, Government or particular name'
					></input>
					<input
						className='acquire-container-form__primary'
						placeholder='Public Address FVM: f1a35ynen77vc5dysimn...'
					></input>
					<input
						id='form-primary__last'
						className='acquire-container-form__primary'
						placeholder='Name of your project or investigation'
					></input>
					<p className='acquire-container__description'>
						The following questions will allow us to classify the information
						according to its need for characterization.{' '}
					</p>
					<div className='acquire-container-form-section'>
						<input
							className='acquire-container-form__secundary'
							placeholder='Age range: 25 - 35'
						></input>
						<input
							className='acquire-container-form__secundary'
							placeholder='Size range on cm: 1.80 - 2.10'
						></input>
					</div>
					<div className='acquire-container-form-section'>
						<input
							className='acquire-container-form__secundary'
							placeholder='Weight range on Kg: 55 - 60'
						></input>
						<input
							className='acquire-container-form__secundary'
							placeholder='Location by country: Colombia'
						></input>
					</div>
					<div className='acquire-container-form-section'>
						<input
							className='acquire-container-form__secundary'
							placeholder='Gender (optional): '
						></input>
						<input
							id='form-secundary__last'
							className='acquire-container-form__secundary'
							placeholder='Location by country: Colombia'
						></input>
					</div>
					<p className='acquire-container__description'>
						The information that we will request below is of vital importance
						since it will allow the holders of the data to make a better
						decision
					</p>
					<div className='acquire-container-form-section'>
						<input
							className='acquire-container-form__secundary'
							placeholder='Offer (amount calculated on $FIL): 2.000 FIL '
						></input>
						<input
							id='form-secundary__last'
							className='acquire-container-form__secundary'
							placeholder='Upload here documentation that accredits your research'
						></input>
					</div>
					<div className='acquire-container-form-section'>
						<input
							className='acquire-container-form__secundary'
							placeholder='Time you are requesting the data (on Days): 60 days'
						></input>
						<button className='acquire-container-form__submit'>SUBMIT</button>
					</div>
				</form>
			</div>
			<Footer />
		</div>
	)
}
