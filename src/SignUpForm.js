import React from "react";

export default function SignUpForm(props) {
  return (
    <div>
      <p>Sign Up</p>
      <form onSubmit={props.handleSubmit}>
        <label>
          Username:{" "}
          <input
            id="username"
            type="text"
            required
            onChange={props.handleChange}
          ></input>
        </label>
        <br />
        <label>
          Password:{" "}
          <input
            id="password"
            type="password"
            required
            onChange={props.handleChange}
          ></input>
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
