import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from "../actions/cartAction";
import { useNavigation } from "react-router-dom";

const Shipping = () => {
  const cart = useSelector((state) => state.cart);
  const navigation = useNavigation();
  const { shippingAddress } = cart;
  const dispatch = useDispatch();
  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, country, postalCode }));
    navigation("/payment");
    //TODO: dispatch the action to the reducer
    //TODO: redirect to the payment page
    //TODO: clear the cart
  };
  return (
    <FormContainer>
      <h1>Shipping</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId={"address"}>
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            placeholder={"Enter your Address"}
            value={address}
            required
            onChange={(e) => setAddress(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId={"city"}>
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            placeholder={"Enter your city"}
            value={city}
            required
            onChange={(e) => setCity(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId={"postalCode"}>
          <Form.Label>Postal code</Form.Label>
          <Form.Control
            type="text"
            placeholder={"Enter Postal code"}
            value={postalCode}
            required
            onChange={(e) => setPostalCode(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId={"postalCode"}>
          <Form.Label>Country</Form.Label>
          <Form.Control
            type="text"
            placeholder={"Enter your country"}
            value={country}
            required
            onChange={(e) => setCountry(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button type={"submit"} variant={"primary"}>
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default Shipping;
