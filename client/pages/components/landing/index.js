import React, {useState, useEffect} from 'react'
import Link from 'next/link';
import { 
  Checkbox,
  FormLabel,
  FormControlLabel,
  FormGroup,
  FormControl,
  Button,
  InputLabel,
  Select } from '@material-ui/core';
import PlayBook from '../playbook';

export default function Landing() {

  return(
    <ul>
      <li>
        <Link href={{pathname: "/components/playbook", query: { players:[{name:'Ryan Young'}]}}} as="/playbook">
          <a>PlayBook</a>
        </Link>
      </li>
    </ul>
    );
}