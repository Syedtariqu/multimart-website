import React from "react";
import { Container, Row, Col } from "reactstrap";
import { motion } from "framer-motion";
import "./service.css";
import serviceData from "../assets/data/serviceData";
function Service() {
  return (
    <section className="serivices">
      <Container>
        <Row>
          {serviceData.map((item) => {
            return (
              <Col lg="3" md="4">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="service_item"
                  style={{ background: `${item.bg}` }}
                >
                  <span>
                    {" "}
                    <i class={item.icon}></i>
                  </span>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.subtitle}</p>
                  </div>
                </motion.div>
              </Col>
            );
          })}
        </Row>
      </Container>
    </section>
  );
}

export default Service;
