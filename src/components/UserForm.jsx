import React, { useState } from "react";
import Header from "./Header";
import UserList from "./UserList";

const UserForm = () => {
  const usersInit = [
    {
      id: 1,
      name: "Eduardo",
      lastName: "Aguilar",
      isActive: false,
      img: "https://via.placeholder.com/64",
      email: "aheduardo5@gmail.com",
    },
    {
      id: 2,
      name: "Elioth",
      lastName: "Perker",
      isActive: false,
      img: "https://via.placeholder.com/64",
      email: "eliot@gmail.com",
    },
    {
      id: 3,
      name: "Paco",
      lastName: "Porter",
      isActive: false,
      img: "https://via.placeholder.com/64",
      email: "paco1@gmail.com",
    },
    {
      id: 5,
      name: "jsesus",
      lastName: "Porter",
      isActive: true,
      img: "https://via.placeholder.com/64",
      email: "paco2@gmail.com",
    },
  ];

  const formInit = {
    name: '',
    lastname: '',
    email: '',
    image: '',
    isActive: false
  };

  const [ users, setUsers ] = useState(usersInit);
  const [ showForm, setShowForm ] = useState(false); // estado para controlar cuando se muestra el formulario
  
  const [ formData, setFormData ] = useState(formInit);

  const updateHandler = (userId) => {
    console.log(`updateHandler userId: ${ userId }`);

    const user = users.find(user => user.id === userId); //
    console.log("constante user",user)
    if (!user) {
      alert('No se encontro el usuraio');
      return;
    }

    setFormData(
      {
      id: user.id,
      name: user.name,
      lastname: user.lastName,
      email: user.email,
      image: user.img,
      isActive: user.isActive
    }
    );

    setShowForm(true);
  };

  const deleteHandler = (userId) => {
    setUsers(users.filter((user) => user.id !== userId));
  };

  // toogle
  const showFormHandler = () => {
    if (!showForm) {
      setFormData({});
    }

    setShowForm(!showForm);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    // validar formulario
    let validForm = true;

    if (!e.target.name.value || !e.target.lastname.value || !e.target.email.value || !e.target.image.value) {
      validForm = false;
    }

    if (!validForm) {
      alert('Invalid Form');
      return;
    }

    console.log('id', formData.id);

    // validar que el usuario no existe
    if (users.filter(user => user.id === formData.id).length) {
      // alert('User already exits');
      // actualizar usuario
      
      const newUsersState = users.map(user => {
        if (user.id === formData.id) {
          return {
            id: formData.id,
            name: formData.name,
            lastName: formData.lastname,
            email: formData.email,
            img: formData.image,
            isActive: formData.isActive
          }
        }

        return user;
      });

      setUsers(newUsersState);
    } else {
      // alert('User not exists yet');
      // crear usuario

      const newUser = {
        id: crypto.randomUUID(),
        name: e.target.name.value,
        lastName: e.target.lastname.value,
        email: e.target.email.value,
        img: e.target.image.value,
        isActive: e.target.isActive.checked
      };
  
      setUsers([ ...users, newUser ]);
    }

    setFormData(formInit);
  }

  return (
    <div>
      <Header  users={users} showFormHandler={ showFormHandler } usersLength={ users.length } />

      { showForm &&
        <form onSubmit={ onSubmitHandler }>
          <div className="form-group">
            <label>Name</label>
            <input type="text" name="name" value={ formData.name } onChange={ (e) => setFormData({ ...formData, name: e.target.value }) } />
          </div>
          <div className="form-group">
            <label>Lastname</label>
            <input type="text" name="lastname" value={ formData.lastname } onChange={ (e) => setFormData({ ...formData, lastname: e.target.value }) } />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="text" name="email" value={ formData.email } onChange={ (e) => setFormData({ ...formData, email: e.target.value }) } />
          </div>
          <div className="form-group">
            <label>Image</label>
            <input type="text" name="image" value={ formData.image } onChange={ (e) => setFormData({ ...formData, image: e.target.value }) } />
          </div>
          <div className="form-group">
            <label><input type="checkbox" name="isActive" value={ formData.isActive } checked={ formData.isActive ? true : false } onChange={ (e) => setFormData({ ...formData, isActive: !formData.isActive }) } /> Activo</label>
          </div>
          <button type="submit">Enviar</button>
        </form>
      }

      <UserList
        users={users}
        deleteHandler={deleteHandler}
        updateHandler={updateHandler}
      />
    </div>
  );
};

export default UserForm;
