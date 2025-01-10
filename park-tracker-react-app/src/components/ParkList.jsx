import {useState, useEffect} from 'react'
import ParkShow from "/Users/macbook/code/ga/projects/park-tracker-api/park-tracker-react-app/src/components/ParkShow.jsx";



function ParkList(props) {

	const [foundList, setFoundList] = useState([])
	//console.log(foundList)

	const [chosenPark, setChosenPark] = useState('')
	console.log(chosenPark)
	const handleChange = (event) => {
		setChosenPark(event.target.value)
		
	}
	
	useEffect (() => {
	const findParkList = async (event) => {
		let response = await fetch ( //finds every park in the nps.gov parks database, max limit of 500 results, sorted by releavance score
			'https://developer.nps.gov/api/v1/parks?limit=500&q=national%20park&sort=-relevanceScore&api_key=2XWk6CI7j2crV9hX0XuNcqTjvJNX2m4jfpALutbx'
		)
		let JSONdata = await response.json()
		const parks = JSONdata.data
        const nationalParks = parks.filter((park) => park.designation === "National Park")
		setFoundList(nationalParks);
	}
	findParkList();
}, [])

	return (
		<>
			<h1>Parks</h1>
			if click on the name map park.event.target, else do the ul below
			{ chosenPark != '' ? (
			<ParkShow chosenPark={chosenPark}/>
			) : (
			<ul>
				{foundList.map((park, index) => (
					<li key={index}><button onClick={handleChange} value={park.fullName} >{park.fullName}</button></li>
				))}
			</ul>
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