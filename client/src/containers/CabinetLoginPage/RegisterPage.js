import React, { useState } from "react";

const RegisterPage = ({ handleSubmit, handleClickGoogle }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  return (
    <form onSubmit={(e) => handleSubmit(e, username, email, password)}>
      <h1>Зарегистрироваться</h1>
      <div className="form_pair">
        <label>Username</label>
        <input
          name="username"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      <div className="form_pair">
        <label>Email</label>
        <input
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="form_pair">
        <label>Password</label>
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button className="" onClick={handleClickGoogle}>with google</button>

      <input className="submit_button" type="submit" />
    </form>
  );
};
export default RegisterPage;
