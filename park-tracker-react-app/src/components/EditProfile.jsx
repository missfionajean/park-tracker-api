import { useState } from "react";
import { useEffect } from "react";
import NewTrip from "./NewTrip";
import EditTrip from "./EditTrip";
// import Cookies from 'js-cookie'
// import * as tripService from "../services/tripService";
import * as authService from '../services/authService'
import { signout } from "../services/authService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";

function EditProfile (props) {
	// url path to show page is baseurl/api/user/userid

    const [currentUser, setCurrentUser] = useState({
        id: null,
        username: "",
        location: "",
        travel_preferences: ""
    })

    // state variable updated on page load and new trip submit
    const [tripList, setTripList] = useState([
        {
            id: null,
            park_name: "",
            date_visited: "",
            star_rating: null,
            user_id: null
        }
    ]);
   

    // grab chosen user from database
    useEffect(() => {
        // logic to grab user info based on link clicked
		const getUserInfo = async () => {
			try {
				const res = await fetch(`http://localhost:8000/api/user/${authService.getUser().user_id}`);
				let JSONdata = await res.json();
                console.log(JSONdata)
				setCurrentUser(JSONdata);
                console.log(currentUser)
			} catch (err) {
				console.log(err);
			}
		};
		getUserInfo();

        // logic to grab all trip info from sql database
        const getTrips = async () => {
			try {
				const res = await fetch("http://localhost:8000/api/trip",
                    // {headers: { Authorization: `Bearer ${Cookies.get("jwtToken")}` }}
                );
				let JSONdata = await res.json();
                let filteredList = JSONdata.filter((trip) => trip.user_id === authService.getUser().user_id);
				setTripList(filteredList);
                // // const getTrip = await tripService.getAllTrips()
                // const filteredTrips = getTrip.filter((trip) => trip.user_id === currentUser.id)
                // setTripList(filteredTrips)
                // return getTrip
			} catch (err) {
				console.log(err);
			}
		};
		getTrips();
	}, [])

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

    const handleChosenPark = async (parkName) => {
        const parkInfo = props.foundList.filter((park) => park.fullName === parkName)
        props.setChosenPark(parkInfo[0])
        props.setPage("parkshow")
    }

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

    const signOut = () => {
        signout()
        props.setPage("home")
    }

	return (
		<>
            <button onClick={signOut}>Sign Out</button>
            {showEdit === true ? (
                <>
                 <EditTrip tripToEdit={tripToEdit} tripList={tripList} toggleTripForm={toggleTripForm} foundList={props.foundList} handleShowEdit={handleShowEdit} showEdit={showEdit} setPage={props.setPage}/>
                </>
            ) : ( <>

			{/* headline */}
            <h1>{currentUser.username}</h1>
            
            {/* basic user info */}
            <div className="userInfo">
                <div className="userLocation">
                    <FontAwesomeIcon icon={faMapMarkerAlt} size="2x" color="skyblue" />
                    <h2>{currentUser.location}</h2>
                </div>
                <div>
                    <h3>Accommodation Preferences:</h3>
                    <p>{currentUser.travel_preferences}</p>
                </div>
            </div>
            
            {addTrip ? <NewTrip setTripList={setTripList} chosenUser={currentUser.id} foundList={props.foundList} toggleTripForm={toggleTripForm} setPage={props.setPage}/> : <button onClick={toggleTripForm}>Add Trip</button>}
            {tripList
            .sort((a, b) => b.date_visited.localeCompare(a.date_visited))
            .map((trip) => (
                <ul key={trip.id}>
                    <li onClick={() => handleChosenPark(trip.park_name)} className="parkName">
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
                    <div className="removeEdit">
                    <button onClick={() => handleRemove(trip.id)} className="remove">Remove</button>
                    <button onClick={() => handleEditClick(trip)} className="edit">Edit</button>
                    </div>
                    
                </ul>
                
            ))}
            </>
        )
}
		</>
	);
}

export default EditProfile;