import Select from './Select';

const Filters = ({ filters, setFilters }) => {

  return (
    <div
      className="filters-container"
    >
        <div style={{display: 'flex'}}> 

          <Select
            values={["Color", "White", "Brown", "Green"]}
            onChange={e => setFilters({ ...filters, color: e.target.value === 'color' ? '' : e.target.value })}
          />

          <Select
            values={["Category", "Flats", "Mules","Sandals", "Outlet","Mid-Heels","E8 Flats", "E8 Mules","E8 Sandals", "New Arrivals"]}
            onChange={e => setFilters({ ...filters, category: e.target.value === 'category' ? '' : e.target.value  })}
          />

          <Select
            values={["Price", "0-100", "100-500","500-1000"]}
            onChange={e => setFilters({ ...filters, price: e.target.value === 'price' ? '' : e.target.value  })}
          />

        </div>
    </div>
  );
  }
export default Filters;