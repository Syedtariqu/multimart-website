import { React, useRef, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "./header.css";
import logo from "../../assets/images/eco-logo.png";
import user_icon from "../../assets/images/user-icon.png";
import { Container, Row } from "reactstrap";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import useAuth from "../../custom-hooks/useAuth";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase.config";
import { toast } from "react-toastify";
import { cartActions } from "../../redux/slices/cartSlice";

const nav__link = [
  {
    path: "home",
    display: "Home",
  },
  {
    path: "shop",
    display: "Shop",
  },
  {
    path: "cart",
    display: "Cart",
  },
];
function Header() {
  const cartItem = useSelector((state) => state.cart.cartItem);
  const headerref = useRef(null);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const menuref = useRef(null);
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [toggle, setToggle] = useState(false);
  const toggleHandle = () => {
    if (toggle) {
      setToggle(false);
    } else {
      setToggle(true);
    }
  };
  const stickyheaderfun = () => {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerref.current.classList.add("sticky_header");
      } else {
        headerref.current.classList.remove("sticky_header");
      }
    });
  };
  const logout = () => {
    signOut(auth)
      .then(() => {
        toast.success("Logged Out");
        navigate("/home");
      })
      .catch((err) => {
        toast.error(err.messsage);
      });

    deleteProduct();
  };

  useEffect(() => {
    stickyheaderfun();
    return () => window.removeEventListener("scroll", stickyheaderfun);
  });
  const menuToggle = () => {
    menuref.current.classList.toggle("active");
  };
  const navigateToCart = () => {
    navigate("/cart");
  };
  // console.log(toggle);

  const dispatch = useDispatch();
  const deleteProduct = () => {
    cartItem.map((item, index) => {
      return dispatch(cartActions.deleteItem(item.id));
    });
  };
  return (
    <header className="header" ref={headerref}>
      <Container>
        <Row>
          <div className="nav__wrapper">
            <div className="logo">
              <img src={logo} alt="" />
              <div>
                <h1>Muiltimart</h1>
              </div>
            </div>
            <div className="navigation" ref={menuref} onClick={menuToggle}>
              <ul className="menu">
                {nav__link.map((item, index) => {
                  return (
                    <li className="nav_item" key={index}>
                      <NavLink
                        to={item.path}
                        className={(navClass) =>
                          navClass.isActive ? "nav__active" : ""
                        }
                      >
                        {item.display}
                      </NavLink>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="nav_icons">
              <span className="cart_icon" onClick={navigateToCart}>
                <i class="ri-shopping-bag-line"></i>
                <span className="badge">{totalQuantity}</span>
              </span>
              <div className="profile">
                <motion.img
                  whileTap={{ scale: 1.2 }}
                  src={user_icon}
                  alt=""
                  onClick={toggleHandle}
                />

                <div
                  className={` ${toggle ? "show_profile" : "profile_action"}`}
                >
                  {currentUser ? (
                    <div className=" d-flex align-items-center justify-content-center flex-column">
                      <span className="name">{currentUser.displayName}</span>
                      <span onClick={logout}>Logout </span>
                    </div>
                  ) : (
                    <div className="log d-flex align-items-center justify-content-center flex-column">
                      <Link to="/signup">Signup</Link>
                      <Link to="/login">Login</Link>
                    </div>
                  )}
                </div>
              </div>
              <div className="mobile_menu">
                <span onClick={menuToggle}>
                  <i class="ri-menu-line"></i>
                </span>
              </div>
            </div>
          </div>
        </Row>
      </Container>
    </header>
  );
}

export default Header;
