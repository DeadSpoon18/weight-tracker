import React, { useEffect } from "react";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import { login } from "../actions/userAction";
import { useDispatch, useSelector } from "react-redux";

const LoginScreen = ({ history }) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const dispatch = useDispatch();

  useEffect(() => {
    if (userInfo) {
      history.push("/home");
    }
  }, [history, userInfo]);

  const loginHandler = (e) => {
    e.preventDefault();
    dispatch(login());
  };

  return (
    <>
      <Container>
        <Row className="justify-content-md-center">
          <Col xs={12} md={6}>
            <Card>
              <h2 className="text-center mb-4">Login Anonymously</h2>
              <Card.Body>
                <Button
                  type="submit"
                  className="w-100 bg-dark"
                  onClick={loginHandler}
                >
                  Login
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default LoginScreen;
