import React from 'react';

import { Grid, Box } from '@material-ui/core';
import { Container } from 'react-bootstrap';

export default function Defense(props){

	const callBack = props.callBack;
  //const styles = useStyles();

	const Zone = (props) => {
		let number = props.number;

		const clickCallback = () => {
			callBack(number);
		}

		return(
			<div onClick={clickCallback}>
				<p>
					{number}
				</p>
			</div>
		);
	}

	const Column = (props) => {
		let number = props.number;
		return(
			<Grid item>
				<Zone number={number} />
			</Grid>
		);
	}

	const CourtRow = (props) => {
		let number = props.number;

		return(
			<Grid item container style={{
		    display: 'flex',
		    'justifyContent': 'space-around',
			}}>
				<Column number={3*(number)-2}/>
				<Column number={3*(number)-1}/>
				<Column number={3*(number)}/>
			</Grid>
		);
	}

	return(
		<Container style={{display: 'flex', 'justifyContent': 'center'}}>
			<div style={{
		  	border: '.2em solid black',
		  	'borderBottom':'dotted',
		    width: '40vw',
		    height: '40vh',
		    display: 'flex',
		    'flexDirection': 'column',
		    'justifyContent': 'space-around',
			}}>
				<CourtRow number={1}/>
				<CourtRow number={2}/>
			</div>
		</Container>
	);
}