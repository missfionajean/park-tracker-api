import { useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import ParkList from "./components/ParkList";
import ParkShow from "./components/UserShow";
import UserList from "./components/UserList";
import UserShow from "./components/UserShow";
import NewUser from "./components/NewUser";
import Login from "./components/Login";

function App() {
	// state variable to render current page
	const [page, setPage] = useState("home");

	// function passed to navbar to update page state
	const changePage = (event) => {
		setPage(event.target.value);
	};

	return (
		<>
			<Navbar changePage={changePage} />
			{page === "home" ? <Home /> : ""}
			{page === "userlist" ? <UserList /> : ""}
			{page === "usershow" ? <UserShow /> : ""}
			{page === "parklist" ? <ParkList /> : ""}
			{page === "parkshow" ? <ParkShow /> : ""}
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
