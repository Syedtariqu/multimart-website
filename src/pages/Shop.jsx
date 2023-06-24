import { React, useState,  useEffect } from "react";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import { Container, Row, Col } from "reactstrap";
import "../style/shop.css";
import products from "../assets/data/products";
import ProductsList from "../components/UI/ProductsList";
function Shop() {
  const [productData, setProductData] = useState(products);
  const handleFilter = (e) => {
    const filtervalue = e.target.value;
    if (filtervalue === "sofa") {
      const filteredProducts = products.filter(
        (item) => item.category === "sofa"
      );
      setProductData(filteredProducts);
    }
    if (filtervalue === "mobile") {
      const filteredProducts = products.filter(
        (item) => item.category === "mobile"
      );
      setProductData(filteredProducts);
    }
    if (filtervalue === "chair") {
      const filteredProducts = products.filter(
        (item) => item.category === "chair"
      );
      setProductData(filteredProducts);
    }
    if (filtervalue === "watch") {
      const filteredProducts = products.filter(
        (item) => item.category === "watch"
      );
      setProductData(filteredProducts);
    }
    if (filtervalue === "wireless") {
      const filteredProducts = products.filter(
        (item) => item.category === "wireless"
      );
      setProductData(filteredProducts);
    }
  };
  const handleSearch = (e) => {
    const searchItem = e.target.value;
    const searchedProducts = products.filter((item) =>
      item.category.toLowerCase().includes(searchItem.toLowerCase())
    );

    setProductData(searchedProducts);
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  })
  return (
    <Helmet title={"Shop"}>
      <CommonSection title="Products" />

      <section>
        <Container>
          <Row>
            <Col lg="6" md="6">
              <div className="filter_widget">
                <select onClick={handleFilter}>
                  <option>Filter By Category</option>
                  <option value="sofa">Sofa</option>
                  <option value="mobile">Mobile</option>
                  <option value="chair">Chair</option>
                  <option value="watch">Watch</option>
                  <option value="wireless">Wireless</option>
                </select>
              </div>
            </Col>

            <Col lg="6" md="12">
              <div className="search_box">
                <input
                  type="text"
                  placeholder="Search Products"
                  onChange={handleSearch}
                />
                <span>
                  <i class="ri-search-line"></i>
                </span>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="pt-0">
        <Container>
          <Row>
            {productData.length === 0 ? (
              <h1 className=" text-center fs-4">
                Oops! 😲No Products Are Found !
              </h1>
            ) : (
              <ProductsList data={productData} />
            )}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
}

export default Shop;
