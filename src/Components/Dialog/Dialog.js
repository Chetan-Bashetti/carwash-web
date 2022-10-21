import React from 'react';
import Dialog from '@material-ui/core/Dialog';

const DialogBox = ({ open, handleClose, content, title = '' }) => {
	return (
		<Dialog open={open} onClose={handleClose}>
			{title && (
				<div
					style={{
						marginTop: ' 1em',
						marginBottom: '1em',
						fontSize: '1.5em',
						fontWeight: 700,
						color: 'rgb(66, 81, 110)',
						textAlign: 'center'
					}}
				>
					{title}
				</div>
			)}
			{content}
		</Dialog>
	);
};
export default DialogBox;
