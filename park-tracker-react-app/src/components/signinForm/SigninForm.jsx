import { useState } from "react";
import * as authService from "../../services/authService";
const SignInForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await authService.signin(formData);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <h1>Sign In</h1>
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

        <div>
          <button>Sign In</button>
        </div>
      </form>
    </>
  );
};

export default SignInForm;
