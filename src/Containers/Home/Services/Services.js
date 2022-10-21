/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { CircularProgress } from '@material-ui/core';
import { apiClient } from '../../../utils/apiClient';
import Table from '../../../Components/Table';
import DialogBox from '../../../Components/Dialog/Dialog';
import '../../../Assets/CSS/Users/Users.css';
import StyledButton from '../../../Components/Button';
import AddNewService from './paritals/AddNewService';

const Services = () => {
	const [services, setServices] = useState([]);
	const [loading, setLoading] = useState(true);
	const [isOpen, setIsOpen] = useState(true);
	const [ownerName, setOwnerName] = useState('');
	const [carNumber, setCarNumber] = useState('');
	const [serviceStatus, setServiceStatus] = useState('pending');
	const [phone, setPhone] = useState('');
	const [selectedServices, setSelectedServices] = useState([
		{
			serviceName: 'Washing',
			isSelected: true
		},
		{
			serviceName: 'Gear plate change',
			isSelected: true
		},
		{
			serviceName: 'Pressure check',
			isSelected: true
		},
		{
			serviceName: 'Tyre change',
			isSelected: true
		}
	]);
	const [userId, setUserId] = useState('');
	const [operation, setOperation] = useState('');
	const [serviceId, setServiceId] = useState('');

	useEffect(() => {
		getData();
	}, []);

	const getData = () => {
		try {
			const value = localStorage.getItem('user');
			const data = JSON.parse(value);
			if (data !== null) {
				if (data.id && data.token) {
					setUserId(data.id);
					setLoading(true);
					getAllServices(data.id, data.token);
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

	const getAllServices = async (id, token) => {
		let response = await apiClient(`services`, token, 'GET');
		if (response !== undefined) {
			if (response && response.status === 200) {
				let json = await response.json();
				setLoading(false);
				setServices({
					...json,
					data: json.data
				});
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
			setLoading(false);
			alert('Request failed');
		}
	};

	const handleUpdateService = async () => {
		let token = localStorage.getItem('token');
		let response = await apiClient(
			`services/update/${serviceId}`,
			token,
			'PUT',
			{
				user_id: userId,
				ownerName,
				carNumber,
				serviceStatus,
				selectedServices: selectedServices.filter((each) => each.isSelected),
				phone
			}
		);
		if (response.status === 200) {
			let json = await response.json();
			alert(json.message);
			getData();
			handleReset();
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

	const handleAddNewService = async () => {
		let token = localStorage.getItem('token');
		let response = await apiClient(`services/create`, token, 'POST', {
			user_id: userId,
			ownerName,
			carNumber,
			serviceStatus,
			selectedServices: selectedServices.filter((each) => each.isSelected),
			phone
		});
		if (response.status === 200) {
			let json = await response.json();
			alert(json.message);
			getData();
			handleReset();
		} else if (response.status === 401) {
			localStorage.removeItem('token');
			localStorage.removeItem('user');
			window.location.reload();
			this.props.history.push('/login');
		} else {
			let json = await response.json();
			alert(json.message);
		}
	};

	const handleOpen = (data, op) => {
		if (op === 'delete') {
			setServiceId(data.id);
			setOwnerName(data.ownerName);
			setIsOpen(true);
			setOperation(op);
		} else {
			setServiceId(data.id);
			setOwnerName(data.ownerName);
			setSelectedServices(data.selectedServices);
			setPhone(data.phone);
			setServiceStatus(data.serviceStatus);
			setCarNumber(data.carNumber);
			setUserId(data.userId);
			setIsOpen(true);
			setOperation(op);
		}
	};

	const handleReset = () => {
		setServiceId('');
		setOwnerName('');
		setSelectedServices(
			{
				serviceName: 'Washing',
				isSelected: true
			},
			{
				serviceName: 'Gear plate change',
				isSelected: true
			},
			{
				serviceName: 'Pressure check',
				isSelected: true
			},
			{
				serviceName: 'Tyre change',
				isSelected: true
			}
		);
		setPhone('');
		setServiceStatus('pending');
		setCarNumber('');
		setUserId('');

		setIsOpen(false);
	};

	const handleDeleteService = async () => {
		let token = localStorage.getItem('token');
		const value = localStorage.getItem('user');
		const data = JSON.parse(value);
		let response = await apiClient(
			`services/delete/${serviceId}`,
			token,
			'DELETE',
			{
				user_id: data.id
			}
		);
		if (response.status === 200) {
			let json = await response.json();
			alert(json.message);
			getData();
			setIsOpen(false);
		} else if (response.status === 401) {
			localStorage.removeItem('token');
			window.location.reload();
			this.props.history.push('/login');
		} else {
			setOperation('');
			setIsOpen(false);
			let json = await response.json();
			alert(json.message);
		}
	};

	const deleteSelectedServices = (id) => {
		let updatedList = [...selectedServices];
		updatedList.splice(id, 1);
		setSelectedServices(updatedList);
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
			) : services && services.data && services.data.length ? (
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
							title='Add service'
							onClick={() => {
								setIsOpen(true);
								setOperation('add');
							}}
						/>
					</div>
					<div style={{ overflow: 'scroll' }}>
						<Table
							columns={[
								...Object.keys(services.data[0]).filter(
									(each) =>
										each !== '_id' &&
										each !== '__v' &&
										each !== 'password' &&
										each !== 'user_id'
								),
								'edit',
								'delete'
							]}
							rows={services.data}
							userActions={handleOpen}
							module='services'
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
						title='Add service'
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
						Services not found
					</div>
				</div>
			)}
			{isOpen && operation === 'edit' && (
				<DialogBox
					open={isOpen}
					handleClose={() => {
						handleReset();
						setIsOpen(false);
					}}
					content={
						<div>
							<AddNewService
								id={userId}
								ownerName={ownerName}
								carNumber={carNumber}
								selectedServices={selectedServices}
								serviceStatus={serviceStatus}
								phone={phone}
								operation={operation}
								setCarNumber={setCarNumber}
								setOwnerName={setOwnerName}
								setSelectedServices={setSelectedServices}
								setPhone={setPhone}
								setServiceStatus={setServiceStatus}
								handleUpdateService={handleUpdateService}
								handleAddNewService={handleAddNewService}
								deleteSelectedServices={deleteSelectedServices}
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
						>{`Are you sure you want to delete ${ownerName}'s service?`}</div>
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
								onClick={() => handleDeleteService()}
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
					handleClose={(e, reason) => {
						handleReset();
						setIsOpen(false);
					}}
					content={
						<div>
							<AddNewService
								id={userId}
								ownerName={ownerName}
								carNumber={carNumber}
								selectedServices={selectedServices}
								serviceStatus={serviceStatus}
								phone={phone}
								operation={operation}
								setCarNumber={setCarNumber}
								setOwnerName={setOwnerName}
								setSelectedServices={setSelectedServices}
								setPhone={setPhone}
								setServiceStatus={setServiceStatus}
								handleUpdateService={handleUpdateService}
								handleAddNewService={handleAddNewService}
								deleteSelectedServices={deleteSelectedServices}
							/>
						</div>
					}
				/>
			)}
		</div>
	);
};

export default Services;
