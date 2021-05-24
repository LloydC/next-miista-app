// import the list of filters to be rendered through an appropriate component
// import the list of products using useState
// build one/several functions that will be handling the filtering  of products 

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
        <h6>Filters</h6>
      {/* {renderDropDown(locationsData, "Location")} */}
    </div>
  );
  }
export default Filters;
