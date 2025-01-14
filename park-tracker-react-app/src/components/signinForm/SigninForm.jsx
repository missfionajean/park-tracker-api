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
      <h2>Sign In</h2>
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

        <div>
          <button>Sign In</button>
        </div>
      </form>
    </>
  );
};

export default SignInForm;
