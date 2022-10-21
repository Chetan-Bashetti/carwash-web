import React, { useEffect, useState } from 'react';
import { CircularProgress, TextField } from '@material-ui/core';
import { apiClient } from '../../../utils/apiClient';
import Table from '../../../Components/Table';
import DialogBox from '../../../Components/Dialog/Dialog';
import '../../../Assets/CSS/Users/Users.css';
import StyledButton from '../../../Components/Button';
import Register from '../../Register';

const Users = () => {
	const [users, setUsers] = useState([]);
	const [loading, setLoading] = useState(true);
	const [isOpen, setIsOpen] = useState(false);
	const [userName, setUserName] = useState('');
	const [userId, setUserId] = useState('');
	const [operation, setOperation] = useState('');
	useEffect(() => {
		getData();
	}, []);

	const getData = () => {
		try {
			const value = localStorage.getItem('user');
			const data = JSON.parse(value);

			if (data !== null) {
				if (data.id && data.token) {
					setLoading(true);
					getAllUsers(data.id, data.token);
				} else {
					localStorage.removeItem('token');
					localStorage.removeItem('user');
					window.location.reload();
					this.props.history.push('/login');
				}
			}
		} catch (e) {
			console.log(e);
		}
	};

	const getAllUsers = async (id, token) => {
		let response = await apiClient(`users`, token, 'GET');
		if (response !== undefined) {
			if (response && response.status === 200) {
				let json = await response.json();
				setUsers({ ...json, data: json.data });
				setLoading(false);
				setIsOpen(false);
			} else if (response.status === 401) {
				alert(response.status);
				setLoading(false);
				localStorage.removeItem('token');
				localStorage.removeItem('user');
				window.location.reload();
				this.props.history.push('/login');
			} else {
				let json = await response.json();
				alert(json.message);
				setLoading(false);
			}
		} else {
			alert('Request failed');
			setLoading(false);
		}
	};

	const handleUpdateUser = async () => {
		let token = localStorage.getItem('token');
		let response = await apiClient(`users/update/${userId}`, token, 'PUT', {
			userName: userName
		});
		if (response.status === 200) {
			let json = await response.json();
			alert(json.message);
			const value = localStorage.getItem('user');
			const data = JSON.parse(value);
			getData();
			setIsOpen(false);
			if (data.id === json.data._id) {
				localStorage.setItem('user', JSON.stringify(json.data));
			}
		} else if (response.status === 401) {
			localStorage.removeItem('token');
			localStorage.removeItem('user');
			window.location.reload();
			this.props.history.push('/login');
		} else {
			setOperation('');
			setIsOpen(false);
			let json = await response.json();
			alert(json.message);
		}
	};

	const handleOpen = (data, op) => {
		setUserName(data.userName);
		setUserId(data.id);
		setIsOpen(true);
		setOperation(op);
	};

	const handleDeleteUser = async () => {
		let token = localStorage.getItem('token');
		const value = localStorage.getItem('user');
		const data = JSON.parse(value);
		let response = await apiClient(`users/delete/${userId}`, token, 'DELETE', {
			id: data.id
		});
		if (response.status === 200) {
			let json = await response.json();
			alert(json.message);
			getData();
			setIsOpen(false);
		} else if (response.status === 401) {
			localStorage.removeItem('token');
			localStorage.removeItem('user');
			window.location.reload();
			this.props.history.push('/login');
		} else {
			setOperation('');
			setIsOpen(false);
			let json = await response.json();
			alert(json.message);
		}
	};

	return (
		<div className='Users-Main-Container'>
			{loading ? (
				<div
					style={{
						display: 'flex',
						flex: 1,
						justifyContent: 'center',
						alignItems: 'center'
					}}
				>
					<CircularProgress className='loader' />
				</div>
			) : users && users.data && users.data.length ? (
				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
						flex: 1,
						overflow: 'hidden'
					}}
				>
					<div
						style={{
							display: 'flex',
							justifyContent: 'flex-end',
							marginBottom: '1em'
						}}
					>
						<StyledButton
							title='Add user'
							onClick={() => {
								setIsOpen(true);
								setOperation('add');
							}}
						/>
					</div>
					<div style={{ overflow: 'scroll' }}>
						<Table
							columns={[
								...Object.keys(users.data[0]).filter(
									(each) =>
										each !== '_id' && each !== '__v' && each !== 'password'
								),
								'edit',
								'delete'
							]}
							rows={users.data}
							userActions={handleOpen}
							module='users'
						/>
					</div>
				</div>
			) : (
				<div
					style={{
						display: 'flex',
						flex: 1,
						justifyContent: 'center',
						alignItems: 'center',
						flexDirection: 'column'
					}}
				>
					<StyledButton
						title='Add user'
						onClick={() => {
							setIsOpen(true);
							setOperation('add');
						}}
					/>
					<div
						style={{
							marginTop: '2em',
							margin: ' 1em',
							fontSize: '2em',
							fontWeight: 700,
							color: 'rgb(66, 81, 110)',
							textAlign: 'center'
						}}
					>
						Users not found
					</div>
				</div>
			)}
			{isOpen && operation === 'edit' && (
				<DialogBox
					open={isOpen}
					handleClose={() => setIsOpen(false)}
					title={`Update ${userName}'s information`}
					content={
						<div
							style={{
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								padding: '1em'
							}}
						>
							<TextField
								variant='outlined'
								placeholder='Enter your name'
								style={{ width: 450, margin: '0.5em' }}
								value={userName}
								onChange={(e) => setUserName(e.target.value)}
							/>
							<StyledButton
								title='Update'
								onClick={() => handleUpdateUser()}
								style={{ margin: '0.5em', padding: '0.6em' }}
							/>
						</div>
					}
				/>
			)}
			{isOpen && operation === 'delete' && (
				<DialogBox
					open={isOpen}
					handleClose={() => setIsOpen(false)}
					title={
						<div
							style={{ padding: '0.5em' }}
						>{`Are you sure you want to delete ${userName} ?`}</div>
					}
					content={
						<div
							style={{
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								padding: '1em'
							}}
						>
							<StyledButton
								title='Yes'
								onClick={() => handleDeleteUser()}
								style={{ margin: '0.5em', padding: '0.6em' }}
							/>
							<StyledButton
								title='No'
								onClick={() => setIsOpen(false)}
								style={{ margin: '0.5em', padding: '0.6em' }}
							/>
						</div>
					}
				/>
			)}
			{isOpen && operation === 'add' && (
				<DialogBox
					open={isOpen}
					handleClose={() => setIsOpen(false)}
					content={<Register isAddUser={true} handleClose={() => getData()} />}
				/>
			)}
		</div>
	);
};

export default Users;
