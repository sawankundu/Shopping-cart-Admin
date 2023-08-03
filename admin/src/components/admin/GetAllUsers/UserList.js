import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link , Navigate } from 'react-router-dom';
import "./UserList.css";
import AuthUser from "../SignIn/AuthUser";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const { isLoggedIn, doLogout, getUser, getToken } = AuthUser();
  useEffect(() => {
    // Set the headers with the authentication token
    const headers = {
      Authorization: `Bearer ${getToken()}`,
    };

    // Fetch user data from the backend API with the authentication token
    axios
      .get("http://localhost:9003/admin/api/users", { headers })
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  if (isLoggedIn()) {
  return (
    <div className="user-list-container">
      <h2 className="user-list-title">User List</h2>
      {users.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <ul className="user-list">
          {users.map((user) => (
            <li key={user.id} className="user-list-item">
              <p className="user-username">Full Name: {user.fullName}</p>
              <p className="user-username">Username: {user.username}</p>
              <p className="user-email">Email: {user.email}</p>
              <p className="user-email">Phone: {user.phone}</p>
              <p className="user-status">
                {/* Status: {user.isActive ? "Active" : "Inactive"} */}
                Status: Active
              </p>
              {/* Add other user details here */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}else{
  return (
    <>
      <Navigate to="/login" />
    </>
  );
}
}
export default UserList;
