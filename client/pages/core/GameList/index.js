import React, {useState, useEffect, useContext} from 'react';
import { 
 	List, ListItem, ListItemIcon, ListItemText,
	Button,
	TextField,
	Dialog, DialogTitle, DialogActions, DialogContent, DialogContentText,
   } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import database from '../../../db';
const useStyles = makeStyles({

  selected: {
    color: 'brown',
  },
});



export default function GameList(props) {
	const [ selected, setSelect ] = useState(-1);
	const {db, games, submit, add} = props;
	const classes = useStyles();	

	let home = "";
	let date = "";

	const [dialogOpen, setDialog] = useState(false);

	const AddCallback = () => {
		if(home != "" & date != ""){
			add({date:date, home:home});
		}
	}

	const GameDialog = () => {
		return(
			<div>
				<Button 
					variant="outlined" 
					color="primary"
					onClick={()=> setDialog(true)}
				>
					New Game
				</Button>
				<Dialog open={dialogOpen}>
					<DialogTitle> Add a New Game</DialogTitle>
					<DialogContent>
			          <TextField
			            autoFocus
			            margin="dense"
			            id="name"
			            label="Team Name"
			            type="name"
			            fullWidth
			            onChange={(e) => {home = e.target.value}}
			          />
	  		          <TextField
			            autoFocus
			            margin="dense"
			            id="name"
			            label="Date"
			            type="name"
			            fullWidth
			            onChange={(e) => {date = e.target.value}}
			          />
		       	 	</DialogContent>
					<DialogActions>
			          <Button onClick={()=> setDialog(false)} color="primary">
			            Cancel
			          </Button>
			          <Button onClick={AddCallback} color="primary">
			            Add
			          </Button>
			        </DialogActions>
				</Dialog>	
			</div>
		);
	}


	const GameItems = () => {

		let list = games.map((x) => {return (
			<ListItem
		        classes={{
		            selected: classes.selected,
		          }}
			    selected={selected == x._id} 
          		onClick={() => {setSelect(x._id)}}
			>
			{x.date} with {x.home}
			</ListItem>
			);});
		return list;
	}

	return(
		<div>
			<List>
				<GameItems/>
			</List>
			<Button onClick={()=>{
				if(selected != -1)
					submit(selected);
				}}
			>
				Select
			</Button>
			<GameDialog/>
		</div>
		);
}