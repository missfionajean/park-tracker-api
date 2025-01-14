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
			<button onClick={changePage} value="editprofile">
				Edit Profile
			</button>
			<button onClick={changePage} value="parklist">
				Parks
			</button>
			<button onClick={changePage} value="signup">
				Sign Up
			</button>
			<button onClick={changePage} value="signin">
				Login
			</button>
		</nav>
	);
}

export default Navbar;
