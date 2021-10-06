import './Item.css';
import { Link } from 'react-router-dom';

const Item = ({imageUrl, name, price, description, productId}) => {
    return (
        <div className = "item">
            <img 
                src={imageUrl}
                alt = {name}
                />

            <div className = "item_info">
                <p className = "info_name">{name}</p>
                <p className = "info_description">{description.substring(0, 100)}...</p>
                <p className = "info_price">${price}</p>

                <Link to = {`/product/${productId}`} className = "info_button">View</Link>
            </div>
        </div>
    )
}

export default Item;
