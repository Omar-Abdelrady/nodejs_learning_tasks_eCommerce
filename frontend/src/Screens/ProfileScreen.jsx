import React, { useEffect } from "react";
import FormContainer from "../components/FormContainer";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateUserProfile } from "../actions/userActions";

function ProfileScreen() {
  const location = useLocation();

  const redirect = location.search ? location.search.split("=")[1] : "/";
  const navigation = useNavigate();
  const { userInfo } = useSelector((state) => state.userLogin);
  useEffect(() => {
    if (!userInfo) {
      navigation(redirect);
    }
  }, [navigation, userInfo]);
  const [name, setName] = React.useState(userInfo?.name);
  const [email, setEmail] = React.useState(userInfo?.email);
  const [password, setPassword] = React.useState(null);
  const [confirmationPassword, setConfirmationPassword] = React.useState(null);
  const [message, setMessage] = React.useState(null);
  const { error, loading, success } = useSelector(
    (state) => state.userUpdateProfile
  );
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmationPassword) {
      setMessage("Passwords do not match");
      return;
    }
    dispatch(updateUserProfile({ name, email, ...(password && { password }) }));
  };

  return (
    <>
      <Row>
        <Col md={6}>
          <FormContainer md={8}>
            <h1>Update profile</h1>
            {error && <Message children={error} variant={"danger"} />}
            {message && <Message children={message} variant={"danger"} />}
            {success && <Message children={success} variant={"success"} />}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
              <Form.Group controlId={"email"}>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type={"text"}
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
        </Col>
        <Col md={6}></Col>
      </Row>
    </>
  );
}

export default ProfileScreen;
