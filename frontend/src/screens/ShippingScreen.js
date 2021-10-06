import './ShippingScreen.css'

//Components
import ShippingForm from './../components/ShippingForm'

const ShippingScreen = () => {
    return <div className = "shippingscreen">
        <div className = "shippingscreen_left">

            <ShippingForm/>
        </div>

        <div className = "cartscreen_right">
            <div className = "cartscreen_info">
                <p>Subtotal (0) items</p>
                <p>$499.99</p>
            </div>
            <div>
                <button>Proceed to payment</button>
            </div>
        </div>    
    </div>

}

export default ShippingScreen
