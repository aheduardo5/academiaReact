import React from "react";

const Header = ({ showFormHandler, usersLength, users }) => {

  return (
    <div>
      <h1>
        user manager({usersLength})
        <span>
          <button onClick={ () => showFormHandler() }>show form</button>
        </span>
      </h1>
    </div>
  );
};

export default Header;
