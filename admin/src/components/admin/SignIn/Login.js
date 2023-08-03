import React, { useState } from "react";
import { Link, useNavigate, Redirect } from "react-router-dom";
import AuthUser from "./AuthUser";
import "./Login.css";
// import "bootstrap/dist/css/bootstrap.min.css"
export default function Login() {
  // const navigate = useNavigate();
  // const history = useHistory();
  const navigate = useNavigate();
  const { http, setToken, getUserRole } = AuthUser();
  const [username, setUSername] = useState();
  const [password, SetPassword] = useState();

  const login = () => {
    http
      .post("/token", { username: username, password: password })
      .then((res) => {
        console.log(res.data);
        setToken(res.data.token, res.data.userDetails);
        // <Redirect to="/admin-user" />
        navigate("/admin/users");
        getUserRole();
      });
  };

  return (
    <>
      <img
        className="logo"
        src="data:image/png;base64,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"
        alt=""
      />

      <div className="form-container">
        <form className="auth-form">
          <div className="auth-form-content">
            <h3 className="auth-form-title">Sign In</h3>
            <div className="form-group mt-3">
              <label>Email address</label>
              <input
                type="email"
                className="form-control mt-1"
                placeholder="Enter email"
                onChange={(e) => setUSername(e.target.value)}
              />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control mt-1"
                placeholder="Enter password"
                onChange={(e) => SetPassword(e.target.value)}
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-primary" onClick={login}>
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
