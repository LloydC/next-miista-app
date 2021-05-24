function Product(props){
    return (
        <div className="product"> 
            <img src={`https://${props.node.thumbnailImage.file.url}`} className='product-img' alt={props.node.name}/>
            <div className="product-description">
                <h4>{props.node.name}</h4>
                <span>{props.node.shopifyProductEu.variants.edges[0].node.price}</span>
            </div>
        </div>   
    );
}

export default Product;