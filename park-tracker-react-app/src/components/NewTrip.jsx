import { useEffect, useState } from "react";

function NewTrip( props, { toggleTripForm }) {
    // state variable for holding national park list
	// const [foundList, setFoundList] = useState();

	// // same fetch request as park list to populate drop-down
	// useEffect(() => {
	// 	const findParkList = async () => {
	// 		let response = await fetch(
	// 			"https://developer.nps.gov/api/v1/parks?limit=500&q=national%20park&sort=-relevanceScore&api_key=2XWk6CI7j2crV9hX0XuNcqTjvJNX2m4jfpALutbx"
	// 		);
	// 		let JSONdata = await response.json();
	// 		const parks = JSONdata.data;
	// 		const nationalParks = parks.filter(
	// 			(park) => park.designation === "National Park"
	// 		);
	// 		setFoundList(nationalParks);
	// 	};
	// 	findParkList();
	// }, []);
    
	// JSON object for controlled form
	const [tripData, setTripData] = useState({
		park_name: "",
		date_visited: "",
		star_rating: 0,
		user_id: 1,
	});

	// for controlled input fields
	const handleInput = (event) => {
		setTripData({ ...tripData, [event.target.name]: event.target.value });
	};

	// performs submit actions for form
	const handleSubmit = async (event) => {
		// prevents page reload
		event.preventDefault();
		// makes sure rating is submitted as a number
		setTripData({
			...tripData,
			[tripData.star_rating]: parseInt(tripData.star_rating),
		});
		// post request to park_tracker_api
		await fetch("http://localhost:8000/api/trip", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(tripData),
		});

		// un-renders trip add form (resets every re-render)
		toggleTripForm();
	};

	return (
		<form onSubmit={handleSubmit}>
			{/* options generated from 3rd party API */}
			<label htmlFor="park_name">Park: </label>
			<select
				name="park_name"
				value={tripData.park_name}
				onChange={handleInput}
				required
			>
                {/* EVERYTHING WORKS EXCEPT THIS! */}
				{props.foundList.map((park, index) => (
					<option value={park.fullName} key={index}>
						{park.fullName}
					</option>
				))}
			</select>

			{/* date input assures correct formatting */}
			<label htmlFor="date_visited">Starting Date: </label>
			<input
				type="date"
				name="date_visited"
				value={tripData.date_visited}
				onChange={handleInput}
				required
			/>

			{/* dropdown with options 1-5 only */}
			<label htmlFor="star_rating">Rating: </label>
			<select
				name="park_name"
				value={tripData.park_name}
				onChange={handleInput}
				required
			>
				<option>1</option>
				<option>2</option>
				<option>3</option>
				<option>4</option>
				<option>5</option>
			</select>

			{/* buttons to submit or exit form */}
			<button onClick={toggleTripForm}>Cancel</button>
			<button type="submit">Submit</button>
		</form>
	);
}

export default NewTrip;
