import './Menu.scss'
import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import brand from '../../../assets/images/brand.svg'
import { useSelector } from 'react-redux'
import { Wallet } from './Wallet'

export function Menu(props) {
	const privateRoutes = true
	const user = useSelector(state => state.auth)

	return (
		<header>
			<nav className='menu'>
				<div className='menu-left'>
					<Link to='/' style={{ textDecoration: 'none', color: 'inherit' }}>
						<figure>
							<img src={brand} alt='logo' />
						</figure>
					</Link>
				</div>
				<div className='menu-center'>
					{privateRoutes && user.address === 'Connect wallet' ? null : (
						<>
							<p className='menu-center__item'>
								<NavLink
									className={({ isActive }) => {
										return isActive ? 'menu-center__item--active' : ''
									}}
									to='/governance'
								>
									governance
								</NavLink>
							</p>
							<p className='menu-center__item'>
								<NavLink
									className={({ isActive }) => {
										return isActive ? 'menu-center__item--active' : ''
									}}
									to='/acquire-data'
								>
									Acquire Data
								</NavLink>
							</p>
							<p className='menu-center__item'>
								<NavLink
									className={({ isActive }) => {
										return isActive ? 'menu-center__item--active' : ''
									}}
									to='/dashboard'
								>
									Dashboard
								</NavLink>
							</p>
						</>
					)}
				</div>
			</nav>
			<Wallet />
		</header>
	)
}
