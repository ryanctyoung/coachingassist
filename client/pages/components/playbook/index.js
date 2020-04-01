import React, {useState, useEffect, useContext} from 'react'
import Link from 'next/link';
import { spacing } from '@material-ui/system';
import Court from '../../core/court/court_core';
import { 
  createMuiTheme,
  Checkbox,
  FormLabel,
  FormControlLabel,
  FormGroup,
  List, ListItem, ListItemIcon, ListItemText,
  FormControl,
  Button,
  InputLabel,
  Box,
  Select } from '@material-ui/core';

import TeamContext from '../context/TeamContext'


// const styles = {
// checked: {
//   color: green[500],
// },
// size: {
//   width: 40,
//   height: 40,
// },
// sizeIcon: {
//   fontSize: 20,
// },
// };

const theme = createMuiTheme({
  spacing: 4,
});

export default function Playbook(props) {

  //defensive states
  const [zones, setZone] = useState({
      attackZone: null,
      defenseZone: null,
    });
  const [bools, setBool] = useState({ 
    pointBl: false,
    touchGroundBl: false,
    touchBlockBl: false,
  });
  const [blockers, setBlockers] = useState();
  const [playerSelect, setPlayer] = useState(-1);


  //hitter states

  const [hitters, setHitters] = useState(useContext(TeamContext).players.map(x => {return {...x, plays:[]}}));
  // const [playerSelect, setPlayer] = useState(hitters[0]);
  const [tempo, setTempo] = useState();
  const [spikeBls, setSpike] = useState({
    onorOffbool:null,
    inorOutbool:null,
  });

  const HittersList = (props) => {
    const chosen = props.chosen;
    const result = hitters.map((hitter)=> {
      return(
        <ListItem 
          key={hitter.id} 
          selected={chosen == hitter.id} 
          onClick={() => {setPlayer(hitter.id)}}
          button>
          {hitter.name}
        </ListItem>
        );
    });

    return(
       <List mx={3}>
       {result}
       </List>
      );
  }

  const PlaysList = (props) => {
    let selected = hitters.find(e => e.id == playerSelect);

    if(!selected){
      return(<div/>);
    }
    const result = selected.plays.map((play)=> {
      return(
        <ListItem>
          {svgs['../../images/svg/angry.svg']} Play: {play.count}
        </ListItem>
      );
    });


      return(
       <List my={3}>
       {result}
       </List>
      );
  }

  useEffect(()=>{console.log(hitters)}, [hitters]);
  //COURT CALLBACKS
  const courtO_callBack = (num) => {
    setZone({...zones, attackZone:num});
  }
  const courtD_callBack = (num) => {
    setZone({...zones, defenseZone:num});
  }

  const submitCallback = () => {
    let hitterSlice = [...hitters];
    let selected = hitterSlice.find(e => e.id == playerSelect);
    if(!selected){
      console.log(playerSelect);
      return;
    }
    //nullcheck relevant properties here

    let playData = {
      data: {...bools, ...zones, blockers, tempo, ...spikeBls},
      count: 1
    };

    function playEquals (obj, arr) {
        loop:
        for(let i = 0; i < arr.length; i++){
          let other = arr[i];
          for (const key in obj.data){
            if (obj.data[key] != other.data[key]){
              continue loop;
            } 
          }
          return i;
        } 
      return -1; 
    }

    if( selected.plays.length == 0){
      selected.plays.push(playData);
    }else {
      let searchResult = playEquals(playData, selected.plays);
      if(searchResult != -1){
        selected.plays[searchResult].count += 1;
      } else{
         selected.plays.push(playData);
      }
    }  
    setHitters(hitterSlice);


  }





  return (
    <div style={{display: 'flex', flexDirection:'column'}}>
      <div style={{display: 'flex'}}>
        <Box mt={3}>
          <FormLabel>Players List</FormLabel>
          <HittersList chosen={playerSelect.id}/>
        </Box>
        <Box mx={4} my={9}>
          <Court mode={'defense'} callBack={courtD_callBack}/>
          <Court mode={'offense'} callBack={courtO_callBack}/>
        </Box>
        <Box mx={4}>
          <Box my={2}>
            <FormLabel component="legend">Defensive Details</FormLabel>
          </Box>
          <Box my={1}>
            <FormGroup>
              <FormGroup row name="defensive-bools"> 

               <FormControlLabel
                control={
                    <Checkbox
                      checked={bools.pointBl}
                      onChange={(e) => {setBool({...bools, [e.target.name]:e.target.checked})}}
                      name="pointBl"
                      color="primary"
                    />
                }
                label="Point"
                />

                <FormControlLabel
                control={
                    <Checkbox
                      checked={bools.touchGroundBl}
                      onChange={(e) => {setBool({...bools, [e.target.name]:e.target.checked})}}
                      name="touchGroundBl"
                      color="primary"
                    />
                }
                label="Touch by passers"
                />

                <FormControlLabel
                control={
                    <Checkbox
                      checked={bools.touchBlockBl}
                      onChange={(e) => {setBool({...bools, [e.target.name]:e.target.checked})}}
                      name="touchBlockBl"
                      color="primary"
                    />
                }
                label="Touch by blockers"
                />

              </FormGroup>
              <Box my={1}>
                <FormControl>
                  <InputLabel htmlFor="age-native-simple">Blockers</InputLabel>
                  <Select
                    native
                    value={blockers}
                    onChange={(e) => {setBlockers(e.target.value)}}
                    inputProps={{
                      name: 'blockers',
                      id: 'blockers-native-simple',
                    }}
                  >
                    <option aria-label="None" value="" />
                    <option value={0}>Open</option>
                    <option value={1}>Single</option>
                    <option value={2}>Double</option>
                    <option value={3}>Triple</option>
                  </Select>
                </FormControl>
              </Box>
            </FormGroup>
          </Box>

              
          <Box mt={3}>
            <Box my={1}>
              <FormLabel component="legend">Hitter Details</FormLabel>
            </Box>
            <FormGroup>
              <FormGroup row name="hitter-bools">
                <Box my={1} mx={1}>
                  <InputLabel htmlFor="age-native-simple">Set's distance from net</InputLabel>
                  <Select
                    native
                    value={spikeBls.onorOffbool}
                    onChange={(e) => {setSpike({...spikeBls, onorOffbool:e.target.value})}}
                    inputProps={{
                      name: 'onorOffbool',
                      id: 'onorOff-native-simple',
                    }}
                  >
                    <option aria-label="None" value="" />
                    <option value={-1}>On</option>
                    <option value={1}>Off</option>
                    <option value={0}>Perfect</option>
                  </Select>
                </Box>
                <Box my={1} mx={3}>
                  <InputLabel htmlFor="age-native-simple">Set's horizontal distance</InputLabel>
                  <Select
                    native
                    value={spikeBls.inorOutbool}
                    onChange={(e) => {setSpike({...spikeBls, inorOutbool:e.target.value})}}
                    inputProps={{
                      name: 'onorOffbool',
                      id: 'onorOff-native-simple',
                    }}
                  >
                    <option aria-label="None" value="" />
                    <option value={-1}>Inside</option>
                    <option value={1}>Outside</option>
                    <option value={0}>Straight</option>
                  </Select>
                </Box>  
              </FormGroup>
              <FormControl>
                <Box my={1}>
                  <InputLabel htmlFor="age-native-simple">Tempo</InputLabel>
                  <Select
                    native
                    value={tempo}
                    onChange={(e) => {setTempo(e.target.value)}}
                    inputProps={{
                      name: 'tempo',
                      id: 'tempo-native-simple',
                    }}
                  >
                    <option aria-label="None" value="" />
                    <option value={3}>3rd Tempo</option>
                    <option value={2}>2nd Tempo</option>
                    <option value={1}>1st Tempo</option>
                    <option value={0}>Minus Tempo</option>
                  </Select>
                </Box>
              </FormControl>
            </FormGroup>
          </Box>

          <Button variant="contained" onClick={submitCallback}>
            Submit Play
          </Button>
        </Box>
      </div>
      <PlaysList/>
    </div>
  );
}