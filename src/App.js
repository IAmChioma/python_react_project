import React, { useState } from "react";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AccountService from "./components/AccountService";
import styles from './App.css';

const StyledTableCell = withStyles((theme) => ({
	head: {
		backgroundColor: theme.palette.common.black,
		color: theme.palette.common.white,
	},
	body: {
		fontSize: 14,
	},
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
	root: {
		'&:nth-of-type(odd)': {
			backgroundColor: theme.palette.action.hover,
		},
		'& > *': {
			margin: theme.spacing(1),
			width: '25ch',
		},
	},
}))(TableRow);
const BootstrapInput = withStyles((theme) => ({
	root: {
		'label + &': {
			marginTop: theme.spacing(3),
		},
	},
	input: {
		borderRadius: 4,
		position: 'relative',
		backgroundColor: theme.palette.background.paper,
		border: '1px solid #ced4da',
		fontSize: 16,
		padding: '10px 26px 10px 12px',
		transition: theme.transitions.create(['border-color', 'box-shadow']),
		// Use the system font instead of the default Roboto font.
		fontFamily: [
			'-apple-system',
			'BlinkMacSystemFont',
			'"Segoe UI"',
			'Roboto',
			'"Helvetica Neue"',
			'Arial',
			'sans-serif',
			'"Apple Color Emoji"',
			'"Segoe UI Emoji"',
			'"Segoe UI Symbol"',
		].join(','),
		'&:focus': {
			borderRadius: 4,
			borderColor: '#80bdff',
			boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
		},
	},
}))(InputBase);

const useStyles = makeStyles((theme) => ({
	table: {
		minWidth: 700,
		// width: '90%',
		// padding: '2%',
		// margin: 'auto'
	},
	input: {
		width: 200,
		display: 'block',
		marginTop: '1%',
		marginBottom: '1%'
	},
	margin: {
		margin: theme.spacing(1),
	},
}))

function App() {
	const classes = useStyles();
	const [items, setItems] = React.useState([]);
	const [elem, setElem] = useState([]);
	let newItems = [];
	const service = new AccountService();
	React.useEffect(() => {

		service.getList()
			.then((response) => {
				console.log(response);
				setItems(response);



			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	const refreshItem = () => {
		service.getList()
			.then((response) => {
				setItems(response);

			})
			.catch((error) => {
				console.log(error);
			});
	}


	const createNewItem = () => {
		if (newItems.length === 0) {
			alert(' Kindly input valid list');
			return
		}
		service.addList(newItems).then(res => {
			console.log(res);
			alert(res.prefix + ' has common prefix ' + res.content);
			refreshItem();
			return res
		})
	}
	const handleChange = (event) => {
		newItems = event.target.value;


	};


	return (
		<div className="main-content">



			<form className={styles.root} noValidate autoComplete="off">
				<TextField required label="Required" id="outlined-list" label="Enter List Items" variant="outlined" defaultValue="" onChange={handleChange} />
				<Button variant="contained" color="primary" onClick={createNewItem}>
					Create
				</Button>
			</form>

			<TableContainer component={Paper}>
				<Table className={classes.table} aria-label="customized table">
					<TableHead>
						<TableRow>

							<StyledTableCell>List Items</StyledTableCell>
							<StyledTableCell>Result</StyledTableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{items.map(item => {
							return (


								<StyledTableRow key={item.id}>

									<StyledTableCell component="th" scope="row">
										{item.prefix}
									</StyledTableCell>
									<StyledTableCell>{item.content}</StyledTableCell>

								</StyledTableRow>
							)
						})
						}
					</TableBody>
				</Table>
			</TableContainer>






		</div>
	);
}

export default App;
