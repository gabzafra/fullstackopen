import React from "react";

const PersonForm = ({
  nameChangeHandler,
  numberChangeHandler,
  name,
  number,
  submitHandler,
}) => {
  return (
    <form onSubmit={submitHandler}>
      <div>
        name: <input value={name} onChange={nameChangeHandler} />
      </div>
      <div>
        number: <input value={number} onChange={numberChangeHandler} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
