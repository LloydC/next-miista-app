import { useState }  from 'react';
import Pagination from './Pagination';
import products from '../miista-export.json';
import Product from '../components/Product';

function ProductList(){
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(20);

        // Get current products
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.data.allContentfulProductPage.edges.slice(indexOfFirstProduct, indexOfLastProduct);

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);
    return (
        <>
          <h1>Product List</h1>
          <br/>
          { currentProducts.map((product, i)=> 
            <Product {...product} key={i}/>)
          }
          <Pagination
            productsPerPage={productsPerPage}
            totalProducts={products.data.allContentfulProductPage.edges.length}
            paginate={paginate}
        />
        </>
    )
}

export default ProductList;