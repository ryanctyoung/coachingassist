import React, {useState} from 'react';

import { Grid } from '@material-ui/core';
import { Container } from 'react-bootstrap';

export default function Court(props){

  const callBack = props.callBack;
  const mode = props.mode;
  const [chosen, setChosen] = useState(-1);

  const rolePlayer = mode == 'defense' ? 'Pass' : 'Hitter';


  const Zone = (props) => {
    let number = props.number;
    let highlight = chosen == number;
    const clickCallback = () => {
      if(!highlight){
        setChosen(number);
        callBack(number);
      } else{
        setChosen(-1);
        callBack(null);
      }
    }

    return(
      <div onClick={clickCallback} style={{textAlign: 'center', flex: '1 0 .5em'}}>
        <p>
          {highlight ? rolePlayer : number}
        </p>
      </div>
    );
  }

  const CourtRow = (props) => {
    let number = props.number;

    return(
      <Grid item container style={{
        display: 'flex',
        'justifyContent': 'space-around',
        'flexDirection': mode=='defense' ? 'row' : 'row-reverse',
        'alignItems': 'center',
      }}>
        <Zone number={3*(number)-2} highlight={false}/>
        <Zone number={3*(number)-1} highlight={false}/>
        <Zone number={3*(number)} highlight={false}/>
      </Grid>
    );
  }

  return(
    <Container style={{display: 'flex',
        width: '20vw',
        height: '20vh', 
        'justifyContent': 'center'}}>
      <div style={{
        border: '.2em solid black',
        'borderTop':  mode=='defense' ?'solid':'dotted',
        'borderBottom' :  mode=='defense' ? 'dotted': 'solid',
        width: '20vw',
        height: '20vh',
        display: 'flex',
        'flexDirection': mode=='defense' ? 'column' : 'column-reverse',
        'justifyContent': 'space-around',
      }}>
        <CourtRow number={1}/>
        <CourtRow number={2}/>
      </div>
    </Container>
  );
}