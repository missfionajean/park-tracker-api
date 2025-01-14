import { useState } from "react";

function EditTrip (props) {

    const [tripData, setTripData] = useState({
        park_name: props.tripToEdit.park_name,
        date_visited: props.tripToEdit.date_visited,
        star_rating: props.tripToEdit.star_rating,
        user_id: props.tripToEdit.user_id,
    });

    const handleSubmit = async (event) => {
		// prevents page reload
		event.preventDefault();
		// makes sure rating is submitted as a number
		// setTripData({
		// 	...tripData,
		// 	[tripData.star_rating]: parseInt(tripData.star_rating),
		// });
		// post request to park_tracker_api
		await fetch(`http://localhost:8000/api/trip/${props.tripToEdit.id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(tripData),
		});

		// un-renders trip add form (resets every re-render)
		props.toggleTripForm();
        props.handleShowEdit();
	};

    const handleInput = (event) => {
		console.log(event.target.name, event.target.value)
		setTripData((tripData) => ({ //tripData callback function used here to guaruntee the latest state is used and then updated. something was happening for these to update out of order(?), and the park name was not being updated and sent in the request
			...tripData,
			[event.target.name]: event.target.value,
		}))
    }

	return (
		<>
			<h1>This is the EditTrip page!</h1>
            <h2>{props.tripToEdit.id}</h2>
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
				name="star_rating"
				value={tripData.star_rating}
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
			<button onClick={props.toggleTripForm(false)}>Cancel</button>
			<button type="submit">Submit</button>
		</form>
		</>
	);

}

export default EditTrip;