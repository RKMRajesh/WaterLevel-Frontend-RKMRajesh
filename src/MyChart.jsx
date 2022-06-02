// import React, { useState, useEffect } from 'react';
// import './App.css';
// import {sendGetRequest} from './AJAX.jsx';


// function MyChart() {

  
//   const[tempData, setTempData] = useState([]);
//   useEffect(initialize,[]);
  
//   function initialize () {
//   // let responseData;
    
//       (async function () {
//         console.log("Doing AJAX request")
//         let responseData = await sendGetRequest("/query/getCDECData?month=4&year=2022");
//         // console.log("here's responsedata", responseData);
//         setTempData(responseData);
//         // console.log("here's responsedata", responseData);
//       }) ();
//   }
//   // console.log("tempData data ", tempData);
//   let waterData = tempData.map(dataItem => {
//     console.log("inside map");
//     return <li>{dataItem.stationId + dataItem.value}</li>
//   });
//   // }
//       // let dataElems = datas.map(data => <li> {`${data.stationId} = ${data.value}`} </li>);
//   return (
//     <div id="chart">
//       <ul>
//         {waterData}
//       </ul>
//     </div>
//   )
// }

// export default MyChart;