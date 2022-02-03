import React from "react";

const User = ({users, updateH, deleteH}) => {
  return (
    <>
      <div className="user-content">
        {users.map((user) => (
          <div key={user.id} className="user">
            <img src={user.img} alt="" />
            <p>{user.name + " " + user.lastName}</p>
            <button>{user.isActive === true ? "active" : "inactive"}</button>
            <p className="email">{user.email}</p>
            <button style={{ backgroundColor: 'green' }} onClick={() => updateH(user.id)}>Editar</button>
            <button onClick={() => deleteH(user.id)}>Eliminar</button>
          </div>
        ))}
      </div>
    </>
  );
};

export default User;
