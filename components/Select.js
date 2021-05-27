import React from "react";

// Select component.
const Select = ({ values, onChange }) => {
  return (
    <div className="control">
      <select
        className="control-field filter-field form-control"
        onChange={onChange}
        defaultValue={values[0]}
      >
        {values.map((value, i) => (
          <option key={i} value={value.toLowerCase()}>
            {value}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;