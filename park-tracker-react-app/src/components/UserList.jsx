import { useEffect, useState } from "react";

function UserList({ setChosenUser, setPage }) {
	// state variable updated on page load
	const [userList, setUserList] = useState([]);
	// useEffect function grabs info on page load
	useEffect(() => {
        const getAllUsers = async () => {
            try {
                const res = await fetch("http://localhost:8000/api/user");
                let JSONdata = await res.json();
                setUserList(JSONdata);
            } catch (err) {
                console.log(err);
            }
        };
        getAllUsers();
    }, []);

    // function to update state variables to display UserShow
    const routeUserShow = (id) => {
        setChosenUser(id)
        setPage('usershow')        
    }

	return (
		<>
            <ul className="userShowList">
            {userList.map((user, index) => (
                <li key={index} onClick={() => routeUserShow(user.id)}>
                    {user.username}
                </li>
            ))}
            </ul>
		</>
	);
}

export default UserList;
