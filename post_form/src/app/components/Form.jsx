"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function Form() {
  const [user, setUser] = useState({
    userName: "",
    userPassword: "",
    userConfirmPassword: "",
  });
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (user.userPassword !== user.userConfirmPassword) {
      window.alert("Passwords must be equal!");
      return;
    }

    const response = await fetch("http://localhost:5000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      window.alert(`Error on registering: ${errorMessage}`);
      return;
    }

    const result = await response.json();
    if (result) {
      router.push("./login");
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setUser((usr) => ({ ...usr, [id]: value }));
  };

  return (
    <>
      <form id="userRegister" autoComplete="on" onSubmit={handleSubmit}>
        <label htmlFor="userName">User Name: </label>
        <input
          id="userName"
          type="text"
          autoFocus
          required
          value={user.userName}
          onChange={handleChange}
        />

        <label htmlFor="userPassword"> Password: </label>
        <input
          id="userPassword"
          type="password"
          required
          value={user.userPassword}
          onChange={handleChange}
        />

        <label htmlFor="confirmPassword"> Confirm password: </label>
        <input
          id="userConfirmPassword"
          type="password"
          required
          value={user.userConfirmPassword}
          onChange={handleChange}
        />

        <button id="submit" type="submit">
          Submit
        </button>
      </form>
    </>
  );
}
