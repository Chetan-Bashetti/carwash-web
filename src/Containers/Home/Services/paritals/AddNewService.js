import React, { useState } from 'react';
import { TextField, Select, FormControl, MenuItem } from '@material-ui/core';

import StyledButton from '../../../../Components/Button';

const AddNewService = ({
	id,
	ownerName = '',
	carNumber = '',
	selectedServices = [],
	serviceStatus = '',
	phone = '',
	operation = 'add',
	setCarNumber = '',
	setOwnerName = '',
	setSelectedServices = [],
	setPhone = '',
	setServiceStatus = 'pending',
	handleUpdateService,
	handleAddNewService,
	deleteSelectedServices
}) => {
	const [serviceName, setServiceName] = useState('');
	const [error, setError] = useState('');

	const handleAddNewSeervice = () => {
		if (serviceName.length > 2) {
			let newServiceObj = {
				serviceName: serviceName,
				isSelected: true
			};
			setSelectedServices(
				selectedServices.length
					? [...selectedServices, newServiceObj]
					: [newServiceObj]
			);
			setServiceName('');
		} else {
			setError('Enter valid service name');
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
				{operation === 'add' ? 'Add new service' : 'Update service'}
			</div>
			<TextField
				variant='outlined'
				placeholder='Enter car number'
				style={{ width: 450, margin: '0.5em' }}
				value={carNumber}
				onChange={(e) => setCarNumber(e.target.value)}
				label='Car number'
			/>
			<TextField
				variant='outlined'
				placeholder='Enter owner name'
				style={{ width: 450, margin: '0.5em' }}
				value={ownerName}
				onChange={(e) => setOwnerName(e.target.value)}
				label='Owner name'
			/>
			<TextField
				variant='outlined'
				placeholder='Enter owner phone number'
				style={{ width: 450, margin: '0.5em' }}
				value={phone}
				onChange={(e) => setPhone(e.target.value)}
				label='Owner phone number'
			/>
			<FormControl variant='outlined'>
				<Select
					id='demo-simple-select-outlined'
					value={serviceStatus}
					onChange={(e) => setServiceStatus(e.target.value)}
					label='Status'
					style={{ width: 450, margin: '0.5em' }}
				>
					<MenuItem value={'pending'}>Pending</MenuItem>
					<MenuItem value={'completed'}>Completed</MenuItem>
					<MenuItem value={'cancelled'}>Cancalled</MenuItem>
				</Select>
			</FormControl>
			<div style={{ display: 'flex', alignItems: 'center' }}>
				<TextField
					variant='outlined'
					placeholder='Add new service'
					style={{ width: 400, margin: '0.5em' }}
					value={serviceName}
					onChange={(e) => {
						setServiceName(e.target.value);
						setError('');
					}}
					label='Add new service'
				/>

				<div
					style={{
						height: '40px',
						width: '40px',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						color: 'white',
						background: '#42516e',
						borderRadius: '5px',
						cursor: 'pointer'
					}}
					onClick={() => handleAddNewSeervice()}
				>
					<i className='material-icons'>add</i>
				</div>
			</div>
			{error && (
				<div style={{ color: 'crimson', fontSize: 13, padding: '0.2em 1em' }}>
					{error}
				</div>
			)}
			<div style={{ display: 'flex', flexWrap: 'wrap', maxWidth: 450 }}>
				{selectedServices &&
					selectedServices.length &&
					selectedServices
						.filter((each) => each.isSelected)
						.map((each, id) => (
							<div
								key={id}
								style={{
									border: '1px solid #42516e',
									padding: '0.3em 0.5em 0.3em 0.5em',
									borderRadius: '50px',
									fontSize: '15px',
									margin: '0.2em',
									display: 'flex'
								}}
							>
								<div style={{ marginRight: '0.3em' }}>{each.serviceName}</div>
								<i
									className='material-icons'
									style={{ fontSize: '20px', cursor: 'pointer' }}
									onClick={() => deleteSelectedServices(id)}
								>
									cancel
								</i>
							</div>
						))}
			</div>
			<StyledButton
				title={operation === 'add' ? 'Add new service' : 'Update service'}
				onClick={() =>
					operation === 'add' ? handleAddNewService() : handleUpdateService()
				}
				style={{ margin: '0.5em', padding: '1em' }}
			/>
		</div>
	);
};

export default AddNewService;
