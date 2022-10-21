import React from 'react';
import ServicesKpis from './partials/servicesKpi';
import UsersKpis from './partials/userKpi';

const Dashboard = () => {
	return (
		<div
			className='Dashboard-Main-Container'
			style={{
				display: 'flex',
				flex: 1,
				alignItems: 'center',
				justifyContent: 'center'
			}}
		>
			<UsersKpis />
			<ServicesKpis />
		</div>
	);
};

export default Dashboard;
