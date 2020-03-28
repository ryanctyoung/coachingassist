import React, {useState, useEffect} from 'react'
import Link from 'next/link';
import Court from '../../core/court_core';
import { 
  Checkbox,
  FormLabel,
  FormControlLabel,
  FormGroup,
  FormControl,
  Button,
  InputLabel,
  Select } from '@material-ui/core';

export default function Playbook() {

  const [zone, setZone] = useState();
  const [bools, setBool] = useState({
    pointBl: false,
    touchGroundBl: false,
    touchBlockBl: false,
  });
  const [blockers, setBlockers] = useState();

    useEffect(() => {
      console.log("Zone is " + zone);
    }, [zone]);

  const court_callBack = (number) => {
    setZone(number);
  }

  const submitCallback = () => {
    const {pointBl, touchBlockBl, touchGroundBl} = bools;
    console.log("Data submitted: The player got a kill: " + pointBl 
      + " The blockers got a hand on the ball: " +touchBlockBl 
      + " The passers got to the ball: "+ touchGroundBl);
  }
  return (
    <div>
      <Court callBack={court_callBack}/>
      <FormLabel component="legend">Play Details</FormLabel>
      <FormGroup>
        <FormGroup row name="bools"> 

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
      </FormGroup>
      <Button variant="contained" onClick={submitCallback}>
        Submit Play
      </Button>
    </div>
  );
}