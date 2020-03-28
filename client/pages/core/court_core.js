import React from 'react';

import { Grid, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Container } from 'react-bootstrap';
// const Box = styled.div`
	
// 	width: 50%;
// `;

const useStyles = makeStyles({
  root: {



  },

});



export default function Court(props){

  const styles = useStyles();
	const Zone = (props) => {
		let number = props.number;

		return(
			<div>
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
		    'justify-content': 'space-around',
			}}>
				<Column number={3*(number)-2}/>
				<Column number={3*(number)-1}/>
				<Column number={3*(number)}/>
			</Grid>
		);
	}

	return(
		<Container style={{display: 'flex', 'justify-content': 'center'}}>
			<div style={{
		  	border: '.2em solid black',
		  	'border-bottom':'dotted',
		    width: '40vw',
		    height: '40vh',
		    display: 'flex',
		    'flex-direction': 'column',
		    'justify-content': 'space-around',
			}}>
				<CourtRow number={1}/>
				<CourtRow number={2}/>
			</div>
		</Container>
	);
}