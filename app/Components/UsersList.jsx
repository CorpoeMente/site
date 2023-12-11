"use client";
import React, { useEffect, useState } from "react";
import { Table, TableRow } from ".";

const UsersList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      const res = await fetch("/api/users");
      const usersJson = await res.json();
      setUsers(usersJson);
      console.log(usersJson);
    };
    getUsers();
  }, []);

  return (
    <Table headers={["Nome", "Email", "Telefone"]}>
      {users &&
        users.map((user, index) => {
          return (
            <TableRow key={index}>
              <td className="px-4 py-2">{user.nome}</td>
              <td className="px-4 py-2">{user.email}</td>
              <td className="px-4 py-2">{user.telefone}</td>
            </TableRow>
          );
        })}
    </Table>
  );
};

export default UsersList;
