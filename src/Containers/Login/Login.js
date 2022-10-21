/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { TextField } from '@material-ui/core';
import StyledButton from '../../Components/Button';
import { apiClient } from '../../utils/apiClient';

const Login = ({ history }) => {
	const [email, setEmail] = React.useState('');
	const [password, setPassword] = React.useState('');

	const handleLogin = async () => {
		let response = await apiClient(`users/login`, '', 'POST', {
			email: email,
			password: password
		});
		if (response.status === 200) {
			let user = await response.json();
			localStorage.setItem('user', JSON.stringify(user));
			localStorage.setItem('token', user.token);
			history.push('/');
		} else {
			let json = await response.json();
			alert(json.message);
		}
	};

	useEffect(() => {
		let token = localStorage.getItem('token');
		if (token) history.push('/');
	}, []);
	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				margin: 'auto',
				padding: '2em',
				boxShadow: 'lightgrey 0px 2px 15px',
				paddingBottom: '5em'
			}}
		>
			<div
				style={{
					margin: ' 1em',
					fontSize: '2em',
					fontWeight: 700,
					color: 'rgb(66, 81, 110)',
					textAlign: 'center'
				}}
			>
				Login to portal
			</div>
			<TextField
				variant='outlined'
				placeholder='Enter your email'
				style={{ width: 450, margin: '0.5em' }}
				value={email}
				onChange={(e) => setEmail(e.target.value)}
			/>
			<TextField
				variant='outlined'
				placeholder='Enter your password'
				style={{ width: 450, margin: '0.5em' }}
				value={password}
				onChange={(e) => setPassword(e.target.value)}
			/>
			<StyledButton
				title='login'
				onClick={() => handleLogin()}
				style={{ margin: '0.5em', padding: '0.5em' }}
			/>
			<StyledButton
				title='Register'
				onClick={() => history.push('/register')}
				style={{ margin: '0.5em', padding: '0.5em' }}
			/>
		</div>
	);
};

export default Login;
