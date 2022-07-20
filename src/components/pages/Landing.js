import RegisterForm from "../forms/RegisterForm";
import LoginForm from "../forms/LoginForm";
import { useState } from "react";
import moment from 'moment'
const Landing = (props) => {
  const [hasAccount, setHasAccount] = useState(false);
  const { setUser } = props
  return (
    <div>
      <h3>It's {moment().format('LT')}, Do you know where your thoughts are?</h3>
      {hasAccount === false ? (
        <div>
          <RegisterForm setUser={setUser} />
          <p>
            Already have an account?{" "}
            <span className="btn btn-primary" onClick={() => setHasAccount(true)}>Login</span>{" "}
          </p>
        </div>
      ) : (
        <LoginForm setUser={setUser} />
      )}
    </div>
  );
};

export default Landing;