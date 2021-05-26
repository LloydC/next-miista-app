import { useState, useEffect }  from 'react';
import Pagination from './Pagination';
import Filters from './Filters';
import Product from './Product';

function ProductList({ products }){    
    const [productsList, setProductsList] = useState(products);
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(20);
    const [filters, setFilters] = useState({ category: "", color: "", price: ""});

    // Get current products
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = productsList.slice(indexOfFirstProduct, indexOfLastProduct);
   
    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);
    
    const sortByColor = (selectedColor, productsFiltered) => {
        console.log('products length', productsFiltered.length)
        if(selectedColor !== ""){
           const sorted = productsFiltered.filter(product => product.node?.colorFamily);
           const matchingProducts = sorted.filter(product => product.node.colorFamily[0].name.toLowerCase() === selectedColor.toLowerCase());
           console.log('matchingProducts ', matchingProducts)
           return setProductsList(matchingProducts);
        }
        //  else {
        //      return setProductsList(products);
        //  }
    }

    const sortByCategory = (selectedCategory, productsFiltered) => { 
        console.log('products length', productsFiltered.length)
        if(selectedCategory !== ""){
            const getProductsWithCategories = productsFiltered.filter(product => product.node.categoryTags !== null);
            console.log('getProductsWithCategories ', getProductsWithCategories);
            const matchingProducts = getProductsWithCategories.filter(product => product.node.categoryTags.find(category => category.toLowerCase() === selectedCategory.toLowerCase()));
            console.log('matchingProducts ', matchingProducts)
            return setProductsList(matchingProducts);
        }
        //  else {
        //      return setProductsList(products);
        //  }
    } 

    const sortByPrice = (priceRange, productsFiltered) => {
        console.log('products length', productsFiltered.length)
        if(priceRange === "0-100"){
           const sorted = productsFiltered.filter(product => Number(product.node.shopifyProductEu.variants.edges[0].node.price < 100));
           console.log('price sort ', sorted);
           return setProductsList(sorted);
        }
        else if(priceRange === "100-500"){
            const sorted = productsFiltered.filter(product => Number(product.node.shopifyProductEu.variants.edges[0].node.price) < 500 && Number(product.node.shopifyProductEu.variants.edges[0].node.price) > 100);
            console.log('price sort ', sorted);
            return setProductsList(sorted);
         }
        else if(priceRange === "500-1000"){
            const sorted = productsFiltered.filter(product => Number(product.node.shopifyProductEu.variants.edges[0].node.price) > 500 && Number(product.node.shopifyProductEu.variants.edges[0].node.price) < 1000);
            console.log('price sort ', sorted);
            return setProductsList(sorted);
         }
        //  else {
        //      return setProductsList(products);
        //  }
    }

    const sortFilters =  (category, color, price ) => {
        if(price === "" && color === "" && category === ""){
            console.log('Fire 1')
            setProductsList(products)
        }
        else if(category !== "" && price !== "" && color !== ""){
            console.log('Fire 2')
            // setProductsList(products)
            sortByCategory(category, products)
            sortByColor(color, productsList)
            sortByPrice(price, productsList)
        }
        else if(color !== "" && price === "" && category === ""){
            console.log('Fire 7')
            sortByColor(color, products)
        }
        else if(category !== "" && price === "" && color === ""){
            console.log('Fire 8')
            sortByCategory(category, products)
        }
        else if(price !== "" && color === "" && category === ""){
            console.log('Fire 3')
            sortByPrice(price, products)
        }
        else if(price !== "" && color !== "" && category === ""){
            console.log('Fire 4')
            // setProductsList(products)
            sortByColor(color, productsList)
            sortByPrice(price, products)
            
        }
        else if(category !== "" && price === "" && color !== ""){
            console.log('Fire 6')
            // setProductsList(products)
            sortByCategory(category, products)
            sortByColor(color, productsList)
        } 
        else if(price !== "" && color === "" && category !== ""){
            console.log('Fire 5')
            // setProductsList(products)
            sortByPrice(price, products)
            sortByCategory(category, productsList)
        }
         
    }

    useEffect( async ()=> {
        const { category, color, price } = filters;
        await sortFilters(category, color, price);
        
    },[filters.category, filters.color, filters.price])

 

    return (
       <>
          <h1 style={{marginLeft: '60px'}}>Product List</h1>
          <br/>
          <div>
            <Filters filters={filters} setFilters={setFilters}/>
            <Pagination
                productsPerPage={productsPerPage}
                totalProducts={products.length}
                paginate={paginate}
                />
          </div>
          
          <div className='products-container'>
            { currentProducts.map((product, i)=> 
                <Product {...product} key={i}/>)
            }
            {currentProducts.length === 0 && <span style={{marginLeft: '60px'}}>There are no products that match your preferences</span>}
           </div>
        </>
    )
}

export default ProductList;