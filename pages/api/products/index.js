import products from '../../../data/miista-export.json';

export default function handler(req, res) {
    res.status(200).json(products.data.allContentfulProductPage.edges);
}