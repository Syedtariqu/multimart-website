import { React, useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import products from "../assets/data/products";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import { Container, Row, Col } from "reactstrap";
import "../style/product_details.css";
import { motion } from "framer-motion";
import ProductsList from "../components/UI/ProductsList";
import { useDispatch } from "react-redux";
import { cartActions } from "../redux/slices/cartSlice";
import { toast } from "react-toastify";
function ProductDetails() {
  const [tab, setTab] = useState("desc");

  const reviewUser = useRef("");
  const reviewMsg = useRef("");
  const dispatch = useDispatch();

  const [rating, setRating] = useState(null);
  const { id } = useParams();
  const product = products.find((item) => item.id === id);
  const {
    imgUrl,
    productName,
    price,
    avgRating,
    reviews,
    category,
    description,
    shortDesc,
  } = product;
  // console.log(rating);
  const related = products.filter((item) => item.category === category);

  const submitHandle = (e) => {
    e.preventDefault();

    const reviewUserName = reviewUser.current.value;
    const reviewUserMsg = reviewMsg.current.value;
    console.log(reviewUserName, reviewUserMsg);
    const reviewObj = {
      userName: reviewUserName,
      text: reviewUserMsg,
      rating,
    };
    toast.success("Review Submitted")
  };

  const addToCart = () => {
    dispatch(
      cartActions.addItem({
        id,
        image: imgUrl,
        productName,
        price,
      })
    );
    toast.success("Product added successfully");
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [product]);
  return (
    <Helmet title={productName}>
      <CommonSection title={productName} />
      <section className="pt-0">
        <Container>
          <Row>
            <Col lg="6">
              <img src={imgUrl} alt="" />
            </Col>
            <Col lg="6">
              <div className="product_details">
                <h2>{productName}</h2>
                <div className="product_rating d-flex align-items-center gap-5 mb-3">
                  <div>
                    <span>
                      <i class="ri-star-s-fill"></i>
                    </span>
                    <span>
                      <i class="ri-star-s-fill"></i>
                    </span>
                    <span>
                      <i class="ri-star-s-fill"></i>
                    </span>
                    <span>
                      <i class="ri-star-s-fill"></i>
                    </span>
                    <span>
                      <i class="ri-star-half-s-fill"></i>
                    </span>
                  </div>
                  <p>
                    (<span>{avgRating}</span> rating)
                  </p>
                </div>
                <div className=" d-flex align-items-center gap-4">
                  <span className="product_price">${price}</span>
                  <span>Category : {category.toUpperCase()}</span>
                </div>
                <p className="mt-3">{shortDesc}</p>

                <motion.button
                  whileTap={{ scale: 1.2 }}
                  className="buy_btn"
                  onClick={addToCart}
                >
                  Add To Cart
                </motion.button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section>
        <Container>
          <Row>
            <Col lg="12">
              <div className="tab_wrapper d-flex align-items-center gap-5">
                <h6
                  className={`${tab === "desc" ? "active_tab" : ""}`}
                  onClick={() => setTab("desc")}
                >
                  Description
                </h6>
                <h6
                  className={`${tab === "rev" ? "active_tab" : ""}`}
                  onClick={() => setTab("rev")}
                >
                  Review ({reviews.length})
                </h6>
              </div>

              {tab === "desc" ? (
                <div className="tab_content mt-4 ">
                  <p>{description}</p>
                </div>
              ) : (
                <div className="review">
                  <div className="review_wrapper">
                    <ul className="mt-4">
                      {reviews.map((item, index) => {
                        return (
                          <>
                            <li key={index} className="mt-3">
                              <h6>Jhom Doe</h6>
                              <span>{item.rating} ( rating)</span>
                              <p>{item.text}</p>
                            </li>
                          </>
                        );
                      })}
                    </ul>
                    <div className="review_form">
                      <h4>Leave Your Review </h4>
                      <form action="" onSubmit={submitHandle}>
                        <div className="form_group">
                          <input
                            type="text"
                            placeholder="Enter Name"
                            ref={reviewUser}
                            required
                          />
                        </div>
                        <div className="form_group d-flex align-items-center gap-5 rating_group">
                          <motion.span
                            whileTap={{ scale: 1.4 }}
                            onClick={() => setRating(1)}
                          >
                            1<i class="ri-star-s-fill"></i>
                          </motion.span>
                          <motion.span
                            whileTap={{ scale: 1.4 }}
                            onClick={() => setRating(2)}
                          >
                            2<i class="ri-star-s-fill"></i>
                          </motion.span>
                          <motion.span
                            whileTap={{ scale: 1.4 }}
                            onClick={() => setRating(3)}
                          >
                            3<i class="ri-star-s-fill"></i>
                          </motion.span>
                          <motion.span
                            whileTap={{ scale: 1.4 }}
                            onClick={() => setRating(4)}
                          >
                            4<i class="ri-star-s-fill"></i>
                          </motion.span>
                          <motion.span
                            whileTap={{ scale: 1.4 }}
                            onClick={() => setRating(5)}
                          >
                            5<i class="ri-star-s-fill"></i>
                          </motion.span>
                        </div>
                        <div className="form_group">
                          <textarea
                            rows={4}
                            cols={5}
                            type="text"
                            placeholder="REview Message..."
                            ref={reviewMsg}
                            required
                          />
                        </div>
                        <button className="buy_btn" type="submit">
                          Submit
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              )}
            </Col>
            <Col lg="12" className="mt-5">
              <h2 className="related_title">You might also like</h2>
            </Col>
            <ProductsList data={related} />
          </Row>
        </Container>
      </section>
    </Helmet>
  );
}

export default ProductDetails;
