import {useState, useEffect} from 'react'
import ParkShow from "/Users/macbook/code/ga/projects/park-tracker-api/park-tracker-react-app/src/components/ParkShow.jsx";



function ParkList(props) {

	const [foundList, setFoundList] = useState([])
	console.log(foundList)

	const [chosenPark, setChosenPark] = useState([])
	console.log(chosenPark)
	const handleChange = (park) => {
		setChosenPark(park)	
	}

	const removeChosenPark = () => {
		setChosenPark([])
	}
	
	useEffect (() => {
	const findParkList = async (event) => {
		let response = await fetch ( //finds every park in the nps.gov parks database, max limit of 500 results, sorted by releavance score
			'https://developer.nps.gov/api/v1/parks?limit=500&q=national%20park&sort=-relevanceScore&api_key=2XWk6CI7j2crV9hX0XuNcqTjvJNX2m4jfpALutbx'
		)
		let JSONdata = await response.json()
		const parks = JSONdata.data
        const nationalParks = parks.filter((park) => park.designation === "National Park")
		//console.log(nationalParks)
		setFoundList(nationalParks);
	}
	findParkList();
}, [])

	return (
		<>
			{ chosenPark != '' ? (
				<>
				<br></br>
			<button onClick={removeChosenPark}>Back to List</button>	
			<ParkShow chosenPark={chosenPark}/>
			</>
			) : ( <>
				<h1>U.S. National Parks</h1>
			<ul>
				{foundList
				.slice() // Create a shallow copy to avoid mutating the original array, from chatGPT
				.sort((a, b) => a.fullName.localeCompare(b.fullName)) // Sort alphabetically by fullName, from chatGPT
				.map((park, index) => (
					<li key={index}><button onClick={() => handleChange(park)}>{park.fullName}</button></li>
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