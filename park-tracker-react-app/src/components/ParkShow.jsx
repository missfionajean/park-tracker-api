import "../index.css"

function ParkShow(props) {
	return (
		<>
			<h1>{props.chosenPark.fullName}</h1>
			<h2>{props.chosenPark.addresses[0].line1}, {props.chosenPark.addresses[0].city}, {props.chosenPark.addresses[0].stateCode}, {props.chosenPark.addresses[0].postalCode}</h2>
			<img src={props.chosenPark.images[0].url} id="parkImage"/>
            <h2>{props.chosenPark.description}</h2>
			{props.chosenPark.entranceFees.length === 0 ? (
				<>
				<h2>Free</h2>
				</>
			) : (
				<>
				<h3>{props.chosenPark.entranceFees[0].title}: ${props.chosenPark.entranceFees[0].cost}</h3>
				<h3>{props.chosenPark.entranceFees[0].description}</h3>
				</>
			)}

		</>
	);
}

export default ParkShow;