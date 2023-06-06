import React, { useEffect } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../actions/cartAction";
import {
  Button,
  Card,
  Col,
  Form,
  Image,
  ListGroup,
  Row,
} from "react-bootstrap";
import Message from "../components/Message";

const CartScreen = () => {
  const location = useLocation();
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const productId = useParams().id;
  const qty = location.search ? Number(location.search.split("=")[1]) : 1;

  const cart = useSelector((state) => state.cart);

  const { cartItems } = cart;
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };
  const checkoutHandler = () => {
    navigation("/shopping");
  };
  return (
    <>
      <Row>
        <Col md={8}>
          <h1>Shopping Cart </h1>
          {cartItems.length === 0 ? (
            <div>
              <Message children={"your Cart is Empty!"} />
              <Link className="btn btn-dark" to="/">
                Go Back
              </Link>
            </div>
          ) : (
            <ListGroup variant="flash">
              {cartItems.map((cartItem) => (
                <ListGroup.Item key={cartItem.product}>
                  <Row>
                    <Col md={2}>
                      <Image
                        src={cartItem.image}
                        alt={cartItem.name}
                        fluid
                        rounded
                      />
                    </Col>
                    <Col md={3}>
                      <Link to={`/product/${cartItem.product}`}>
                        {cartItem.name}
                      </Link>
                    </Col>
                    <Col md={2}>{cartItem.price}</Col>
                    <Col md={2}>
                      <Form.Control
                        as="select"
                        value={cartItem.qty}
                        onChange={(e) =>
                          dispatch(
                            addToCart(cartItem.product, Number(e.target.value))
                          )
                        }
                      >
                        {[...Array(cartItem.countInStuck).keys()].map(
                          (item) => (
                            <option key={item + 1} value={item + 1}>
                              {item + 1}
                            </option>
                          )
                        )}
                      </Form.Control>
                    </Col>
                    <Col md={2}>
                      <Button
                        type={"button"}
                        variant={"light"}
                        onClick={() => removeFromCartHandler(cartItem.product)}
                      >
                        <i className="fa fa-trash" aria-hidden="true"></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant={"flush"}>
              <ListGroup.Item>
                <h2>
                  Subtotal{" "}
                  {cartItems.reduce((acc, item) => acc + parseInt(item.qty), 0)}{" "}
                  Items
                </h2>
                $
                {cartItems.reduce(
                  (acc, item) => acc + item.qty * item.price,
                  0
                )}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type={"button"}
                  className={"btn btn-dark"}
                  onClick={checkoutHandler}
                >
                  Proceed to checkout
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default CartScreen;
