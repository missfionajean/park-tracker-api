import { useState } from "react";
import { useEffect } from "react";
import NewTrip from "./NewTrip";

function UserShow() {
	// url path to show page is baseurl/api/user/userid

    const [currentUser, setCurrentUser] = useState(
        {
            id: 1,
            username: "missfionajean",
            location: "Yonkers, New York",
            travel_preferences: "Glamping only please!",
        }
    )

    // triplist will likely be a fetch request on this page
    const sampleTripList = [
        {
            "id": 1,
            "park_name": "Grand Canyon",
            "date_visited": "2020-01-25",
            "star_rating": 4,
            "user_id": 1
        },
        {
            "id": 2,
            "park_name": "Yellowstone",
            "date_visited": "2024-03-13",
            "star_rating": 5,
            "user_id": 1
        },
        {
            "id": 3,
            "park_name": "Joshua Tree",
            "date_visited": "2019-09-10",
            "star_rating": 3,
            "user_id": 1
        },
        {
            "id": 4,
            "park_name": "Redwood Forest",
            "date_visited": "2018-02-28",
            "star_rating": 2,
            "user_id": 1
        }
    ]

    // state variable updated on page load and new trip submit
    const [tripList, setTripList] = useState([]);
    // useEffect function grabs info on page load
	useEffect(() => {
		const getAllTrips = async () => {
			try {
				const res = await fetch("http://localhost:8000/api/trip");
				let JSONdata = await res.json();
				setTripList(JSONdata);
			} catch (err) {
				console.log(err);
			}
		};
		getAllTrips();
	}, []);

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

    // functionality for displaying new trip component
    const [addTrip, setAddTrip] = useState(false)

    const toggleTripForm = () => {
        if (addTrip) {
            setAddTrip(false)
        } else {
            setAddTrip(true)
        }
    }

	return (
		<>
			<h1>{currentUser.username}</h1>
			<h2>{currentUser.location}</h2>
            <p>{currentUser.travel_preferences}</p>

            <h2>Trips</h2>
            {addTrip ? <NewTrip toggleTripForm={toggleTripForm}/> : <button onClick={toggleTripForm}>Add Trip</button>}

            {tripList.map((trip, index) => (
                <ul key={index}>
                    <li>
                        {trip.park_name}
                    </li>
                    <li>
                        <span>{months[trip.date_visited.slice(5,7)-1]} </span>
                        <span> {trip.date_visited.slice(-2)},</span>
                        <span> {trip.date_visited.slice(0,4)}</span>
                    </li>
                    <li>
                        {/* displays filled stars */}
                        {Array(trip.star_rating).fill(0).map((_,index) => (
                            <span key={index}>&#9733;</span>
                        ))}
                        {/* displays remainder as unfilled */}
                        {Array(5 - trip.star_rating).fill(0).map((_,index) => (
                            <span key={index}>&#9734;</span>
                        ))}
                    </li>
                    <button>Remove</button>
                </ul>
            ))}
		</>
	);
}

export default UserShow;
