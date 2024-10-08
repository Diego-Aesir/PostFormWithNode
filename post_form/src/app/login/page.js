"use client";
import React, { useState, useEffect } from "react";

export default function Login() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await fetch("http://localhost:5000/login");

        if (!response.ok) {
          throw new Error("Error while getting user information");
        }

        const result = await response.json();
        setUsers(result);
      } catch (error) {
        setError(error.message);
      }
    };

    getUsers();
  }, []);

  return (
    <>
      {error && <h1>{error}</h1>}
      {users.map((user, index) => (
        <div key={index}>
          <h2>User Name: {user.userName}</h2>
          <h2>Password: {user.userPassword}</h2>
        </div>
      ))}
    </>
  );
}
