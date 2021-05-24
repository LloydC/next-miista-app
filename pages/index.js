// mydomain.com
import ProductList from '../components/ProductList'
function HomePage({products}) {
    return <ProductList products={products}/>
}

export async function getStaticProps() {
    const products = await fetch(`http://localhost:3000/api/products`).then(res => res.json());
   
    return {
        props: {
            products
        }
    };
}

export default HomePage;