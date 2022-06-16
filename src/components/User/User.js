import React, { useState } from "react";
import Users from "../Users/Users";

function User({ users, onSelectdelete, updateUser }) {
  const [edit, setEdit] = useState({
    id: null,
    value: {
      name: "",
      email: "",
      role: "",
    },
  });
  let addedBackgroundId = [];
  //submit for update
  const submitUpdate = (value) => {
    updateUser(edit.id, value.value);
    setEdit({
      id: null,
      value: {},
    });
  };

  const addBgColor = (id) => {
    document.getElementById(`select-checkbox${id}`).style.backgroundColor =
      "grey";
    addedBackgroundId.push(id);
  };
  const removeBgColor = (id) => {
    document.getElementById(`select-checkbox${id}`).style.backgroundColor =
      "white";
    addedBackgroundId = addedBackgroundId.filter((e) => e !== id);
  };
  if (edit.id) {
    return <Users edit={edit} onSubmit={submitUpdate} />;
  }
  return users.map((user) => (
    <tr key={user.id} id={`select-checkbox${user.id}`}>
      <td>
        <input
          type="checkbox"
          onChange={() => {
            addedBackgroundId.includes(user.id)
              ? removeBgColor(user.id)
              : addBgColor(user.id);
          }}
          name="checkbox"
        />
      </td>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>{user.role}</td>
      <td>
        <img
          height="8%"
          width="8%"
          alt="edit"
          onClick={() =>
            setEdit({
              id: user.id,
              value: { name: user.name, email: user.email, role: user.role },
            })
          }
          src="https://img.icons8.com/external-kiranshastry-lineal-color-kiranshastry/64/undefined/external-edit-interface-kiranshastry-lineal-color-kiranshastry.png"
        />{" "}
        &nbsp;&nbsp;
        <img
          onClick={() => onSelectdelete(user.id)}
          alt="delete"
          height="8%"
          width="8%"
          src="https://img.icons8.com/plasticine/100/undefined/filled-trash.png"
        />{" "}
      </td>
    </tr>
  ));
}

export default User;
