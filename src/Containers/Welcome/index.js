import React from 'react';

const Welcome = ({ history }) => {
	return (
		<div
			className='Holdings-Main-Container'
			style={{
				display: 'flex',
				flex: 1,
				justifyContent: 'center',
				alignItems: 'center',
				flexDirection: 'column'
			}}
		>
			Welcome
			<button
				onClick={() => {
					history.push('/home');
				}}
			>
				Go to Home
			</button>
		</div>
	);
};

export default Welcome;
