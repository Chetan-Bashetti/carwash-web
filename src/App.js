import React from 'react';
import './App.css';
import Home from './Containers/Home/Home';
import Login from './Containers/Login/Login';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Register from './Containers/Register';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		return (
			<div className='App'>
				<BrowserRouter>
					<Switch>
						<Route exact path='/' component={Home} {...this.props} />
						<Route path='/login' component={Login} {...this.props} />
						<Route path='/register' component={Register} {...this.props} />
						<Route path='/users' component={Home} {...this.props} />
						<Route path='/services' component={Home} {...this.props} />
					</Switch>
				</BrowserRouter>
			</div>
		);
	}
}

export default App;
