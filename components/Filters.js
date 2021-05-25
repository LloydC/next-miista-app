// import the list of filters to be rendered through an appropriate component
// import the list of products using useState
// build one/several functions that will be handling the filtering  of products 
import { useCallback } from 'react';
// import Select from 'react-select';
import Select from './Select';

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

const Filters = ({ filters, setFilters }) => {

// Build a filter method.
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

  return (
    <div
      className="filters-container"
    >
        <h4>Filters</h4>
        <br/>
        <div style={{display: 'flex'}}> 

          <Select
            values={["Color", "White", "Brown", "Green"]}
            onChange={e => setFilters({ ...filters, color: e.target.value === 'color' ? '' : e.target.value })}
            // options={options}
          />

          <Select
            values={["Category", "Flats", "Mules","Sandals", "Outlet","Mid-Heels", "New Arrivals"]}
            onChange={e => setFilters({ ...filters, category: e.target.value === 'category' ? '' : e.target.value  })}
            // options={options}
          />

          <Select
            values={["Price", "0-100", "100-500","500-1000"]}
            onChange={e => setFilters({ ...filters, price: e.target.value === 'price' ? '' : e.target.value  })}
            // options={options}
          />

        </div>
    </div>
  );
  }
export default Filters;