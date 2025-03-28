import SignUpForm from "./components/signupForm/SignupForm";
import SignInForm from "./components/signinForm/SigninForm";
import { useState, useEffect, lazy, Suspense } from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import UserList from "./components/UserList";
import UserShow from "./components/UserShow";
import NewUser from "./components/NewUser";
import ParkShow from "./components/ParkShow";
import ParkList from "./components/ParkList";
import EditProfile from "./components/EditProfile";
const npsApiKey = import.meta.env.VITE_NPS_API_KEY;
const ParkListLazy = lazy(() => import('./components/ParkList'))

function App() {
	// state variable to render current page
	const [page, setPage] = useState("home");

    // holds national park name for API search and display
    const [chosenPark, setChosenPark] = useState([])
	//console.log(chosenPark)
	const handleChange = (park) => {
		setChosenPark(park)	
	}

	const removeChosenPark = () => {
		setChosenPark([])
	}

    // state variable for switching user show page
    const [chosenUser, setChosenUser] = useState()
 
	//the whole list of National Parks
	const [foundList, setFoundList] = useState([])
	//console.log(foundList)
	
	useEffect (() => {
	const findParkList = async () => {
		let response = await fetch ( //finds every park in the nps.gov parks database, max limit of 500 results, sorted by releavance score
			`https://developer.nps.gov/api/v1/parks?limit=500&q=national%20park&sort=-relevanceScore&api_key=${npsApiKey}`
		)
		let JSONdata = await response.json()
		const parks = JSONdata.data
		const nationalParks = parks.filter((park) => park.designation === "National Park")
		// console.log(nationalParks)
		let amSamoa = await fetch (
			`https://developer.nps.gov/api/v1/parks?limit=1&q=american%20samoa%20national%20park&sort=-relevanceScore&api_key=${npsApiKey}`
		)
		let amSamoaJSON = await amSamoa.json()
		let denali = await fetch (
			`https://developer.nps.gov/api/v1/parks?limit=1&q=denali%20national%20park&sort=-relevanceScore&api_key=${npsApiKey}`
		)
		let denaliJSON = await denali.json()
		let allParks = [...nationalParks]
		allParks.push(amSamoaJSON.data[0], denaliJSON.data[0])
		//console.log(allParks)
		setFoundList(allParks);
	}
	findParkList();
}, [])
  

	return (
		<>
            {/* navbar always displayed */}
			<Navbar setPage={setPage} />

            <div id="content">
            {/* home page shown by default */}
			{page === "home" ? <Home /> : ""}

            {/* legs of user section */}
			{page === "userlist" ? <UserList setChosenUser={setChosenUser} setPage={setPage}/> : ""}
			{page === "usershow" ? <UserShow handleChange={handleChange} setPage={setPage} foundList={foundList} setChosenPark={setChosenPark} chosenUser={chosenUser}/> : ""}

			{/* <ParkList removeChosenPark={removeChosenPark} foundList={foundList} handleChange={handleChange} chosenPark={chosenPark}/> */}
            {/* legs of park section */}
			{page === "parklist" ? <Suspense><ParkListLazy removeChosenPark={removeChosenPark} foundList={foundList} handleChange={handleChange} chosenPark={chosenPark}/></Suspense> : ""}
			{page === "parkshow" ? <ParkShow chosenPark={chosenPark}/> : ""}

            {/* legs of authentication section */}
			{page === "newuser" ? <NewUser /> : ""}
            {page === 'signup' ? <SignUpForm />: ""}
            {page === 'signin' ? <SignInForm />: ""}

			{/* EditProfile section */}
			{page === "editprofile" ? <EditProfile handleChange={handleChange} setPage={setPage} foundList={foundList} setChosenPark={setChosenPark} chosenUser={chosenUser}/> : ""}
            </div>
		</>
        
	);
}

export default App;

/* COMPONENTS NEEDED:
homepage
navbar
new user page (form)
edit user info page
user profile snippet
# user trips snippet (editable by trip or by table? ask group)
park show page (no edit, pulled from 3rd party API)
add/edit trip form
*/

