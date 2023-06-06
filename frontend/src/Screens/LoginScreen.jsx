import React, { useEffect, useState } from "react";
import FormContainer from "../components/FormContainer";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../actions/userActions";
import Message from "../components/Message";
import Loader from "../components/Loader";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const location = useLocation();
  const redirect = location.search ? location.search.split("=")[1] : "/";
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const navigation = useNavigate();
  const { loading, error, userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      navigation(redirect);
    }
  }, [navigation, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };
  return (
    <FormContainer>
      <h1>Sign in</h1>
      {error && <Message children={error} variant={"danger"} />}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId={"email"}>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type={"email"}
            placeholder={"Enter email"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId={"Password"}>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type={"password"}
            placeholder={"Enter Password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button className="mt-3" type={"submit"} variant={"primary"}>
          Sign in
        </Button>
      </Form>
      <Row className="py-3">
        <Col>
          New Customer? <Link to={"/register"}>Register</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginScreen;
