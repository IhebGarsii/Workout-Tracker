import { useState } from "react";
import { useSignup } from "../hooks/useSignup";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signupPost, error, isLoading } = useSignup();
  console.log("fffffff");

  const handelSubmit = async (e) => {
    e.preventDefault();
    await signupPost(email, password);
  };

  return (
    <form onSubmit={handelSubmit} className="signup">
      <div className="signup-container">
        <h3>Sign up</h3>
        <div className="email-container">
          <label>Email</label>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div className="password-container">
          <label>Password</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <button>Sign up</button>
      </div>
    </form>
  );
};

export default Signup;
