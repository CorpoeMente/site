"use client";
import React, { useEffect, useState } from "react";

const UsersList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      const res = await fetch("/api/users");
      const users = await res.json();
      setUsers(users);
    };
    getUsers();
  }, []);

  return users.map((user, index) => {
    return (
      <div
        className="flex flex-col items-center justify-center gap-4"
        key={index}
      >
        <div className="flex flex-row items-center justify-center gap-4">
          <div className="flex flex-col items-center justify-center gap-4">
            <h1 className="text-xl font-semibold">{user.fullName}</h1>
          </div>
          <div className="flex flex-col items-center justify-center gap-4">
            <h1 className="text-xl font-semibold">{user.email}</h1>
          </div>
        </div>
      </div>
    );
  });
};

export default UsersList;
