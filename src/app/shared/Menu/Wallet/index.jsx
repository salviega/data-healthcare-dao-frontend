import './Wallet.scss'

import React from 'react'
import { ethers } from 'ethers'
import { useDispatch, useSelector } from 'react-redux'
import { login, logout } from '../../../../store/actions/authActions'
import {
	destroyContracts,
	makeContracts
} from '../../../../store/actions/contractActions'
import { useNavigate } from 'react-router-dom'
import {
	destroyProposals,
	getProposalsDetails
} from '../../../../store/actions/proposalActions'
import { NETWORK } from '../../../../config/helper.config'

export function Wallet() {
	const [loading, setLoading] = React.useState(false)
	const user = useSelector(state => state.auth)
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const connectWallet = async () => {
		if (!window.ethereum?.isMetaMask) {
			window.alert(
				"Metamask wasn't detected, please install metamask extension"
			)
			return
		}

		if (user.address === 'Connect wallet') {
			setLoading(true)

			const provider = new ethers.providers.Web3Provider(window.ethereum)
			await provider.send('eth_requestAccounts', [])
			const accounts = await provider.send('eth_requestAccounts', [])
			const address = accounts[0]

			const signer = provider.getSigner()
			const chainId = await signer.getChainId()
			if (chainId !== NETWORK.chainId) {
				window.alert(`Change your network to ${NETWORK.name} testnet!`)
				dispatch(logout())
				setLoading(false)
				navigate('/')
				return
			}
			dispatch(login({ address, provider, signer, chainId }))
			dispatch(makeContracts(signer))
			dispatch(getProposalsDetails())
			setLoading(false)
		} else {
			dispatch(destroyProposals())
			dispatch(destroyContracts())
			dispatch(logout())
			setLoading(false)
			navigate('/')
		}
	}

	return (
		<button className='button-wallet' onClick={connectWallet}>
			{loading
				? 'loading...'
				: user.address !== 'Connect wallet'
				? '...' + String(user.address).slice(36)
				: 'Connect wallet'}
		</button>
	)
}
