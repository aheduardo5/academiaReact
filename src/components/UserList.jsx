import React from "react";
import User from "./User"

const UserList = ({users, deleteHandler, updateHandler}) => {
  return (
    <div className="UserList">
      <User users={users} updateH={updateHandler} deleteH={deleteHandler} />
    </div>
  );
};

export default UserList;
