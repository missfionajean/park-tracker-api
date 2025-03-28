// import {useState, useEffect} from 'react'
import ParkShow from './ParkShow'

function ParkList(props) {

	return (
		<>
			{ props.chosenPark != '' ? (
				<>
				<br></br>
			<button onClick={props.removeChosenPark}>&#10094; Back to List</button>	
			<ParkShow chosenPark={props.chosenPark}/>
			</>
			) : ( <>
				<h1>U.S. National Parks</h1>
			<ul className="parkList">
				{props.foundList
				.slice() // Create a shallow copy to avoid mutating the original array
				.sort((a, b) => a.fullName.localeCompare(b.fullName)) // Sort alphabetically by fullName
				.map((park, index) => (
					<li key={index} className='parkListItem' onClick={() => props.handleChange(park)}>{park.fullName}</li>
				))}
			</ul>
			</>
			)
		}
		</>
	);
}

export default ParkList;


// -------------------------------TRASH PILE-------------------------------------------

// const nationalParks = []
// event.preventDefault()
//console.log(JSONdata)
		// for (let i = 0; i < JSONdata.data.length; i++) {
		// 	// console.log(JSONdata.data[i].fullName)
		// if (JSONdata.data[i].designation === "National Park") {
		// 	// console.log(JSONdata.data[i].fullName)
		// 	nationalParks.push(JSONdata.data[i].fullName)
		// 	console.log(nationalParks)
		// 	setFoundList(nationalParks)
		// } 

			{/* <form onSubmit={findParkList}>
			<input type="submit" value="Search" />
			</form> */}

        //const nationalParkNames = nationalParks.map((park) => park.fullName);