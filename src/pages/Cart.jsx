import React, { useEffect } from "react";
import "../style/cart.css";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import { Container, Row, Col } from "reactstrap";
import { cartActions } from "../redux/slices/cartSlice";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
function Cart() {
  const cartItem = useSelector((state) => state.cart.cartItem);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  return (
    <Helmet title="cart">
      <CommonSection title="Shopping Cart" />
      <section>
        <Container>
          <Row>
            <Col lg="9">
              {cartItem.length === 0 ? (
                <h2 className="fs-4 text-center">No Item Added To Cart</h2>
              ) : (
                <table className="table bordered">
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Title</th>
                      <th>Price</th>
                      <th>Qty</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItem.map((item, index) => {
                      return <Tr item={item} key={index} />;
                    })}
                  </tbody>
                </table>
              )}
            </Col>
            <Col lg="3">
              <div className="subtotal">
                <h6 className=" d-flex align-items-center justify-content-between">
                  Subtotal
                  <span className="fs-4 fw-bold">$ {totalAmount}</span>
                </h6>
              </div>
              <p className="fs-6 mt-3">
                taxes and shipping will calculate in checkout
              </p>
              <div>
                <button className="buy_btn w-100">
                  <Link to="/login">Checkout</Link>
                </button>
                <button className="buy_btn w-100">
                  <Link to="/shop">Continue Shopping</Link>
                </button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
}
const Tr = ({ item }) => {
  const dispatch = useDispatch();
  const deleteProduct = () => {
    dispatch(cartActions.deleteItem(item.id));
  };
  return (
    <tr>
      <td>
        <img src={item.imgUrl} alt="" />
      </td>
      <td>{item.productName}</td>
      <td>$ {item.price}</td>
      <td>{item.quantity}px</td>
      <td>
        {" "}
        <i onClick={deleteProduct} class="ri-delete-bin-line"></i>
      </td>
    </tr>
  );
};
export default Cart;
