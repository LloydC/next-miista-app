import { useState, useEffect }  from 'react';
import Pagination from './Pagination';

import Product from '../components/Product';

function ProductList({ products }){
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(20);

    useEffect(()=>{

    },[])

        // Get current products
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);
    return (
       <>
          <h1 style={{marginLeft: '60px'}}>Product List</h1>
          <br/>
          <Pagination
            productsPerPage={productsPerPage}
            totalProducts={products.length}
            paginate={paginate}
            />

          <div className='products-container'>
            { currentProducts.map((product, i)=> 
                <Product {...product} key={i}/>)
            }
           </div>
        </>
    )
}

export default ProductList;