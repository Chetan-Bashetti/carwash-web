import React from 'react';
import { Button } from '@material-ui/core';

const StyledButton = ({ title, onClick, style }) => {
	return (
		<Button
			onClick={onClick}
			variant='contained'
			style={{
				background: 'rgb(66, 81, 110)',
				color: 'white',
				fontFamily: "'Lato', sans-serif",
				textTransform: 'capitalize',
				fontSize: '18px',
				...style
			}}
		>
			{title}
		</Button>
	);
};
export default StyledButton;
