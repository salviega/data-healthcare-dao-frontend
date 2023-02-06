import './DHDAcquireData.scss'
import React, { useRef } from 'react'
import { Footer } from '../../shared/Footer'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { ethers } from 'ethers'
import axios from 'axios'
import { setLoading } from '../../../store/actions/uiActions'

const CREATE_PROPOSAL =
	'http://ec2-100-24-74-70.compute-1.amazonaws.com:8088/form/'

export function DHDAcquireData() {
	const user = useSelector(store => store.auth)
	const contracts = useSelector(store => store.contracts)
	const dispatch = useDispatch()

	const institute = useRef()
	const wallet = useRef()
	const project = useRef()
	const minAge = useRef()
	const maxAge = useRef()
	const minHeight = useRef()
	const maxHeight = useRef()
	const minWeight = useRef()
	const maxWight = useRef()
	const country = useRef()
	const genere = useRef()
	const time = useRef()
	let deadline = new Date()

	const onAcquireData = async event => {
		event.preventDefault()

		let info = {
			INSTITUCION: institute.current.value,
			WALLET: wallet.current.value,
			NOMBRE_PROYECTO: project.current.value,
			MIN_EDAD: parseInt(minAge.current.value),
			MAX_EDAD: parseInt(maxAge.current.value),
			MIN_PESO: parseInt(minHeight.current.value),
			MAX_PESO: parseInt(maxHeight.current.value),
			MIN_ESTATURA: parseInt(minWeight.current.value),
			MAX_ESTATURA: parseInt(maxWight.current.value),
			PAIS: country.current.value,
			GENERO: genere.current.value,
			TIME_STAMP: 0,
			ID_QUERY: 0
		}

		deadline.setDate(deadline.getDate() + parseInt(time.current.value))
		info.TIME_STAMP = deadline.getTime() // timestamp

		if (parseInt(info.MIN_EDAD) >= parseInt(info.MAX_EDAD)) {
			window.alert('Min age greater than max age')
			return
		} else if (parseInt(info.MIN_ESTATURA) >= parseInt(info.MAX_ESTATURA)) {
			window.alert('Min heigth greater than max heigth')
			return
		} else if (parseInt(info.MIN_PESO) >= parseInt(info.MAX_PESO)) {
			window.alert('Min weight greater than max wight')
			return
		}

		// dispatch(setLoading(true))

		contracts.fundsContract.on('ArrangeData', async (queryId, deadline) => {
			const queryIdParsed = ethers.BigNumber.from(queryId).toNumber()
			const deadlineParsed = ethers.BigNumber.from(deadline).toNumber()
			info.ID_QUERY = queryIdParsed
			info.TIME_STAMP = deadlineParsed

			await axios.post(CREATE_PROPOSAL, info)
			window.alert('The acquerid data was done')
			dispatch(setLoading(false))
		})

		await contracts.fundsContract.rentData(info.TIME_STAMP, {
			value: ethers.utils.parseEther('0.1'),
			gasLimit: 250000
		})
	}

	if (user.address === 'Connect wallet') {
		return <Navigate to='/' />
	}

	return (
		<div className='acquire'>
			<div className='acquire-spacer' />
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
				<form className='acquire-container-form' onSubmit={onAcquireData}>
					<input
						className='acquire-container-form__primary'
						placeholder='Institution, Organization, Government or particular name'
						type='text'
						maxLength='100'
						required
						ref={institute}
					></input>
					<input
						className='acquire-container-form__primary'
						placeholder='Public Address FVM: f1a35ynen77vc5dysimn...'
						type='text'
						maxLength='100'
						required
						ref={wallet}
					></input>
					<input
						id='form-primary__last'
						className='acquire-container-form__primary'
						placeholder='Name of your project or investigation'
						type='text'
						maxLength='100'
						required
						ref={project}
					></input>
					<p className='acquire-container__description'>
						The following questions will allow us to classify the information
						according to its need for characterization.
					</p>
					<div className='acquire-container-form-section'>
						<input
							className='acquire-container-form__secundary'
							placeholder='Min age: 25'
							type='number'
							min='1'
							required
							ref={minAge}
						></input>
						<input
							className='acquire-container-form__secundary'
							placeholder='Max age: 30'
							type='number'
							min='1'
							required
							ref={maxAge}
						></input>
						<input
							className='acquire-container-form__secundary'
							placeholder='Min height on cm: 180'
							type='number'
							min='100'
							required
							ref={minHeight}
						></input>
						<input
							className='acquire-container-form__secundary'
							placeholder='Max height on cms: 200'
							type='number'
							min='100'
							required
							ref={maxHeight}
						></input>
					</div>
					<div className='acquire-container-form-section'>
						<input
							className='acquire-container-form__secundary'
							placeholder='Min weight on kilograms: 55'
							type='number'
							min='1'
							required
							ref={minWeight}
						></input>
						<input
							className='acquire-container-form__secundary'
							placeholder='Min weight on kilograms: 95'
							type='number'
							min='1'
							required
							ref={maxWight}
						></input>
						<input
							className='acquire-container-form__secundary'
							placeholder='Location by country: Colombia'
							ref={country}
						></input>
					</div>
					<div className='acquire-container-form-checkbox'>
						<div className='acquire-container-form-checkbox__item'>
							<input type='checkbox' name='M' value='M' ref={genere} />
							<label for='male'>Male</label>
						</div>

						<div className='acquire-container-form-checkbox__item'>
							<input type='checkbox' name='F' value='F' ref={genere} />
							<label for='female'>Female</label>
						</div>
					</div>
					<p
						className='acquire-container__description'
						id='form-section-submit'
					>
						The information that we will request below is of vital importance
						since it will allow the holders of the data to make a better
						decision
					</p>
					<div className='acquire-container-form-section-third'>
						<input
							className='acquire-container-form__secundary'
							placeholder='Time you are requesting the data (on Days): 60'
							type='text'
							min='1'
							required
							style={{ width: '43.151rem' }}
							ref={time}
						></input>
						<button className='acquire-container-form__submit'>SUBMIT</button>
					</div>
				</form>
			</div>
		</div>
	)
}
