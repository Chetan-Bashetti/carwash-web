import React, { useEffect, useState } from 'react';
import { CircularProgress } from '@material-ui/core';
import { apiClient } from '../../../../utils/apiClient';
import '../../../../Assets/CSS/Kpis/Kpis.css';

const ServicesKpis = () => {
	const [services, setServices] = useState([]);
	const [loading, setLoading] = useState(true);

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

	return (
		<div style={{ display: 'flex', flex: 1 }}>
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
				<div className='kpis-parent'>
					<div className='kpi-header'>
						<i
							className='material-icons'
							style={{ fontSize: '25px', cursor: 'pointer' }}
						>
							settings
						</i>
						<div className='kpi-header-text'>Services</div>
					</div>
					<div className='kpi-body'>
						<div className='each-kpi'>
							<div style={{ display: 'flex', alignItems: 'center' }}>
								<i
									className='material-icons'
									style={{ fontSize: '2em', color: 'rgb(66, 81, 110)' }}
								>
									settings
								</i>
								<div className='info-text'>Total services </div>
							</div>
							<div className='all' style={{ color: 'black' }}>
								{services.data.length}
							</div>
						</div>
						<div className='each-kpi'>
							<div style={{ display: 'flex', alignItems: 'center' }}>
								<i
									className='material-icons'
									style={{ fontSize: '2em', color: 'lightgreen' }}
								>
									assignment_turned_in
								</i>
								<div className='info-text'>Completed services </div>
							</div>
							<div className='attendes'>
								{
									services.data.filter(
										(eachUser) => eachUser.serviceStatus === 'completed'
									).length
								}
							</div>
						</div>
						<div className='each-kpi'>
							<div style={{ display: 'flex', alignItems: 'center' }}>
								<i
									className='material-icons'
									style={{ fontSize: '2em', color: '#f7866f' }}
								>
									access_time
								</i>
								<div className='info-text'> Pending servcies </div>
							</div>

							<div className='pending'>
								{
									services.data.filter(
										(eachUser) => eachUser.serviceStatus === 'pending'
									).length
								}
							</div>
						</div>
						<div className='each-kpi'>
							<div style={{ display: 'flex', alignItems: 'center' }}>
								<i
									className='material-icons'
									style={{ fontSize: '2em', color: 'crimson' }}
								>
									error
								</i>
								<div className='info-text'> Cancelled servcies </div>
							</div>

							<div className='admins'>
								{
									services.data.filter(
										(eachUser) => eachUser.serviceStatus === 'cancelled'
									).length
								}
							</div>
						</div>
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
					<div>Services not found</div>
				</div>
			)}
		</div>
	);
};

export default ServicesKpis;
