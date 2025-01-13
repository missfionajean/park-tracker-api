import { useState } from "react";
import ParkList from "./ParkList";
import ParkShow from "./ParkList";

function ParkSection() {
    const [parkPage, setParkPage] = useState('parklist')

    const changeParkPage = (event) => {
		setParkPage(event.target.value);
	};

    const [chosenPark, setChosenPark] = useState()

    const selectPark = (event) => {
		setChosenPark(event.target.value);
	};

	return (
		<>
            {parkPage === "parklist" ? <ParkList changeParkPage={changeParkPage} selectPark={selectPark}/> : ""}
			{parkPage === "parkshow" ? <ParkShow changeParkPage={changeParkPage} chosenPark={chosenPark}/> : ""}
		</>
	);
}

export default ParkSection;