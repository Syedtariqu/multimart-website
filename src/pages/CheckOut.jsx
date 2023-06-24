import React, { useEffect } from "react";
import { Container, Row, Col, FormGroup } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import "../style/checkout.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
function CheckOut() {
  const totalQty = useSelector((state) => state.cart.totalQuantity);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  return (
    <Helmet title="Checkout">
      <CommonSection title="Checkout" />
      <section>
        <Container>
          <Row>
            <Col lg="8">
              <h6 className="mb-4 fw-bold">Billing Information</h6>
              <form action="" className="billing_form">
                <FormGroup className="form_group">
                  <input type="text" placeholder="Enter Your Name" />
                </FormGroup>
                <FormGroup className="form_group">
                  <input type="email" placeholder="Enter Your Email" />
                </FormGroup>
                <FormGroup className="form_group">
                  <input type="number" placeholder="Enter Your Mobile Number" />
                </FormGroup>
                <FormGroup className="form_group">
                  <input type="text" placeholder="Street address" />
                </FormGroup>
                <FormGroup className="form_group">
                  <input type="number" placeholder="Postal code" />
                </FormGroup>
                <FormGroup className="form_group">
                  <input type="text" placeholder="Country" />
                </FormGroup>
              </form>
            </Col>
            <Col lg="4">
              <div className="checkout_cart">
                <h6>
                  Total Qty : <span>{totalQty} Qty</span>{" "}
                </h6>
                <h6>
                  Subtotal : <span>$ {totalAmount}</span>{" "}
                </h6>
                <h6>
                  Free Shipping <span>Cash On Delivery</span>
                </h6>
                <h4>
                  Total Cost : <span>${totalAmount}</span>{" "}
                </h4>
                <button className="buy_btn auth_btn w-100">
                  <Link to="/order">Place an Order</Link>
                </button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
}

export default CheckOut;
