// mydomain.com
import ProductList from '../components/ProductList';
import { useQuery } from "react-query";

 function HomePage() {
    const {data, isLoading, error} = useQuery('products', async () => {
        return await fetch(`http://localhost:3000/api/products`).then(res => res.json());
    })

    if(isLoading) return 'Loading...'
    if(error) return error.message

    return <ProductList products={data}/>
}

// export async function getStaticProps() {
//     const products = await fetch(`http://localhost:3000/api/products`).then(res => res.json());
//     const categories = products.map(product => {return {category: product.node.categoryTags}});
   
//     return {
//         props: {
//             products,
//             categories
//         }
//     };
// }

export default HomePage;