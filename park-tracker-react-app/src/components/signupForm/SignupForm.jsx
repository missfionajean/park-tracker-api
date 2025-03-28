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
        await authService.signup(formData);
    //   props.setUser(newUserResponse)
        console.log(props.user)
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <h1 className="font-bold">Sign Up</h1>
      <form onSubmit={handleSubmit} className="signForm">
        
          <label htmlFor="username">Username: </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
          />
        
        
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
        
        
          <label htmlFor="location">Location: </label>
          <input
            type="location"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
          />
        
        
          <label htmlFor="travel_preferences">Accommodation Preferences: </label>
          <textarea
            type="travel_preferences"
            id="travel_preferences"
            name="travel_preferences"
            value={formData.travel_preferences}
            onChange={handleInputChange}
          />
        
        <div>
          <button>Sign Up</button>
        </div>
      </form>
    </>
  );
};

export default SignUpForm;
