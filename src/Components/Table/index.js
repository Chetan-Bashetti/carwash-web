/* eslint-disable array-callback-return */
import React from 'react';
import '../../Assets/CSS/Table/Table.css';

const Table = ({ columns, rows, userActions, module }) => {
	const handleStringFormat = (columnName) => {
		let b = columnName.split('');
		let c = b
			.map((each, id) => {
				if (each === each.toUpperCase()) return id;
			})
			.filter((eac) => eac !== undefined);

		let d = columnName.split(columnName.charAt(c[0]));
		let capCharacter = columnName.charAt(c[0]);
		let lastString = capCharacter + d[1];
		let finalResult = d[0] + ' ' + lastString;
		return finalResult.toLowerCase();
	};

	const handleDateString = (date) => {
		let actualDate = new Date(date);
		return actualDate.toLocaleString();
	};
	return (
		<table>
			<thead className='table-head'>
				<tr>
					{columns.map((eachColumn, id) => (
						<th className='table-head-columns' key={id}>
							{handleStringFormat(eachColumn)}
						</th>
					))}
				</tr>
			</thead>

			<tbody>
				{rows.map((eachRow, id) => (
					<tr key={id}>
						{columns.map((eachColumn) => (
							<td key={eachColumn + id}>
								{eachColumn === 'createdAt' || eachColumn === 'updatedAt' ? (
									handleDateString(eachRow[eachColumn])
								) : eachColumn === 'edit' ? (
									<div
										style={{
											flex: 1,
											alignItems: 'center',
											justifyContent: 'center',
											display: 'flex'
										}}
									>
										<i
											className='material-icons'
											style={{
												fontSize: '15px',
												cursor: 'pointer',
												color: 'lightseagreen'
											}}
											onClick={() =>
												module === 'users'
													? userActions(
															{
																id: eachRow._id,
																userName: eachRow.userName
															},
															'edit'
													  )
													: userActions(
															{
																id: eachRow._id,
																ownerName: eachRow.ownerName,
																selectedServices: eachRow.selectedServices,
																phone: eachRow.phone,
																carNumber: eachRow.carNumber,
																userId: eachRow.user_id,
																serviceStatus: eachRow.serviceStatus
															},
															'edit'
													  )
											}
										>
											edit
										</i>
									</div>
								) : eachColumn === 'delete' ? (
									<div
										style={{
											flex: 1,
											alignItems: 'center',
											justifyContent: 'center',
											display: 'flex'
										}}
									>
										<i
											className='material-icons'
											style={{
												fontSize: '15px',
												cursor: 'pointer',
												color: 'coral',
												textAlign: 'center'
											}}
											onClick={() =>
												module === 'users'
													? userActions(
															{
																id: eachRow._id,
																userName: eachRow.userName
															},
															'delete'
													  )
													: userActions(
															{
																id: eachRow._id,
																ownerName: eachRow.ownerName
															},
															'delete'
													  )
											}
										>
											delete
										</i>
									</div>
								) : eachColumn === 'isAdmin' ? (
									eachRow[eachColumn] === true ? (
										<div style={{ color: 'lightseagreen' }}>YES</div>
									) : (
										<div style={{ color: 'coral' }}>NO</div>
									)
								) : eachColumn === 'selectedServices' ? (
									<div>
										{eachRow[eachColumn].map((eachService) => (
											<div
												key={eachService._id}
												style={{
													border: '1px solid #42516e',
													padding: '0.3em 0.5em 0.3em 0.5em',
													borderRadius: '50px',
													fontSize: '12px',
													margin: '0.2em',
													display: 'flex',
													whiteSpace: 'nowrap'
												}}
											>
												{eachService.serviceName}
											</div>
										))}
									</div>
								) : eachColumn === 'serviceStatus' ? (
									<div
										className={
											eachRow[eachColumn] === 'pending'
												? 'status-data status-pending'
												: eachRow[eachColumn] === 'completed'
												? 'status-data status-completed'
												: eachRow[eachColumn] === 'cancelled'
												? 'status-data status-cancelled'
												: ''
										}
									>
										{eachRow[eachColumn]}
									</div>
								) : (
									eachRow[eachColumn]
								)}
							</td>
						))}
					</tr>
				))}
			</tbody>
		</table>
	);
};

export default Table;
