import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { useParams, useNavigate, Link } from "react-router-dom";
import { mobile } from "../styles/responsive";
import styled from "styled-components";
import "../styles/CategoryProductStyles.css";
import axios from "axios";
import useCategory from "../hooks/useCategory";
import { FaShoppingCart } from "react-icons/fa";
import MobileMenu from "../components/MobileMenu";
const CategoryProduct = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const categories=useCategory();
  useEffect(() => {
    if (params?.slug) getPrductsByCat();
  }, [params?.slug]);
  const getPrductsByCat = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/product-category/${params.slug}`
      );
      setProducts(data?.products);
      setCategory(data?.category);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    
    <Layout>
    {/* <Container>
      <Wrapper>
        {categories.map((category) => {
          return (
            <Card
            to={`/category/${category.slug}`}
              key={category?._id}
            >
              <ImageDiv>
                <Image src={category?.img?.url} />
              </ImageDiv>
              <TextDiv>
                <Text>{category?.name}</Text>
              </TextDiv>
            </Card>
          );
        })}
      </Wrapper>
    </Container> */}
         
      
        <h4 className="text-center">Category - {category?.name}</h4>
        <h6 className="text-center">{products?.length} result found </h6>
      
        <div className="d-flex flex-wrap mt-4">
          {products?.map((p) => (
              <div className="wrapper">
  <Container>
                <CardWrapper>
                <div onClick={() => navigate(`/product/${p.slug}`)}    className="imageDiv">
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
               
                <MobileMenu></MobileMenu>
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

export default CategoryProduct;