import React from "react";
import PropTypes from "prop-types";
import { Alert } from "react-bootstrap";

Message.propTypes = {
  variant: PropTypes.string,
  children: PropTypes.string,
};

function Message({ variant, children }) {
  return <Alert variant={variant}>{children}</Alert>;
}
Message.defaultProps = {
  variant: "info",
};
export default Message;
