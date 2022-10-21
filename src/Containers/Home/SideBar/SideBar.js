import React from 'react';
import '../../../Assets/CSS/SideBarStyles/SideBar.css';

class SideBar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			sideBarToggle: true,
			routes: [
				{
					route: '/',
					routeName: 'Dashboard',
					icon: 'dashboard'
				},
				{
					route: '/users',
					routeName: 'Users',
					icon: 'people'
				},
				{
					route: '/services',
					routeName: 'Services',
					icon: 'settings'
				}
			]
		};
	}
	showView = () => {
		this.setState({ sideBarToggle: true });
	};
	hideView = () => {
		this.setState({ sideBarToggle: false });
	};

	handleGoto = (route) => {
		this.props.history.push(route);
	};

	render() {
		return (
			<div
				className='SideBar-Main-Container'
				style={{
					willChange: 'width',
					width: this.state.sideBarToggle === true ? 180 : 0,
					transition: 'width 300ms cubic-bezier(0.2, 0, 0, 1) 0s',
					display: this.state.sideBarToggle === true ? 'flex' : ''
				}}
			>
				<div className='SideBar-Toggle-Container'>
					{this.state.sideBarToggle === true ? (
						<span id='Toggle-Hide' onClick={this.hideView}>
							{' '}
							<i
								className='material-icons'
								style={{
									fontSize: '15px',
									right: '-4px',
									position: 'relative'
								}}
							>
								arrow_back_ios
							</i>
						</span>
					) : (
						<span id='Toggle-Show' onClick={this.showView}>
							{' '}
							<i className='material-icons' style={{ fontSize: '15px' }}>
								apps
							</i>
						</span>
					)}
				</div>
				<div
					className='SideBar-Routes-Container'
					style={{
						display: this.state.sideBarToggle === true ? 'flex' : 'none'
					}}
				>
					{this.state.routes.map((eachRoute) => (
						<div
							key={eachRoute.route}
							className='Sidebar-Routes'
							onClick={() => this.handleGoto(eachRoute.route)}
							style={{
								color:
									this.props.location.pathname === eachRoute.route
										? 'white'
										: '#42516e',
								backgroundColor:
									this.props.location.pathname === eachRoute.route
										? '#42516e'
										: 'white'
							}}
						>
							<i className='material-icons' id='SideBaar-Icon'>
								{eachRoute.icon}
							</i>
							<span className='Routes-Title'>{eachRoute.routeName}</span>
						</div>
					))}
				</div>
			</div>
		);
	}
}

export default SideBar;
