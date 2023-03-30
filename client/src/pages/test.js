import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { Link, useNavigate } from "react-router-dom";
import { mobile } from "../styles/responsive";
// import DropIn from "braintree-web-drop-in-react";
import { AiFillWarning } from "react-icons/ai";
import axios from "axios";
import toast from "react-hot-toast";
import "../styles/CartStyles.css";
import { Button } from "antd";
import styled from "styled-components";
import Spinner from "../components/Spinner";
import MobileMenu from "../components/MobileMenu";

const CartPage = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  

  //total price
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total = total + item.price;
      });
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "BDT",
      });
    } catch (error) {
      console.log(error);
    }
  };
  //detele item
  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  //get payment gateway token
  // const getToken = async () => {
  //   try {
  //     const { data } = await axios.get("/api/v1/product/braintree/token");
  //     setClientToken(data?.clientToken);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // useEffect(() => {
  //   getToken();
  // }, [auth?.token]);

  //handle payments
  // const handlePayment = async () => {
  //   try {
  //     setLoading(true);
  //     const { nonce } = await instance.requestPaymentMethod();
  //     const { data } = await axios.post("/api/v1/product/braintree/payment", {
  //       nonce,
  //       cart,
  //     });
  //     setLoading(false);
  //     localStorage.removeItem("cart");
  //     setCart([]);
  //     navigate("/dashboard/user/orders");
  //     toast.success("Payment Completed Successfully ");
  //   } catch (error) {
  //     console.log(error);
  //     setLoading(false);
  //   }
  // };
  return (
    <>
     
    <CartContainer>
      <div className="header">
         
        <h3>My Cart</h3>
      </div>
      {cart?.length === 0 ? (
        <div className="empty-cart">
          <p>Your Cart is Empty Now</p>
          <Link to="/" className="name-link">
            <Button>Start Shopping</Button>
          </Link>
        </div>
      ) : (
        <div className="mid-container">
          {cart?.map((cartProduct) => {
             
            return (
              <div className="mid" key={cartProduct?._id}>
                <div className="cartImgDiv">
                   
               

                  
                   <img
                      src={`/api/v1/product/product-photo/${cartProduct._id}`}
                      className="card-img-top"
                      alt={cartProduct.name}
                      width="100%"
                      height={"80px"}
                    />
                  
                </div>
                <div className="cartInfoDiv">
                  <div className="name">
                    
                       
                      
                    
                      <h5>{cartProduct?.name}</h5>
                      <h3 style={{ color: "#3bb54a" }}>Price : {cartProduct.price}</h3>
                    
                  </div>
                 
                  <div className="remove-div">
                    <Button
                      variant="contained"
                      onClick={() => removeCartItem(cartProduct._id)}
                      size="small"
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
          <>
            <div className="bottom">
              <div className="checkOut">
                <div className="shippingAndTotal">
                  <h4>
                    Total :{" "}
                    <span style={{ color: "#3bb54a" }} className="priceTotal">
                    {totalPrice()} 
                    </span>
                  </h4>
                </div>
                {auth?.user?.address ? (
                  <>
                  <div className="mb-3">
                  
                    <button onClick={()=>navigate('/dashboard/user/profile')}
                    className="btn btn-outline-warning">
                      Update Address
                      </button>
                  </div>
                  </>
                ) : (
                  <div className="mb-3">
                    {auth?.token ? (
                      <button className="btn btn-outline-warning" onClick={()=>navigate('/dashboard/user/profile')}>Update Address</button>
                    ) : (
                      <button className="btn btn-outline-warning" onClick={()=>

                        navigate('/login',{
                          state:"/cart",
                        }
                        )}>Please Login to Checkout</button>
                    )}
                  </div>
                )}
                {/* <Link to="/order" className="order-link">
                  <Button variant="contained" size="small">
                    Check Out
                  </Button>
                </Link> */}
              </div>
            </div>
          </>
        </div>
      )}
    </CartContainer>
      <MobileMenu>  </MobileMenu>
    {loading && <Spinner />}
  </>
  );
};

const CartContainer = styled.div`
  .header {
    padding: 10px;
    display: flex;
    align-items: center;
    gap: 20px;
    border-bottom: 1px solid lightgray;
  }
  .header h3 {
    font-weight: 500;
  }
  .header .iconLeft {
    font-size: 22px;
    display: flex;
    align-items: center;
    color: black;
  }

  .empty-cart {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 70vh;
  }
  .mid-container {
    margin-bottom: 36%;
  }
  .mid {
    display: flex;
    align-items: center;
    gap: 10px;
    margin: 10px 10%;
    border-bottom: 1px solid lightgray;
    padding-bottom: 60px;
    ${mobile({
      margin: "10px 25px",
    })}
  }

  .mid > .cartImgDiv {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .mid > .cartImgDiv > .img-link > img {
    height: 100px;
    width: 100px;
  }
  .mid > .cartInfoDiv {
    display: flex;
    flex-direction: column;
    width: 100%;
    /* gap: 5px; */
  }
  .name {
    display: inline;
    margin-bottom: 8px;
  }
  .name-link {
    text-decoration: none;
    color: inherit;
  }
  .name-link > h5 {
    display: inline;
  }

  .mid > .cartInfoDiv > .priceandquantity {
    display: flex;
    justify-content: space-between;
  }
  .cartInfoDiv > .priceandquantity > h3 {
    color: red;
  }
  .cartInfoDiv > .priceandquantity > .cartQuantity {
    display: flex;
    align-items: center;
    gap: 5px;
    margin: 0 10px;
    padding: 5px;
    border-radius: 5px;
    border: 1px solid lightgray;
  }
  .priceandquantity > .cartQuantity > .iconMinus {
    border: none;
    background-color: inherit;
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  .priceandquantity > .cartQuantity > .iconPlus {
    border: none;
    background-color: inherit;
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  .priceandquantity > .cartQuantity > input {
    width: 20px;
    text-align: center;
    border: 1px solid lightgray;
    padding: 3px;
    background-color: lightgray;
    outline: none;
  }
  .remove-div > button {
    background-color: black;
    color: white;
    border-radius: 5px;
    text-transform: none;
  }

  .bottom {
    display: flex;
    justify-content: flex-end;
    padding: 10px;
    position: fixed;
    bottom: 60px;
    background-color: white;
    border-bottom: 1px solid lightgray;
    left: 0;
    right: 0;
  }
  .bottom > .checkOut {
    display: flex;
   
    justify-content: center;
    align-items: center;
    gap: 10px;
  }
  .checkOut > .shippingAndTotal {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .checkOut > .order-link {
    text-decoration: none;
    color: white;
  }
  .order-link > Button {
    /* padding: 8px 10px; */
    background-color: #3bb54a;
  }
`;
export default CartPage;