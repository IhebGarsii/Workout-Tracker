import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useLogin();
  const handelSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <form onSubmit={handelSubmit} className="login">
      <div className="login-container">
        <h3>login</h3>
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
        <button disabled={isLoading}>Login</button>
        {error && <div className="error">{error}</div>}
      </div>
    </form>
  );
};

export default Login;
