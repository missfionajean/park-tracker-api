import { useState } from "react";
import { useEffect } from "react";

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
				const res = await fetch(`http://localhost:8000/api/user/${props.chosenUser}`);
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
				const res = await fetch("http://localhost:8000/api/trip");
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

    const handleChosenPark = async (parkName) => {
        const parkInfo = props.foundList.filter((park) => park.fullName === parkName)
        props.setChosenPark(parkInfo[0])
        props.setPage("parkshow")
    }

	return (
		<>
			<h1>{currentUser.username}</h1>
			<h2>{currentUser.location}</h2>
            <p>{currentUser.travel_preferences}</p>
            <h2>Trips</h2>
            
            {tripList
            .sort((a, b) => b.date_visited.localeCompare(a.date_visited))
            .map((trip) => (
                <ul key={trip.id}>
                    <li onClick={() => handleChosenPark(trip.park_name)}>
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
                </ul>
            ))}
        </>
    )
}

export default UserShow;
