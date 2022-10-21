import React from 'react';
import '../../../Assets/CSS/HeaderBarStyles/HeaderBar.css';
import StyledButton from '../../../Components/Button';

class HeaderBar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			user: {}
		};
	}
	handleLogout = () => {
		localStorage.removeItem('token');
		window.location.reload();
		this.props.history.push('/login');
	};

	componentDidMount() {
		let user = JSON.parse(localStorage.getItem('user'));
		this.setState({ user: user });
	}
	render() {
		return (
			<div className='HeaderBar-Main-Container'>
				<div
					style={{
						fontSize: '25px',
						fontWeight: 700
					}}
				>
					{this.props.location.pathname.slice(1)
						? this.props.location.pathname.slice(1)
						: 'Dashboard'}
				</div>
				<div style={{ display: 'flex' }}>
					<div style={{ textTransform: 'capitalize', marginRight: '.2em' }}>
						Welcome,{' '}
					</div>
					<div
						style={{
							whiteSpace: 'nowrap',
							overflow: 'hidden',
							textOverflow: 'ellipsis',
							textAlign: 'start',
							fontWeight: 700,
							letterSpacing: 0.5
						}}
					>
						{this.state.user.userName}
					</div>
				</div>
				<div>
					<StyledButton onClick={() => this.handleLogout()} title={'Logout'} />
				</div>
			</div>
		);
	}
}

export default HeaderBar;
