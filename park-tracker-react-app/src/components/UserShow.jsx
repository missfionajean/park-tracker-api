import { useState } from "react";
import { useEffect } from "react";
import NewTrip from "./NewTrip";
import EditTrip from "./EditTrip";

function UserShow(props) {
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

    const handleRemove = async (id) => {
        await fetch(`http://localhost:8000/api/trip/${id}`, {
			method: "DELETE",
			// headers: {
			// 	"Content-Type": "application/json",
			// },
			// body: JSON.stringify(tripData),
		});
        setTripList(tripList.filter((trip) => trip.id !== id));
    }

    const handleEditClick = async (trip) => {
        setShowEdit(true)
        setTripToEdit(trip)
    }

    const handleShowEdit = async () => {
        setShowEdit(false)
    }

    //edit page state variable
    const [showEdit, setShowEdit] = useState(false)

    //set edit trip state variable
    const [tripToEdit, setTripToEdit] = useState('')

    // const handleChosenPark = async () => {
    //     props.setChosenPark()
    // }

	return (
		<>

            {showEdit === true ? (
                <>
                 <EditTrip tripToEdit={tripToEdit} tripList={tripList} toggleTripForm={toggleTripForm} foundList={props.foundList} handleShowEdit={handleShowEdit} showEdit={showEdit}/>
                </>
            ) : ( <>
			<h1>{currentUser.username}</h1>
			<h2>{currentUser.location}</h2>
            <p>{currentUser.travel_preferences}</p>
            <h2>Trips</h2>
            
            {addTrip ? <NewTrip foundList={props.foundList} toggleTripForm={toggleTripForm}/> : <button onClick={toggleTripForm}>Add Trip</button>}
            {tripList.map((trip, index) => (
                <ul key={index}>
                    <li>
                        <button>{trip.park_name}</button>
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
                    <button onClick={() => handleRemove(trip.id)}>Remove</button>
                    <button onClick={() => handleEditClick(trip)}>Edit</button>
                    
                </ul>
                
            ))}
            </>
        )
}
		</>
	);
}

export default UserShow;
