import React from 'react'
import Landing from "./components/landing"


export default function Index() {
  return (
    <div>
    	<link
		  rel="stylesheet"
		  href="https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
		  integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
		  crossOrigin="anonymous"
		/>
      <Landing />
    </div>
  );
}