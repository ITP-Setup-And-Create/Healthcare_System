import './ShippingForm.css'

const ShippingForm = () => {
    return <div className = "shippingform">
        <form>
            <div className = "container">
                
                <h2>Delivery Details</h2>

                <div className = "formfield">
                    <label htmlFor = "email">
                        <i className = "fas fa-envelope"></i>
                        Email: <input type = "text" value = "" placeholder = "Enter your email address. Eg:example@email.com"/>
                    </label>
                </div>

                <div className = "formfield">
                    <label htmlFor = "fname">
                        <i className = "fas fa-user"></i>
                        First Name: <input type = "text" value = "" placeholder = "Enter your first name."/>
                    </label>
                </div>

                <div className = "formfield">
                    <label htmlFor = "lname">
                        <i className = "fas fa-user"></i>
                        Last Name: <input type = "text" value = "" placeholder  ="Enter your last name."/>
                    </label>
                </div>

                <div className = "formfield">
                    <label htmlFor = "address">
                    <i className = "fas fa-address-card"></i>
                        Address: <input type = "text" value = "" placeholder = "Enter your address here"/>
                    </label>
                </div>

                <div className = "formfield">
                    <label htmlFor = "city">
                        <i className = "fas fa-archway"></i>
                        City: <input type = "text" value = ""/>
                    </label>
                </div>

                <div className = "formfield">
                    <label htmlFor = "country">
                        <i className = "fas fa-globe-americas"></i>
                        Country: <input type = "text" value = ""/>
                    </label>
                </div>

                <div className = "formfield">
                    <label htmlFor = "postcode">
                        Post Code: <input type = "text" value = ""/>
                    </label>
                </div>
            </div>
        </form>
        
    </div>
}

export default ShippingForm
