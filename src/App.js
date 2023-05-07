import CartContainer from "./components/CartContainer";
import Navbar from "./components/Navbar";
import { useSelector,useDispatch } from "react-redux";
import { calculateTotals, getCartSlice } from "./features/cart/cartSlice";
import { useEffect } from "react";
import Modal from "./components/Modal";


function App() {
  const dispatch = useDispatch();
 const {cartItems , isLoading} =  useSelector((state) => state.cart);
 const {isOpen} = useSelector((state) => state.modal);

//This useEffect will calculate the total as well as change the badge whenever an item is added or removed 
 useEffect(() => {
dispatch(calculateTotals())
 },[cartItems,dispatch])

useEffect(() => {
dispatch(getCartSlice());
},[dispatch])

if(isLoading) {
  return (
    <div className="loading">
      <h1>Loading...</h1>
    </div>
  )
}
  return <main>
    {isOpen && <Modal />}
     <Navbar />
     <CartContainer />
  </main>;
}
export default App;
