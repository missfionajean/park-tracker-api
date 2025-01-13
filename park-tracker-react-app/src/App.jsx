import SignUpForm from "./components/signupForm/SignupForm";
import SignInForm from "./components/signinForm/SigninForm";
function App() {
  return (
    <>
      <h1>Trip Tracker</h1>
      <h2>National Parks</h2>
      <SignUpForm />
      <p>---------------------------------------------------</p>
      <SignInForm />
    </>
  );
}

export default App;
