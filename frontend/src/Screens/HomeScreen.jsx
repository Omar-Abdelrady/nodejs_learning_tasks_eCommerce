import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import Product from "../components/Product";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { listProduct } from "../actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, errors, products } = productList;
  useEffect(() => {
    dispatch(listProduct());
  }, [dispatch]);

  // const products = [];
  return (
    <>
      <h1>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : errors ? (
        <Message variant="danger" children={errors} />
      ) : products ? (
        <Row>
          {products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      ) : null}
    </>
  );
};

export default HomeScreen;
