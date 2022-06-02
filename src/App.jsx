import React, { useEffect, useState } from "react";
import './App.css';
import {sendGetRequest} from './AJAX.jsx'
// import MyChart from "./MyChart.jsx"
import { Bar } from "react-chartjs-2";
import Chart from 'chart.js/auto';

function App() {
  const [seeMore, setSeeMore] = useState(false);
  let bottomContainerClass = "hideContainer";
  let buttonText = "See more"
  function seeMoreOnClick() {
    setSeeMore(!seeMore);
  }

  if (seeMore) {
    bottomContainerClass = "bottomContainer";
    buttonText = "See less"
  } else {
    let bottomContainerClass = "hideContainer";
    buttonText = "See more"
  }

  useEffect(initialize,[]);

  function initialize() {
    (async function () {
      let AJAXResponse = await sendGetRequest("/query/getResponse");
      console.log("Got the following response: ", AJAXResponse.msg);
    }) ();
  }
  
  
  return (
    <main>
      <p className="header-p">
      Water Storage in California reservoirs
      </p>
      <div id="topContainer">
        <div id="topLeft">
          <p>
            California's reservoirs are part of a <a href="https://www.ppic.org/wp-content/uploads/californias-water-storing-water-november-2018.pdf">complex water storage system</a>.  The State has very variable weather, both seasonally and from year-to-year, so storage and water management is essential.  Natural features - the Sierra snowpack and vast underground aquifers - provide more storage capacity,  but reservoirs are the part of the system that people control on a day-to-day basis.  Managing the flow of surface water through rivers and aqueducts, mostly from North to South, reduces flooding and attempts to provide a steady flow of water to cities and farms, and to maintain natural riparian habitats.  Ideally, it also transfers some water from the seasonal snowpack into long-term underground storage.  Finally, hydro-power from the many dams provides carbon-free electricity. 
          </p>
           <p>
            California's water managers monitor the reservoirs carefully, and the state publishes daily data on reservoir storage.
          </p>
           <button id="seeButton" onClick={seeMoreOnClick}>{buttonText}</button>
        </div>

        <div id="topRight">
          <img src="https://cdn.theatlantic.com/thumbor/HYdYHLTb9lHl5ds-IB0URvpSut0=/900x583/media/img/photo/2014/09/dramatic-photos-of-californias-historic-drought/c01_53834006/original.jpg
      "/>
          <p id="imageCaption">
            Lake Oroville in the 2012-2014 drought. Image credit Justin Sullivan, from The Atlatic article Dramatic Photos of California's Historic Drought.    
          </p>
           
        </div>
      </div>

    
    <div className={bottomContainerClass}>
 
  <DisplayChart/>
  <div id="bottomRight">
    <p id="bottomParagraph"> 
    Here's a quick look at some of the data on reservoirs from the <a href="https://cdec.water.ca.gov/index.html">California Data Exchange Center</a>, which consolidates climate and water data from multiple federal and state government agencies, and  electric utilities.  Select a month and year to see storage levels in the eleven largest in-state reservoirs.
    </p>
    <div id="monthPicker">
    </div>
  </div> 
</div>

    </main>
  );
}

// Function to display chart
function DisplayChart() { 
  const[tempData, setTempData] = useState([]);
  useEffect(initialize,[]);
  
  function initialize () {   
      (async function () {
        console.log("Doing AJAX request")
        let responseData = await sendGetRequest("/query/getCDECData?month=4&year=2022");
        // console.log("here's responsedata", responseData);
        setTempData(responseData);
        // console.log("here's responsedata", responseData);
      }) ();
  }
  // console.log("tempData data ", tempData);
  let waterData = tempData.map(dataItem => {
    console.log("inside map");
    return <li>{dataItem.stationId + dataItem.value}</li>
  });
  
  return (
    <main>
      <WaterChart reservoirs={tempData}> </WaterChart>
    </main>
  )
}

function WaterChart(props) {
  const nicknames = new Map();
  nicknames.set(0, "Shasta");
  nicknames.set(1, "Oroville");
  nicknames.set(2, "Trinity Lake");
  nicknames.set(3, "New Melones");
  nicknames.set(4, "San Luis");
  nicknames.set(5, "Don Pedro");
  nicknames.set(6, "Berryesa");

  // Hardcoding total capcities gotten from CDEC
  const AllCapacities = new Map();
  AllCapacities.set(0, 4552000);
  AllCapacities.set(1, 3537577);
  AllCapacities.set(2, 2447650);
  AllCapacities.set(3, 2400000);
  AllCapacities.set(4, 2041000);
  AllCapacities.set(5, 2030000);
  AllCapacities.set(6, 1602000);
  
  if (props.reservoirs) {
    let n = props.reservoirs.length;

    let totalCapacities = {label: "Total Capacity",data: [], backgroundColor: ["rgb(66,145,152)"]};
    let currentCapacities = {label: "Current Capacity", data: [], backgroundColor: ["rgb(120,199,227)"]};
    let labels = [];

    for (let i=0; i < n; i++) {
      totalCapacities.data.push(AllCapacities.get(i));
      currentCapacities.data.push(props.reservoirs[i].value);
      labels.push(nicknames.get(i));
    }

    let userData = {}
    userData.labels = labels;
    userData.datasets = [totalCapacities, currentCapacities];

    let options = {
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
  },
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      stacked: true,
      grid: {
        display: false
      }
    },
    y: {
      stacked: true,
      grid: {
        display: false
      }
    }
  }
};

  return (
    <div id="chart-container">
      <Bar options={options} data={userData} />
    </div>
  )
}

  
  
  
}

export default App;

// <div id="chart">
//       <ul>
//         {waterData}
//       </ul>
//     </div>