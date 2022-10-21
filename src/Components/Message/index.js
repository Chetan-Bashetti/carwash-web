import React, { useEffect } from 'react';

const Message = ({ varient, show, dismiss }) => {
	useEffect(() => {
		let timer = setTimeout(() => {
			dismiss();
		}, 5000);
		return () => {
			clearInterval(timer);
		};
	}, [show]);

	return (
		<div>
			{show && (
				<div
					style={{
						height: '100px',
						width: '100%',
						border:
							varient === 'success'
								? '1px solid lightgreen'
								: varient === 'error'
								? '1px solid red'
								: varient === 'info'
								? '1px solid grey'
								: ''
					}}
				>
					Message
				</div>
			)}
		</div>
	);
};
export default Message;
