import { useState, useEffect }  from 'react';
import Pagination from './Pagination';
import Filters from './Filters';
import Product from './Product';

function ProductList({ products }){    
    const [productsList, setProductsList] = useState(products);
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(20);
    const [filters, setFilters] = useState({ category: "", color: "", price: ""});

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = productsList.slice(indexOfFirstProduct, indexOfLastProduct);
   
    const paginate = pageNumber => setCurrentPage(pageNumber);
    
    const sortByColor = (selectedColor, productsFiltered) => {
           const sorted = productsFiltered.filter(product => product.node?.colorFamily);
           const matchingProducts = sorted.filter(product => product.node.colorFamily[0].name.toLowerCase() === selectedColor.toLowerCase());
           return matchingProducts;
    }

    const sortByCategory = (selectedCategory, productsFiltered) => { 
            const getProductsWithCategories = productsFiltered.filter(product => product.node.categoryTags !== null);
            const matchingProducts = getProductsWithCategories.filter(product => product.node.categoryTags.find(category => category.toLowerCase() === selectedCategory.toLowerCase()));
            return matchingProducts;
    } 

    const sortByPrice = (priceRange, productsFiltered) => {
        if(priceRange === "0-100"){
           const sortedList = productsFiltered.filter(product => Number(product.node.shopifyProductEu.variants.edges[0].node.price < 100));
           return sortedList;
        }
        else if(priceRange === "100-500"){
            const sortedList = productsFiltered.filter(product => Number(product.node.shopifyProductEu.variants.edges[0].node.price) < 500 && Number(product.node.shopifyProductEu.variants.edges[0].node.price) > 100);
            return sortedList;
         }
        else if(priceRange === "500-1000"){
            const sortedList = productsFiltered.filter(product => Number(product.node.shopifyProductEu.variants.edges[0].node.price) > 500 && Number(product.node.shopifyProductEu.variants.edges[0].node.price) < 1000);
            return sortedList;
         }
    }

    const sortFilters =  (category, color, price ) => {
        if(price === "" && color === "" && category === ""){
            setProductsList(products)
        }
        else if(category !== "" && price !== "" && color !== ""){
            const catSort = sortByCategory(category, products)
            const colorSort = sortByColor(color, catSort)
            const priceSort = sortByPrice(price, colorSort)
            setProductsList(priceSort)
        }
        else if(color !== "" && price === "" && category === ""){
            const colorSort = sortByColor(color, products)
            setProductsList(colorSort)
        }
        else if(category !== "" && price === "" && color === ""){
            const catSort = sortByCategory(category, products)
            setProductsList(catSort);
        }
        else if(price !== "" && color === "" && category === ""){
            const priceSort = sortByPrice(price, products)
            setProductsList(priceSort)
        }
        else if(price !== "" && color !== "" && category === ""){
            const colorSort = sortByColor(color, products)
            const priceSort = sortByPrice(price, colorSort)
            setProductsList(priceSort)  
        }
        else if(category !== "" && price === "" && color !== ""){
            const catSort = sortByCategory(category, products)
            const colorSort = sortByColor(color, catSort)
            setProductsList(colorSort)
        } 
        else if(price !== "" && color === "" && category !== ""){
            const priceSort = sortByPrice(price, products)
            const catSort = sortByCategory(category, priceSort)
            setProductsList(catSort)
        }   
    }

    useEffect( async ()=> {
        const { category, color, price } = filters;
        await sortFilters(category, color, price);
    },[filters.category, filters.color, filters.price])

    return (
       <>
          <h1 style={{textAlign: 'center'}}>Product List</h1>

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