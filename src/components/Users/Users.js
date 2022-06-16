import React, { useState } from "react";
import User from "../User/User";
import "./styles.css";

function Users({
  edit,
  users,
  onSelectdelete,
  onSubmit,
  updateUser
}) {
  const [name, setName] = useState(edit ? edit.value.name : "");
  const [email, setEmail] = useState(edit ? edit.value.email : "");
  const [role, setRole] = useState(edit ? edit.value.role : "");
  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({
      id: edit.value.id,
      value: {
        name: name === "" ? edit.value.name : name,
        email: email === "" ? edit.value.name : email,
        role: role === "" ? edit.value.name : role,
      },
    });
    setName("");
    setEmail("");
    setRole("");
  };

  return (
    <div>
      <ul className="list-group mb-4">
        {edit ? (
          <table>
            <tbody>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
              <tr>
                <td></td>
                <td>
                  <input
                    placeholder="Update user name"
                    value={name}
                    onChange={handleNameChange}
                    name="name"
                    className="user-input edit"
                  />
                </td>
                <td>
                  <input
                    placeholder="Update user email"
                    value={email}
                    onChange={handleEmailChange}
                    name="email"
                    className="user-input edit"
                  />
                </td>
                <td>
                  <input
                    placeholder="Update role"
                    value={role}
                    onChange={handleRoleChange}
                    name="text"
                    className="user-input edit"
                  />
                </td>
                <td>
                  <button onClick={handleSubmit} className="user-button edit">
                    Update User
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        ) : (
          <table>
            <tbody>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
              <User
                users={users}
                onSelectdelete={onSelectdelete}
                updateUser={updateUser}
              />
              <button
                type="button"
                onClick={() => alert("Not able to make this Functionality")}
                className="btn btn-danger"
              >
                Delete Selected
              </button>
            </tbody>
          </table>
        )}
      </ul>
    </div>
  );
}

export default Users;
