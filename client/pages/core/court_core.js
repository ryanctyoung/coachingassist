import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import styled from 'styled-components';


const Box = styled.div`
	
	width: 50%;
`;

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
	return(
		<Box>
			<Container style={{border: '2px solid black'}}>
				<Row>
					<Col>
						<Zone number={1} />
					</Col>
					<Col>
						<Zone number={2} />
					</Col>
				</Row>
				<Row>
					<Col>
						<Zone number={3} />
					</Col>
					<Col>
						<Zone number={4} />
					</Col>
				</Row>
				<Row>
					<Col>
						<Zone number={5} />
					</Col>
					<Col>
						<Zone number={6} />
					</Col>
				</Row>
			</Container>
		</Box>
	);
}