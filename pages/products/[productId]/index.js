// mydomain.com/products/addedPath
import { useRouter } from 'next/router';

function DetailPage() {
    const router = useRouter();

    return <h1>The Product {router.query.productId || ''} Detail Page</h1>
}

export default DetailPage; 