import React from "react";

const Filter = ({ filterHandler, value }) => {
  return (
    <p>
      find countries <input value={value} onChange={filterHandler}></input>
    </p>
  );
};
export default Filter;
