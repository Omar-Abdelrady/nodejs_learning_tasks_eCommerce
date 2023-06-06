import React, { useEffect, useState } from "react";
import FormContainer from "../components/FormContainer";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../actions/userActions";
import Message from "../components/Message";
import Loader from "../components/Loader";

const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmationPassword, setConfirmationPassword] = useState("");
  const [message, setMessage] = useState("");
  const userRegister = useSelector((state) => state.userRegister);
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error } = userRegister;
  const { userInfo } = userLogin;
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) {
      navigation(redirect);
    }
  }, [navigation, userInfo, redirect]);
  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmationPassword) {
      setMessage("Passwords do not match");
      return;
    }
    dispatch(register({ email, password, name }));
  };
  return (
    <FormContainer>
      <h1>Sign Up</h1>
      {error && <Message children={error} variant={"danger"} />}
      {message && <Message children={message} variant={"danger"} />}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId={"email"}>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder={"Enter your name"}
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>
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
        <Form.Group controlId={"Password"}>
          <Form.Label>Confirmation Password</Form.Label>
          <Form.Control
            type={"password"}
            placeholder={"Enter confirmation password"}
            value={confirmationPassword}
            onChange={(e) => setConfirmationPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button className="mt-3" type={"submit"} variant={"primary"}>
          Sign in
        </Button>
      </Form>
      <Row className="py-3">
        <Col>
          I have an account? <Link to={"/login"}>Login</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterScreen;
