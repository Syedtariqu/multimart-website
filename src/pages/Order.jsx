import React, { useEffect, useState } from "react";
import "../style/order.css";
import { Link } from "react-router-dom";
function Order() {
  const [load, setLoad] = useState(false);
  useEffect(() => {
    setLoad(true);
    setTimeout(() => {
      setLoad(false);
    }, 2000);
  }, []);
  return (
    <>
      {load ? (
        <div class="loader">
          <span class="loader__element"></span>
          <span class="loader__element"></span>
          <span class="loader__element"></span>
        </div>
      ) : (
        <section className="active order_section">
          {" "}
          <span className="overlay"></span>
          <div className="modal-box">
            <i className="fa-regular fa-circle-check"></i>
            <h2>YOUR ORDER IS CONFIRMED</h2>
            <h4>Thanks For Shopping From MultiMart</h4>
            <h4>Have a Good Day </h4>
            <div className="buttons">
              <button className="buy_btn">
                <Link to="/home">Back To Home</Link>{" "}
              </button>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default Order;
