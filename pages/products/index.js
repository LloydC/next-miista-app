// mydomain.com/products
import { Fragment } from 'react';
import Link from 'next/link';

function ProductsPage() {
    return (
    <Fragment>
        <h1>The Products Page</h1>
        <ul>
            <li><Link href='/products/miista-shoes'>Miista shoes</Link></li>
            <li><Link href='/products/miista-hat'>Miista hat</Link></li>
        </ul>
    </Fragment>
    );
    
}

export default ProductsPage;