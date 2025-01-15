// import "/Users/macbook/code/ga/projects/park-tracker-api/park-tracker-react-app/App.css"

function Navbar({ changePage }) {

	// const handleClick = () => {
	// 	changePage
	// 	removeChosenPark
	// }

	return (
		<nav className="navBar">
			<button onClick={changePage} value="home" className="navButton">
				Home
			</button>
			<button onClick={changePage} value="userlist" className="navButton">
				Users
			</button>
			<button onClick={changePage} value="editprofile" className="navButton">
				Edit Profile
			</button>
			<button onClick={changePage} value="parklist" className="navButton">
				Parks
			</button>
			<button onClick={changePage} value="signup" className="navButton">
				Sign Up
			</button>
			<button onClick={changePage} value="signin" className="navButton">
				Login
			</button>
		</nav>
	);
}

export default Navbar;
