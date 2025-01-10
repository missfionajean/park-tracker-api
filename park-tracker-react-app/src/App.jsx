import { useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import UserList from "./components/UserList";
import UserShow from "./components/UserShow";
import NewUser from "./components/NewUser";
import Login from "./components/Login";
import ParkShow from "./components/ParkShow";
import ParkList from "./components/ParkList";

function App() {
	// state variable to render current page
	const [page, setPage] = useState("home");

	// function passed to navbar to update page state
	const changePage = (event) => {
		setPage(event.target.value);
	};

    // holds national park name for API search and display
    const [chosenPark, setChosenPark] = useState()
	// console.log(chosenPark)

    // function to change above (in parklist or usershow)
    const selectPark = (event) => {
		setChosenPark(event.target.value);
	};

	return (
		<>
            {/* navbar always displayed */}
			<Navbar changePage={changePage} />
            
            {/* home page shown by default */}
			{page === "home" ? <Home /> : ""}

            {/* legs of user section */}
			{page === "userlist" ? <UserList /> : ""}
			{page === "usershow" ? <UserShow /> : ""}

            {/* legs of park section */}
			{page === "parklist" ? <ParkList selectPark={selectPark}/> : ""}
			{page === "parkshow" ? <ParkShow chosenPark={chosenPark}/> : ""}

            {/* legs of authentication section */}
			{page === "newuser" ? <NewUser /> : ""}
			{page === "login" ? <Login /> : ""}
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
