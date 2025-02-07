// import "/Users/macbook/code/ga/projects/park-tracker-api/park-tracker-react-app/App.css"

import { useState } from "react";
import { Squash as Hamburger } from "hamburger-react";

function Navbar({ setPage }) {

    // state variable for open/close hamburger
	const [isOpen, setOpen] = useState(false);

    // passes button click value for changePage function
	const handleClick = (page) => {
		setPage(page);
		setOpen(false);
	};

	return (
        <nav>
            <Hamburger toggled={isOpen} size={20} toggle={setOpen}/>

            {isOpen ? <div className="hamListDiv">

            <p onClick={() => handleClick("home")} className="navButton">
				Home
			</p>

			<p onClick={() => handleClick("userlist")} className="navButton">
				Users
			</p>

			<p onClick={() => handleClick("editprofile")} className="navButton">
				Edit Profile
			</p>

			<p onClick={() => handleClick("parklist")} className="navButton">
				Parks
			</p>

			<p onClick={() => handleClick("signup")} className="navButton">
				Sign Up
			</p>

			<p onClick={() => handleClick("signin")} className="navButton">
				Login
			</p>

            </div> : ''}
        </nav>
	);
}

export default Navbar;
