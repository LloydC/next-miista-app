import { useState, useEffect }  from 'react';
import { useQuery } from "react-query";
import Pagination from './Pagination';
import Filters from './Filters';
import Product from './Product';

function ProductList({ products }){    
    const [productsList, setProductsList] = useState(products);
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(20);
    const [filters, setFilters] = useState({ category: "", color: "", price: ""});
    
    const sortByColor = (productsFiltered) => {
        const selectedColor = filters.color;

        if(selectedColor !== ""){
           const sorted = productsFiltered.filter(product => product.node?.colorFamily);
           const secondSort = sorted.filter(product => product.node.colorFamily[0].name.toLowerCase() === selectedColor.toLowerCase());
           return setProductsList(secondSort);
        }
         else {
             return setProductsList(products);
         }
    }

    const sortByCategory = (productsFiltered) => { 
        const selectedCategory = filters.category;

        if(selectedCategory !== ""){
            const getProductsWithCategories = productsFiltered.filter(product => product.node.categoryTags);
            const matchingProducts = getProductsWithCategories.filter(product => product.node.categoryTags.find(category => category.toLowerCase() === selectedCategory.toLowerCase()));
            return setProductsList(matchingProducts);
        }
         else {
             return setProductsList(products);
         }
    } 

    const sortByPrice = (productsFiltered) => {
        const priceRange = filters.price;

        if(priceRange === "0-100"){
           const sorted = productsFiltered.filter(product => Number(product.node.shopifyProductEu.variants.edges[0].node.price < 100));
           return setProductsList(sorted);
        }
        else if(priceRange === "100-500"){
            const sorted = productsFiltered.filter(product => Number(product.node.shopifyProductEu.variants.edges[0].node.price) < 500 && Number(product.node.shopifyProductEu.variants.edges[0].node.price) > 100);
            return setProductsList(sorted);
         }
         else if(priceRange === "500-1000"){
            const sorted = productsFiltered.filter(product => Number(product.node.shopifyProductEu.variants.edges[0].node.price) > 500 && Number(product.node.shopifyProductEu.variants.edges[0].node.price) < 1000);
            return setProductsList(sorted);
         }
         else {
             return setProductsList(products);
         }
    }

    const generalSort = (category, color, price ) => {
        if(price === "" && color === "" && category === ""){
            setProductsList(products)
        }
        else if(price !== "" && color === "" && category === ""){
            sortByPrice(products)
        }
        else if(color !== "" && price === "" && category === ""){
            sortByColor(products)
        }
        else if(category !== "" && price === "" && color === ""){
            sortByCategory(products)
        }
    }

    useEffect(()=>{
        const { category, color, price } = filters;

        generalSort(category, color, price)
        
    },[filters.category, filters.color, filters.price])

    // Get current products
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = productsList.slice(indexOfFirstProduct, indexOfLastProduct);

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    // const {data, isLoading, error} = useQuery('products', async ()=> {
    //     return await fetch(`http://localhost:3000/api/products`).then(res => res.json());
    // })

    // if(isLoading) return 'Loading...'
    // if(error) return error.message

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
           </div>
        </>
    )
}

export default ProductList;