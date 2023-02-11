import './Wallet.scss'

import React, { useState } from 'react'
import { ethers } from 'ethers'
import { useDispatch, useSelector } from 'react-redux'
import { login, logout } from '../../../../store/actions/authActions'
import {
	destroyContracts,
	makeContracts
} from '../../../../store/actions/contractActions'
import {
	destroyProposals,
	getProposalsDetails
} from '../../../../store/actions/proposalActions'
import { CHAIN_NAMESPACES, WALLET_ADAPTERS } from '@web3auth/base'
import { Web3Auth } from '@web3auth/modal'
import { useNavigate } from 'react-router'

export function Wallet() {
	const [loading, setLoading] = useState(false)
	const user = useSelector(state => state.auth)
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const connect = async () => {
		setLoading(true)
		const web3auth = new Web3Auth({
			clientId: process.env.REACT_APP_WEB3AUTH_CLIENT_ID,
			chainConfig: {
				chainNamespace: CHAIN_NAMESPACES.EIP155,
				chainId: '0x5' // hex of 5, goerli - hex of 80001, polygon testnet
			},
			uiConfig: {
				appLogo: 'https://images.web3auth.io/web3auth-logo-w.svg',
				theme: 'dark',
				loginMethodsOrder: [
					'google',
					'facebook',
					'twitter',
					'email_passwordless'
				],
				defaultLanguage: 'en'
			}
		})

		if (!web3auth) {
			console.log('web3auth not initialized yet')
			return
		}

		await web3auth.initModal({
			modalConfig: {
				[WALLET_ADAPTERS.OPENLOGIN]: {
					label: 'openlogin',
					loginMethods: {
						reddit: {
							showOnModal: false
						},
						github: {
							showOnModal: false
						},
						linkedin: {
							showOnModal: false
						},
						twitch: {
							showOnModal: false
						},
						line: {
							showOnModal: false
						},
						kakao: {
							showOnModal: false
						},
						weibo: {
							showOnModal: false
						},
						wechat: {
							showOnModal: false
						}
					},
					showOnModal: true
				}
			}
		})

		const web3AuthProvider = await web3auth.connect()
		const provider = new ethers.providers.Web3Provider(web3AuthProvider)

		const signer = provider.getSigner()
		const address = await signer.getAddress()
		const chainId = await signer.getChainId()

		dispatch(login({ web3auth, address, provider, signer, chainId }))
		dispatch(makeContracts(signer))
		dispatch(getProposalsDetails())
		setLoading(false)
	}
	const desconnect = async () => {
		setLoading(true)
		await user.web3auth.logout()
		dispatch(logout())
		dispatch(destroyProposals())
		dispatch(destroyContracts())
		setLoading(false)
		navigate('/')
	}

	return (
		<>
			{user.address === 'Login' ? (
				<button className='button-wallet' onClick={connect}>
					{loading
						? 'loading...'
						: user.address !== 'Login'
						? '...' + String(user.address).slice(36)
						: 'Login'}
				</button>
			) : (
				<button className='button-wallet' onClick={desconnect}>
					{loading ? 'loading...' : 'Logout'}
				</button>
			)}
		</>
	)
}
