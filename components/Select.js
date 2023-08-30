import { v4 as uuidv4 } from 'uuid';

const Select = ({ values, onChange, currentValue, name }) => {
  return (
    <div className="control">
      <select
        className="control-field filter-field form-control"
        onChange={onChange}
        value={currentValue}
      >
        <option value="">{`Select ${name}`}</option>
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