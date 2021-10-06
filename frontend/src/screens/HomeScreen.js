//Screens
import './HomeScreen.css';

//Components
import Item from '../components/Item';

//Actions
import { getProducts as listProducts } from '../redux/actions/productActions'

import { useEffect } from 'react';
import { useSelector, useDispatch} from 'react-redux';

const HomeScreen = () =>{

    const dispatch = useDispatch();

    const getProducts = useSelector(state => state.getProducts);
    const { products, loading, error} = getProducts;

    useEffect(() => {
        dispatch(listProducts())
    }, [dispatch]);

    return (<div className = "homescreen">
            <h2 className = "homescreen_title">Popular Medicines</h2>

            <div className = "homescreen_items">
                    {loading ? (
                        <h2>Loading...</h2>
                    ) : error ? (
                        <h2>{error}</h2>
                    ) : (
                        products.map((product) => <Item 
                        key = {product._id} 
                        productId = {product._id}
                        name = {product.name}
                        price = {product.price}
                        description = {product.description}
                        imageUrl = {product.imageUrl}
                        />)
                    )}  
            </div>
        </div>
    );
};

export default HomeScreen;