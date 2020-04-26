import React, {useState, useEffect, useContext} from 'react'
import Link from 'next/link';
import { spacing } from '@material-ui/system';
import { makeStyles } from '@material-ui/core/styles';
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
  Select,
  Card,
  colors,
   } from '@material-ui/core';

import TeamContext from '../context/TeamContext';
import GameList from '../../core/GameList';

import database from '../../../db';

const styledBy = (property, mapping) => (props) => mapping[props[property]];
const useStyles = makeStyles({
  svg: {
    width: '1.5em',
  },
  playCard: {
    backgroundColor: '#ffcdd2', //light red
  },
  selected: {
    color: 'brown',
  },
});



const svg_prefix = './';
const reqSvgs = require.context ( '../../images/svg', true, /\.svg$/ )
const svgs = reqSvgs
  .keys ()
  .reduce ( ( images, path ) => {
    images[path] = reqSvgs ( path )
    return images
  }, {} )
  /*
  angry.svg
  check-circle.svg
  map-pin.svg
  shield.svg
  stopwatch.svg
  user.svg
  */



const theme = createMuiTheme({
  spacing: 4,
});

const db = new database();

export default function Playbook(props) {

  const [ isLoading, setIsLoading ] = useState(false);

  const [ isSelecting, setIsSelecting] = useState(false);
  const [ games, setGames] = useState([]);

  const classes = useStyles();
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

  const [hitters, setHitters] = useState([]);
  
  // const [playerSelect, setPlayer] = useState(hitters[0]);
  const [tempo, setTempo] = useState();
  const [spikeBls, setSpike] = useState({
    onorOffbool:null,
    inorOutbool:null,
  });

  useEffect(() => {

    async function fetchData(){
      setIsLoading(true);
      console.log("fetchData");
      await db.init();
      const results = await db.getPlayers("Davis");
      setHitters(results.map((x,index) => {
          console.log("Async playback: " + x.name);
          return {...x, plays:[], key: index}
      }));
      var games = await db.getGames();
      setGames(games);

      setIsSelecting(true);
      setIsLoading(false);

    }

    fetchData();
  }, []);

  const HittersList = (props) => {
    const chosen = props.chosen;
    const result = hitters.map((hitter)=> {
      return(
        <ListItem 
          key={hitter.key} 
          classes={{
            selected: classes.selected,
          }}
          selected={chosen == hitter.key} 
          onClick={() => {setPlayer(hitter.key)}}
          button>
          {hitter.name}
        </ListItem>
        );
    });

    return(
      <div>
         <List mx={3}>
         {result}
         </List>
         <Button>
          Add
         </Button>
      </div>
      );
  }

  const PlaysList = (props) => {
    let selected = hitters.find((e) => e.key == playerSelect);

    if(!selected){
      return(<div/>);
    }
    const result = selected.plays.map((play)=> {
      const {data} = play;
      console.log(data.onorOffbool)
      let onOff = '';
      switch(data.onorOffbool) {
        case -1:
          onOff = "Tight and";
          break;
        case 0:
          onOff = "Good and";
          break;
        case 1:
          onOff = "Off and"
          break;
        default:
          console.log('incorrect Value: default statement reached');
      }

      let inOut = '';
      switch(data.inorOutbool) {
        case -1:
          inOut = " Inside"
          break;
        case 0:
          inOut = " Inline"
          break;
        case 1:
          inOut = " Outside"
          break;
        default:
          console.log('incorrect Value: default statement reached');        
      }


      return(
        <ListItem>
          <Card raised 
            style={{backgroundColor: data.pointBl ? '#a5d6a7': '#ffcdd2' }}
            className={classes.playCard}>
            { data.name }'s Play:
            <Box my={2} style= {{display:'flex'}}>
              <img className={classes.svg} src={svgs[svg_prefix+'angry.svg']} alt="React Logo" />
                {data.touchGroundBl} in Zone: {data.defenseZone}
              <img className={classes.svg} src={svgs[svg_prefix+'check-circle.svg']} alt="React Logo" />
                {data.pointBl}
              <img className={classes.svg} src={svgs[svg_prefix+ 'map-pin.svg']} alt="React Logo" />
                {onOff}{inOut}
              <img className={classes.svg} src={svgs[svg_prefix+ 'shield.svg']} alt="React Logo" />
                {data.touchBlockBl} with {data.blockers} blockers
              <img className={classes.svg} src={svgs[svg_prefix+ 'stopwatch.svg']} alt="React Logo" />
                {data.tempo} Tempo
              {play.count}
            </Box>
          </Card>
        </ListItem>
      );
    });


      return(
       <List my={3}>
       {result}
       </List>
      );
  }

  //COURT CALLBACKS
  const courtO_callBack = (num) => {
    setZone({...zones, attackZone:num});
  }
  const courtD_callBack = (num) => {
    setZone({...zones, defenseZone:num});
  }

  const submitPlayCallback = () => {
    let hitterSlice = [...hitters];
    let selected = hitterSlice.find(e => e.key == playerSelect);
    if(!selected){
      console.log(playerSelect);
      return;
    }
    //nullcheck relevant properties here

    let playData = {
      data: {...bools, ...zones, blockers, tempo, ...spikeBls, id:selected.id, name:selected.name},
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

  const submitGameCallback = (id) => {
    let selectedGame = games.find(e => e._id == id);
    setIsSelecting(false);
  }

  //
  if(isLoading){
    return (
      <div>
        Loading...
      </div>
      );
  } else if(isSelecting){
    return (
      <GameList games={games} submit={submitGameCallback}/>
      );
  }

  //Main return path
  return (
    <div style={{display: 'flex', flexDirection:'column'}}>
      <div style={{display: 'flex'}}>
        <Box mt={3}>
          <FormLabel>Players List</FormLabel>
          <HittersList chosen={playerSelect}/>
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
                    onChange={(e) => {setBlockers(parseInt(e.target.value))}}
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
                <Box my={1} >
                  <InputLabel htmlFor="age-native-simple">Set's distance from net</InputLabel>
                  <Select
                    native
                    value={spikeBls.onorOffbool}
                    onChange={(e) => {setSpike({...spikeBls, [e.target.name]:parseInt(e.target.value)})}}
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
                <Box my={1}>
                  <InputLabel htmlFor="age-native-simple">Set's horizontal distance</InputLabel>
                  <Select
                    native
                    value={spikeBls.inorOutbool}
                    onChange={(e) => {setSpike({...spikeBls, [e.target.name]:parseInt(e.target.value)})}}
                    inputProps={{
                      name: 'inorOutbool',
                      id: 'inorOut-native-simple',
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

          <Button variant="contained" onClick={submitPlayCallback}>
            Submit Play
          </Button>
        </Box>
      </div>
      <PlaysList/>
      <Button variant="contained" onClick={submitGameCallback}>
        Finish - Submit Game
      </Button>
    </div>
  );
}