export const apiClient = async (url, token, method, body) => {
	try {
		if (method === 'GET') {
			let response = await fetch(`https://gdcarwash.herokuapp.com/${url}`, {
				method: method,
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`
				}
			});
			if (response !== undefined) {
				return await response;
			}
		} else {
			let response = await fetch(`https://gdcarwash.herokuapp.com/${url}`, {
				method: method,
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`
				},
				body: JSON.stringify(body)
			});
			if (response !== undefined) {
				return await response;
			}
		}
	} catch (error) {
		console.log(error);
	}
};
