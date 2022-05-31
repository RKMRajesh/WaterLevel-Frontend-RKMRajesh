import React, { useState, useEffect } from 'react';
import './App.css';
import {sendGetRequest} from './AJAX.jsx';


function MyChart() {

  useEffect(initialize,[]);

  function initialize () {
    
      (async function () {
        console.log("Doing AJAX request")
        let datas = await sendGetRequest("query/getCDECData");
      }) ();
    
  }
      let dataElems = data.map(data => <li> {`${data.stationId} = ${data.value}`} </li>);
  
}