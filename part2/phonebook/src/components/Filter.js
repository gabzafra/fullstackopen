import React from "react";

const Filter = ({ filterHandler, value }) => {
  return (
    <p>
      filter show with <input value={value} onChange={filterHandler}></input>
    </p>
  );
};
export default Filter;
