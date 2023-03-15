import React from "react";
import { v4 as uuidv4 } from 'uuid';

const Select = ({ values, onChange }) => {
  return (
    <div className="control">
      <select
        className="control-field filter-field form-control"
        onChange={onChange}
        defaultValue={values[0]}
      >
        {values.map((value) => (
          <option key={uuidv4()} value={value.toLowerCase()}>
            {value}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;