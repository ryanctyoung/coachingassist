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
  const [playerSelect, setPlayer] = useState({name:"", id: -1});


  //hitter states

  const [hitters, setHitters] = useState(useContext(TeamContext).players);
  const [tempo, setTempo] = useState();
  const [spikeBls, setSpike] = useState({
    onorOffbool:null,
    inorOutbool:null,
  });

  useEffect(() => {
    console.log("AttackZone is " + zones.attackZone + " while the defense zone is " + zones.defenseZone + " by " + playerSelect.name);
  }, [zones]);

  const HittersList = (props) => {
    const chosen = props.chosen;
    const result = hitters.map((hitter)=> {
      return(
        <ListItem 
          key={hitter.id} 
          selected={chosen == hitter.id} 
          onClick={() => {setPlayer(hitter)}}
          button>
          {hitter.name}
        </ListItem>
        );
    });

    return result;
  }


  //COURT CALLBACKS
  const courtO_callBack = (num) => {
    setZone({...zones, attackZone:num});
  }
  const courtD_callBack = (num) => {
    setZone({...zones, defenseZone:num});
  }

  const submitCallback = () => {
    const {pointBl, touchBlockBl, touchGroundBl} = bools;
    console.log("Data submitted: The player got a kill: " + pointBl 
      + " The blockers got a hand on the ball: " +touchBlockBl 
      + " The passers got to the ball: "+ touchGroundBl);
  }





  return (
    <div style={{display: 'flex'}}>
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

        <Box mt={3}>
          <FormLabel>Players List</FormLabel>
          <List border={1}>
            <HittersList chosen={playerSelect.id}/>
          </List>
        </Box>
        <Button variant="contained" onClick={submitCallback}>
          Submit Play
        </Button>
      </Box>
    </div>
  );
}