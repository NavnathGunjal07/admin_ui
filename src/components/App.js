import React, { useState, useEffect } from "react";
import Users from "./Users/Users";
import Pagination from "./Pagination/Pagination";

import axios from "axios";

const App = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage, setUsersPerPage] = useState(10);
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
        );
        setUsers(res.data);
        setLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchUsers();
  }, []);
  //search user and change result
  const searchUsers = (searchText) => {
    let searchResult = users.filter(
      (user) =>
        user.name.includes(searchText) ||
        user.email.includes(searchText) ||
        user.role.includes(searchText)
    );
    setUsers(searchResult);
  };
  //get current user
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  //delete user with id
  const deleteUser = (id) => {
    let afterDeleteUsers = users.filter((user) => user.id !== id);
    setUsers(afterDeleteUsers);
  };
  useEffect(() => {
    console.log("Rerender");
  }, [users]);
  //handle submit after editing form with
  const updateUser = (id, input) => {
    users.map((user) => {
      if (id === user.id) {
        user.name = input.name;
        user.email = input.email;
        user.role = input.role;
      }
    });
  };

  //change page
  const paginate = (pageNumber) => {
    if (currentPage !== 1 && pageNumber === -1) setCurrentPage(currentPage - 1);
    else if (pageNumber === -1) setCurrentPage(currentPage);
    else if (currentPage !== 5 && pageNumber === 6)
      setCurrentPage(currentPage + 1);
    else if (pageNumber === 6) setCurrentPage(currentPage);
    else setCurrentPage(pageNumber);
  };
  return (
    <div className="container">
      <center>
        <b>
          <h3 className="text-primary">Admin UI</h3>
        </b>
      </center>
      <input
        className="form-control"
        type="text"
        placeholder="Search"
        aria-label="Search"
        onChange={(e) => searchUsers(e.target.value)}
      ></input>

      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <Users
          users={currentUsers}
          onSelectdelete={deleteUser}
          updateUser={updateUser}
        />
      )}
      <Pagination
        usersPerPage={usersPerPage}
        totalUsers={users.length}
        paginate={paginate}
      />
    </div>
  );
};

export default App;
