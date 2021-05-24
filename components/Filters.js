// import the list of filters to be rendered through an appropriate component
// import the list of products using useState
// build one/several functions that will be handling the filtering  of products 
import {useState} from 'react';
import Select from './Select';
import { useCallback } from "react";

// Return the filter method.
function useFilter(value, search) {
  return useCallback(
    function(data) {
      var isSearchMatch = !search
        ? true
        : data.title.toLowerCase().indexOf(search) > -1;
      var isFilterMatch = value === "all" ? true : data.color === value;
      return isSearchMatch && isFilterMatch;
    },
    [value, search]
  );
}

const Filters = () => {
//   const handleLocationChange = (value) => {
//     if(locations.some(el => el.id === value.id)) return
//     setLocations([...locations, value]);
//   };

//   const handleSizeChange = (value) => {
//     if(sizes.some(el => el.id === value.id)) return
//     setSizes([...sizes, value]);
//   };

//   const handleChange = (item) => {
//     // console.log("ITEM", item.target.value);
//     item.target?.value?.location && handleLocationChange(item.target.value)
//     item.target?.value?.employees && handleSizeChange(item.target.value)
//   };
  const [filter, setFilter] = useState({
    search: "",
    value: "all"
  });

// Filter method.
  const filterFunction = useFilter(filter.value, filter.search);

  const renderDropDown = (data, type) => 
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">{type}</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          label={type}
          value={""}
          onChange={handleChange}
        >
          {data.map(({ obj }, index) => {
            return (
              <MenuItem key={index} value={obj}>
                {obj.employees &&
                  `${Object.values(obj.employees)[0]} 
                    ${Object.values(obj.employees)[1] ? 
                      `- ${Object.values(obj.employees)[1]}` : ""}`
                  }
                {obj.location && obj.location.city}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>

  return (
    <div
      className="filters-container"
    >
        <h4>Filters</h4>
        <br/>
        <div style={{display: 'flex'}}> 
          <Select
            values={["All", "Red", "Blue", "Green"]}
            onChange={e => setFilter({ ...filter, value: e.target.value })}
          />

          <Select
            values={["All", "Sandals", "Mid-Heels", "New Arrivals"]}
            onChange={e => setFilter({ ...filter, value: e.target.value })}
          />
        </div>
    </div>
  );
  }
export default Filters;
