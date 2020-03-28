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

export default function Landing() {

  return(
    <ul>
      <li>
        <Link href="/components/playbook" as="/playbook">
          <a>Playbook</a>
        </Link>
      </li>
    </ul>
    );
}