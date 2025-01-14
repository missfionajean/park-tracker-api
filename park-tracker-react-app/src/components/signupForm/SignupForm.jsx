import { useState } from "react";
import * as authService from "../../services/authService";
const SignUpForm = () => {
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
      await authService.signup(formData);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <p>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
          />
        </p>
        <p>
          <label htmlFor="password">password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </p>
        <p>
          <label htmlFor="location">Location</label>
          <input
            type="location"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
          />
        </p>
        <p>
          <label htmlFor="travel_preferences">Travel Preferences</label>
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
