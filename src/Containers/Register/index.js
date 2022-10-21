import React from 'react';
import { TextField } from '@material-ui/core';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import StyledButton from '../../Components/Button';
import { apiClient } from '../../utils/apiClient';

const Register = ({ history, isAddUser = false, handleClose = () => {} }) => {
	const [userName, setUserName] = React.useState('');
	const [email, setEmail] = React.useState('');
	const [password, setPassword] = React.useState('');
	const [isAdmin, setIsAdmin] = React.useState('user');

	const handleChange = (event) => {
		setIsAdmin(event.target.value);
	};

	const handleRegister = async () => {
		let response = await apiClient(`users/register`, '', 'POST', {
			userName: userName,
			email: email,
			password: password,
			isAdmin: isAdmin === 'admin' ? true : false
		});
		if (response.status === 200) {
			if (isAddUser) {
				handleClose();
			} else {
				history.push('/login');
			}
		} else {
			let json = await response.json();
			alert(json.message);
		}
	};

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
				Register new user
			</div>
			<TextField
				variant='outlined'
				placeholder='Enter your name'
				style={{ width: 450, margin: '0.5em' }}
				value={userName}
				onChange={(e) => setUserName(e.target.value)}
			/>
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
			<FormControl component='fieldset'>
				<RadioGroup
					aria-label='isAdmin'
					name='isAdmin'
					value={isAdmin}
					onChange={handleChange}
					style={{
						display: 'flex',
						flexDirection: 'row',
						alignItems: 'center',
						justifyContent: 'center'
					}}
				>
					<FormControlLabel
						value='admin'
						style={{ color: 'rgb(66, 81, 110)' }}
						control={<Radio style={{ color: 'rgb(66, 81, 110)' }} />}
						label='Admin'
					/>
					<FormControlLabel
						value='user'
						style={{ color: 'rgb(66, 81, 110)' }}
						control={<Radio style={{ color: 'rgb(66, 81, 110)' }} />}
						label='User'
					/>
				</RadioGroup>
			</FormControl>
			<StyledButton
				title='Register'
				onClick={() => handleRegister()}
				style={{ margin: '0.5em', padding: '1em' }}
			/>
			{!isAddUser ? (
				<StyledButton
					title='login'
					onClick={() => history.push('/login')}
					style={{ margin: '0.5em', padding: '1em' }}
				/>
			) : (
				''
			)}
		</div>
	);
};

export default Register;
