import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import axios from "axios";
import styled from "styled-components";
import { mobile } from "../styles/responsive";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/ProductDetailsStyles.css";
import { FaShoppingCart } from "react-icons/fa";
import { useCart } from "../context/cart";
import { toast } from "react-hot-toast";

const ProductDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [cart,setCart]=useCart();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);

  //initalp details
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);
  //getProduct
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };
  //get similar product
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      <div className="row container product-details">
        <div className="col-md-6">
          <img
            src={`/api/v1/product/product-photo/${product._id}`}
            className="card-img-top"
            alt={product.name}
            height="300"
            width={"350px"}
          />
        </div>
        <div className="col-md-6 product-details-info">
          <h1 className="text-center">Product Details</h1>
          <hr />
          <h6>Name : {product.name}</h6>
          <h6>Description : {product.description}</h6>
          <h6>
            Price :
            {product?.price?.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </h6>
          <h6>Category : {product?.category?.name}</h6>
          <button onClick={
            ()=>{setCart([...cart,product])
              localStorage.setItem('cart',JSON.stringify([...cart,product]));
              toast.success('Item added to cart ')
            }} >
            <FaShoppingCart /> Add
          </button>
        </div>
      </div>
      <hr />
      {/* <div className="row container similar-products"> */}
        <h4>Similar Products ➡️</h4>
        {relatedProducts.length < 1 && (
          <p className="text-center">No Similar Products found</p>
        )}
        <div className="d-flex flex-wrap mt-4">
          {relatedProducts?.map((p) => (
            <div className="wrapper" key={p._id}>
              <Container>
                <CardWrapper> 
              <div  onClick={() => navigate(`/product/${p.slug}`)}    className="imageDiv">
              <img
                    src={`/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                  />
              </div>
               
                 
                <div className="textDiv">
            <span className="title">{p.name}</span>
          </div>
          <div className="priceAndButton">
            
            <div className="priceDiv">
           
           
                <div className="priceDiv">
                  <span className="product-price">{p?.price}</span>
                  
                </div>
              
            </div>
            {/* <button onClick={(e) => handleAddToCart(e)}>
              <FaShoppingCart /> Add
            </button> */}
            <button  >
              <FaShoppingCart /> Add
            </button>
          </div>
              
          </CardWrapper>
               
              
               </ Container>
                
              
            </div>
          ))}
        </div>
      
    </Layout>
  );
};


const Container = styled.div`
      display: flex;
      justify-content: center;
      .link {
        text-decoration: none;
      }
    `;
    
    const CardWrapper = styled.div`
      position: relative;
      display: flex;
      flex-direction: column;
      border: 1px solid #3bb77d31;
      height: 340px;
      width: 220px;
      justify-content: center;
      align-items: center;
      border-radius: 10px;
      margin-bottom: 13px;
      background-color: #fff;
      cursor: pointer;
      &:hover {
        box-shadow: 0 0 15px #33333316;
        border: 1px solid #3bb77d57;
        transition: 0.3s;
      }
    
      ${mobile({
        height: "248px",
        width: "160px",
        borderRadius: "5px",
        marginBottom: "0",
      })}
      
      

      .title {
        font-size: 13px;
        font-weight: bold;
        color: #253d4e;
    
        ${mobile({
          fontSize: "11px",
          fontWeight: 600,
        })}
      }
    
      .imageDiv {
        height: 210px;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        /* padding: 10px 0 0 0; */
        /* border: 1px solid red; */
        ${mobile({
          height: "160px",
        })}
      }
    
      .imageDiv > img {
        /* border: 1px solid green; */
        height: 200px;
        width: 200px;
    
        &:hover {
          height: 162px;
          width: 162px;
          transition: 1s;
    
          ${mobile({
            height: "122px",
            width: "132px",
            transition: "0.3s",
          })}
        }
    
        ${mobile({
          height: "120px",
          width: "130px",
        })}
      }
    
      .textDiv {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin: 0 20px;
        margin-top: 20px;
        /* border: 1px solid blue; */
        ${mobile({
          margin: "10px 10px 0 10px",
        })}
      }
    
      .priceAndButton {
        display: flex;
        width: 100%;
        margin: 10px 20px;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
    
        ${mobile({
          margin: "10px",
        })}
      }
      .priceDiv {
        display: flex;
        flex-direction: column;
      }
    
      .priceDiv > .product-price {
        font-size: 16px;
        font-weight: bold;
        color: #3bb77e;
        ${mobile({
          fontSize: "11px",
        })}
      }
    
      .discount-div > .discount-price {
        font-size: 11px;
        color: gray;
        margin-right: 5px;
        text-decoration: line-through;
        ${mobile({
          fontSize: "11px",
        })}
      }
      .discount-div > .discount-percentage {
        font-size: 11px;
        color: gray;
      }
      .priceAndButton button {
        display: flex;
        align-items: center;
        gap: 5px;
        border: none;
        font-size: 14px;
        font-weight: bold;
        padding: 8px 14px;
        color: #3bb77e;
        background-color: #a1f6ce6c;
        border-radius: 5px;
        transition: 0.3s;
        cursor: pointer;
        &:hover {
          background-color: #3bb77e;
          color: white;
        }
    
        ${mobile({
          fontSize: "11px",
        })}
      }
    `;

export default ProductDetails;






