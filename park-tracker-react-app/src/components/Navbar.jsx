import ParkList from "./ParkList";

function Navbar({ changePage }) {

	// const handleClick = () => {
	// 	changePage
	// 	removeChosenPark
	// }

	return (
		<nav>
			<button onClick={changePage} value="home">
				Home
			</button>
			<button onClick={changePage} value="userlist">
				Users
			</button>
            <button onClick={changePage} value="usershow">
				User Show Test
			</button>
			<button onClick={changePage} value="parklist">
				Parks
			</button>
			<button onClick={changePage} value="newuser">
				Sign Up
			</button>
			<button onClick={changePage} value="login">
				Login
			</button>
		</nav>
	);
}

export default Navbar;
