import "../index.css"

function ParkShow(props) {

	return (
		<>
            {/* header and image */}
			<h1>{props.chosenPark.fullName}</h1>
			<h2>{props.chosenPark.addresses[0].line1}, {props.chosenPark.addresses[0].city}, {props.chosenPark.addresses[0].stateCode}, {props.chosenPark.addresses[0].postalCode}</h2>
			<img src={props.chosenPark.images[0].url} id="parkImage"/>

            {/* description */}
            <h3>About</h3>
            <p>{props.chosenPark.description}</p>
            <br />

            {/* additional info */}
            <h3>Hours</h3>
			<p>{props.chosenPark.operatingHours[0].description}</p>
            <br />

            <h3>Fees & Parking</h3>
			{props.chosenPark.entranceFees.length === 0 ? (
				<>
				<p>Free</p>
				</>
			) : (
				<>
				<p>{props.chosenPark.entranceFees[0].title}: ${props.chosenPark.entranceFees[0].cost}</p>
                <br />
				<p>{props.chosenPark.entranceFees[0].description}</p>
				</>
			)}
			

		</>
	);
}

export default ParkShow;