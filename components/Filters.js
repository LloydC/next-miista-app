// import the list of filters to be rendered through an appropriate component
// import the list of products using useState
// build one/several functions that will be handling the filtering  of products 
// import Select from 'react-select';
import Select from './Select';

const Filters = ({ filters, setFilters }) => {

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
            values={["Category", "Flats", "Mules","Sandals", "Outlet","Mid-Heels","E8 Flats", "E8 Mules","E8 Sandals", "New Arrivals"]}
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