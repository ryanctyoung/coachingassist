import React, {useState, useEffect, useContext} from 'react';
import { 
 	List, ListItem, ListItemIcon, ListItemText,
	Button,
   } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles({

  selected: {
    color: 'brown',
  },
});


export default function GameList(props) {
	const [ selected, setSelect ] = useState(-1);
	const {games, submit} = props;
	const classes = useStyles();	

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
		</div>
		);
}