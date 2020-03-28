import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import styled from 'styled-components';


// const Box = styled.div`
	
// 	width: 50%;
// `;

export default function Court(props){

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
			<Col xs={1}>
				<Zone number={number} />
			</Col>
		);
	}

	const CourtRow = (props) => {
		let number = props.number;

		return(
			<Row xs={2} style={{'justify-content': 'center'}}>
				<Column number={3*(number)-2}/>
				<Column number={3*(number)-1}/>
				<Column number={3*(number)}/>
			</Row>
		);
	}

	return(
		<div>
			<Container style={{border: '2px solid black', 'border-bottom-style': 'dashed'}}>
				<CourtRow number={1}/>
				<CourtRow number={2}/>
			</Container>
		</div>
	);
}