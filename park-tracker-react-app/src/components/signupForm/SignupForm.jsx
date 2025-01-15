import { useState } from "react";
import * as authService from "../../services/authService";
const SignUpForm = (props) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    location: "",
    travel_preferences: "",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newUserResponse = await authService.signup(formData);
      props.setUser(newUserResponse)
      console.log(props.user)
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <p>
          <label htmlFor="username">Username: </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
          />
        </p>
        <p>
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </p>
        <p>
          <label htmlFor="location">Location: </label>
          <input
            type="location"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
          />
        </p>
        <p>
          <label htmlFor="travel_preferences">Accommodation Preferences: </label>
          <input
            type="travel_preferences"
            id="travel_preferences"
            name="travel_preferences"
            value={formData.travel_preferences}
            onChange={handleInputChange}
          />
        </p>

        <div>
          <button>Sign Up</button>
        </div>
      </form>
    </>
  );
};

export default SignUpForm;
