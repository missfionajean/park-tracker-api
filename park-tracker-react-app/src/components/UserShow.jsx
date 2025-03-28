import { useState } from "react";
import { useEffect } from "react";

const djangoApiUrl = import.meta.env.VITE_DJANGO_API_URL;

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";


function UserShow(props) {
	// url path to show page is baseurl/api/user/userid

    const [currentUser, setCurrentUser] = useState({
            username: "",
            password: "",
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
				const res = await fetch(`${djangoApiUrl}/user/${props.chosenUser}`);
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
				const res = await fetch(`${djangoApiUrl}/trip`);
				let JSONdata = await res.json();
                let filteredList = JSONdata.filter((trip) => trip.user_id === props.chosenUser);
				setTripList(filteredList);
			} catch (err) {
				console.log(err);
			}
		};
		getTrips();
	}, [])

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    console.log(tripList)

    const handleChosenPark = async (parkName) => {
        const parkInfo = props.foundList.filter((park) => park.fullName === parkName)
        props.setChosenPark(parkInfo[0])
        props.setPage("parkshow")
    }

	return (
		<>
            <button onClick={() => props.setPage("userlist")}>&#10094; Back to List</button>

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

            {/* trip cards */}
            <h2>Trips</h2>
            <div className="tripList">
                {tripList
                .sort((a, b) => b.date_visited.localeCompare(a.date_visited))
                .map((trip) => (
                    <div key={trip.id} className="tripCard">
                        <div>
                            <p onClick={() => handleChosenPark(trip.park_name)} className="parkName">
                                {trip.park_name}
                            </p>
                            <p>
                                <span>{months[trip.date_visited.slice(5,7)-1]} </span>
                                <span> {trip.date_visited.slice(-2)},</span>
                                <span> {trip.date_visited.slice(0,4)}</span>
                            </p>
                        </div>
                        <div>
                            <p className="starRating">
                                {/* displays filled stars */}
                                {Array(trip.star_rating).fill(0).map((_,index) => (
                                    <span key={index}>&#9733;</span>
                                ))}
                                {/* displays remainder as unfilled */}
                                {Array(5 - trip.star_rating).fill(0).map((_,index) => (
                                    <span key={index}>&#9734;</span>
                                ))}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default UserShow;
