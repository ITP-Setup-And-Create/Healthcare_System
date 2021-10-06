import './App.css';
import {useState} from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'; 


//Screens
import HomeScreen from './screens/HomeScreen';
import ItemScreen from './screens/ItemScreen';
import CartScreen from './screens/CartScreen';
import ShippingScreen from './screens/ShippingScreen';

//Components
import Navbar from './components/Navbar';
import Backdrop from './components/Backdrop';
import SideDrawer from './components/SideDrawer';
import ShippingForm from './components/ShippingForm';


function App() {

  const [sideToggle, setSideToggle] = useState(false)

  return(
    <Router>
      <Navbar click={() => setSideToggle(true)}/>
      <SideDrawer show={sideToggle} click={() => setSideToggle(false)}/>
      <Backdrop show={sideToggle} click={() => setSideToggle(false)}/>
      <main>
        <Switch>
          <Route exact path = "/" component = {HomeScreen}/>
          <Route exact path = "/product/:id" component = {ItemScreen}/>
          <Route exact path = "/cart" component = {CartScreen}/>
          <Route exact path = "/cart/shipping" component = {ShippingScreen}/>
        </Switch>
      </main>

    </Router>
  );
}

export default App;
