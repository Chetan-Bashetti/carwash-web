import React from 'react';
import '../../Assets/CSS/HomeStyles/HomeStyles.css';
import SideBar from './SideBar/SideBar';
import Headerbar from './HeaderBar/HeaderBar';
import Users from './Users/Users';
import Dashboard from './Dashboard/Dashboard';
import Holdings from './Services/Services';
import { Route, Switch } from 'react-router-dom';
import { withRouter } from 'react-router';

class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	componentDidMount() {
		let token = localStorage.getItem('token');
		if (!token) this.props.history.push('/login');
	}
	render() {
		return (
			<div className='Home-Main-Container'>
				<SideBar {...this.props} />
				<div className='Home-Components-Container'>
					<Headerbar {...this.props} />
					<div className='Home-Routes-Container'>
						<Switch>
							<Route
								exact
								path='/'
								render={(props) => <Dashboard {...props} />}
							></Route>
							<Route
								path='/users'
								render={(props) => <Users {...props} />}
							></Route>
							<Route
								path='/services'
								render={(props) => <Holdings {...props} />}
							></Route>
						</Switch>
					</div>
				</div>
			</div>
		);
	}
}

export default withRouter(Home);
