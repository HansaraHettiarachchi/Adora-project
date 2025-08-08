import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Container, Row, Col, Carousel, Image } from "react-bootstrap";
import { BsCheck2 } from "react-icons/bs";

const About = () => {
  const featuresLeft = ["Natural Materials", "5 Days Refund", "Good Woods"];

  const featuresRight = ["Free Shipping", "Best Fabrics", "Friendly Support"];

  return (
    <>
      <Header />

      {/* Top Carousel */}
      <Carousel fade interval={3000}>
        {[1, 2, 3, 4, 5].map((num) => (
          <Carousel.Item key={num}>
            <img
              className="d-block w-100 about-carousel-img"
              style={{
                height: "500px",
                objectFit: "cover",
                marginBottom: "1rem",
              }}
              src={`src/assets/images/about_slide (${num}).${
                num === 1 ? "png" : "jpg"
              }`}
              alt={`Slide ${num}`}
            />
          </Carousel.Item>
        ))}
      </Carousel>

      {/* About Us Section */}
      <Container className="py-5" style={{ marginBottom: "1rem" }} fluid>
        <Row className="justify-content-center text-center">
          <Col lg={8} style={{ lineHeight: "1.8" }}>
            <h2 style={{ color: "#23B540", fontWeight: "bold" }}>ABOUT US</h2>
            <p style={{ color: "#888787ff", marginTop: "20px" }}>WHO WE ARE?</p>
            <p style={{ color: "#A6A3A3", marginTop: "20px" }}>
              Welcome to our floral design and boutique – where nature’s finest
              creations meet your moments of celebration. We are passionate
              about creating stunning floral arrangements that bring joy and
              beauty to any occasion. From lush bouquets to charming potted
              plants and elegant décor pieces, our designs capture the art of
              floral beauty. Freshness isn’t just our promise – it’s our
              guarantee. Whether it’s a gift for a loved one or décor for your
              home, we’re here to help you choose something meaningful for every
              moment.
            </p>
          </Col>
        </Row>
      </Container>

      {/* Experience Section */}
      <Container
        fluid
        className="py-5"
        style={{ maxWidth: "1000px", marginBottom: "1rem" }}
      >
        <Row className="align-items-center">
          {/* Left: Features */}
          <Col md={4} className="mb-8">
            <h2
              style={{
                color: "#23B540",
                fontWeight: "bold",
                display: "flex",
                justifyContent: "center",
                marginTop: "150px",
              }}
            >
              23 Years Of Experience
            </h2>
            <Row>
              <Col xs={6}>
                {featuresLeft.map((item, idx) => (
                  <p
                    key={idx}
                    style={{
                      fontSize: "15px",
                      color: "black",
                      display: "inline-flex",
                      fontStyle: "italic",
                      alignItems: "center",
                      marginBottom: "2rem",
                    }}
                  >
                    <BsCheck2
                      className="me-2 text-success"
                      style={{
                        border: "1px solid #164C0D",
                        padding: "2px",
                      }}
                    />
                    {item}
                  </p>
                ))}
              </Col>
              <Col xs={6}>
                {featuresRight.map((item, idx) => (
                  <p
                    key={idx}
                    style={{
                      marginTop: idx === 0 ? "20px" : "20px",
                      fontSize: "15px",
                      color: "black",
                      display: "flex",
                      fontStyle: "italic",
                      alignItems: "center",
                      justifyContent: "flex-end",
                      marginBottom: "2rem",
                      gap: "6px",
                    }}
                  >
                    {item}
                    <BsCheck2
                      className="me-2 text-success"
                      style={{
                        border: "1px solid #164C0D",
                        padding: "2px",
                      }}
                    />
                  </p>
                ))}
              </Col>
            </Row>
          </Col>

          {/* Right: Images */}
          <Col md={8}>
            <Row className="g-4">
              {[1, 4, 3, 2].map((num, idx) => (
                <Col
                  md={6}
                  key={idx}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent:
                      idx === 0 || idx === 4 ? "flex-end" : "flex-start",
                  }}
                >
                  <Image
                    src={`src/assets/images/about_experience_pic (${num}).png`}
                    alt={`Experience ${idx + 1}`}
                    style={{
                      width: "100%",
                      height: idx === 0 || idx === 3 ? "180px" : "250px",
                      objectFit: "cover",
                      transition: "transform 0.3s ease, box-shadow 0.3s ease",
                      cursor: "pointer",
                    }}
                  />
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>

      {/* History Section */}
      <Container
        fluid
        className="py-5"
        style={{ maxWidth: "1000px", marginBottom: "4rem" }}
      >
        <Row className="align-items-center">
          {/* Left: Images */}
          <Col md={8}>
            <Row className="g-4">
              {[1, 4, 3, 2].map((num, idx) => (
                <Col
                  md={6}
                  key={idx}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent:
                      idx === 0 || idx === 4 ? "flex-end" : "flex-start",
                  }}
                >
                  <Image
                    src={`src/assets/images/about_history (${num}).png`}
                    alt={`Experience ${idx + 1}`}
                    style={{
                      width: "100%",
                      height: idx === 0 || idx === 3 ? "180px" : "250px",
                      objectFit: "cover",
                      transition: "transform 0.3s ease, box-shadow 0.3s ease",
                      cursor: "pointer",
                    }}
                  />
                </Col>
              ))}
            </Row>
          </Col>

          {/* Right: Features */}
          <Col md={4} className="mb-8">
            <h2
              style={{
                color: "#23B540",
                fontWeight: "bold",
                display: "flex",
                justifyContent: "center",
                marginTop: "80px",
              }}
            >
              OUR HISTORY
            </h2>
            <Row className="justify-content-center text-center">
              <Col lg={8} style={{ lineHeight: "1.8" }}>
                <p style={{ color: "#A6A3A3", lineHeight: "1.5" }}>
                  From timeless floral beauty to modern plant care — we’ve got
                  it all in one place. Whether you’re styling your home, garden,
                  or office, our shop offers a carefully selected range of
                  flowers, potted plants, natural decor pieces, and fertilizers
                  for all plant types.Inspired by nature and ancient traditions,
                  we also celebrate the use of natural materials like wood,
                  stone, and moss — transforming any space into a green,
                  peaceful retreat.
                </p>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>

      {/* Result Section */}
      <Container
        fluid
        style={{
          backgroundImage:
            "linear-gradient(rgba(22, 76, 13, 0.8), rgba(22, 76, 13, 0.8)), url('src/assets/images/about_result_section.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          maxWidth: "1000px",
          color: "white",
          minHeight: "50vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          textAlign: "center",
          marginBottom: "6rem",
        }}
        className="py-5"
      >
        <h2 style={{ color: "#23B540", fontWeight: "bold" }}>
          WHAT IS OUR RESULT?
        </h2>
        <Row className="justify-content-center align-items-center">
          <Col
            xs={6}
            md={3}
            className="mb-4"
            style={{ transform: "translateY(-20px)", marginTop: "4rem" }}
          >
            <div>
              <h3
                style={{
                  fontSize: "2.5rem",
                  border: "2px solid white",
                  display: "inline-block",
                  padding: "10px 20px",
                  borderRadius: "10px",
                  width: "100px",
                  height: "80px",
                }}
              >
                55<b>+</b>
              </h3>
              <p
                style={{
                  fontSize: "0.8rem",
                  fontWeight: "bold",
                }}
              >
                Years of experience
              </p>
            </div>
          </Col>
          <Col
            xs={6}
            md={3}
            className="mb-4"
            style={{ transform: "translateY(20px)", marginTop: "6rem" }}
          >
            <div>
              <h3
                style={{
                  fontSize: "2.5rem",
                  border: "2px solid white",
                  display: "inline-block",
                  padding: "10px 20px",
                  borderRadius: "10px",
                  width: "100px",
                  height: "80px",
                }}
              >
                25<b>k</b>
              </h3>
              <p
                style={{
                  fontSize: "0.8rem",
                  fontWeight: "bold",
                }}
              >
                Happy Clients
              </p>
            </div>
          </Col>
          <Col
            xs={6}
            md={3}
            className="mb-4"
            style={{ transform: "translateY(-20px)", marginTop: "4rem" }}
          >
            <div>
              <h3
                style={{
                  fontSize: "2.5rem",
                  border: "2px solid white",
                  display: "inline-block",
                  padding: "10px 20px",
                  borderRadius: "10px",
                  width: "100px",
                  height: "80px",
                }}
              >
                15<b>+</b>
              </h3>
              <p
                style={{
                  fontSize: "0.8rem",
                  fontWeight: "bold",
                }}
              >
                Showrooms
              </p>
            </div>
          </Col>
          <Col
            xs={6}
            md={3}
            className="mb-4"
            style={{ transform: "translateY(20px)", marginTop: "6rem" }}
          >
            <div>
              <h3
                style={{
                  fontSize: "2.5rem",
                  border: "2px solid white",
                  display: "inline-block",
                  padding: "10px 20px",
                  borderRadius: "10px",
                  width: "100px",
                  height: "80px",
                }}
              >
                45<b>+</b>
              </h3>
              <p
                style={{
                  fontSize: "0.8rem",
                  fontWeight: "bold",
                }}
              >
                Award Winning
              </p>
            </div>
          </Col>
        </Row>
      </Container>

      {/* Feedback Section */}
      <Container
        fluid
        className="py-5 text-center mx-auto "
        style={{
          maxWidth: "1000px",
          borderRadius: "10px",
          border: "2px solid #164C0D",
          minHeight: "50vh",
          marginBottom: "2rem",
        }}
      >
        <h2
          style={{ color: "#23B540", fontWeight: "bold", marginBottom: "2rem" }}
        >
          WHAT IS OUR CLIENT SAYS?
        </h2>
        <Carousel indicators={false} controls={true} interval={3000} fade>
          {/* Feedback 1 */}
          <Carousel.Item>
            <div>
              <Image
                src="https://randomuser.me/api/portraits/women/1.jpg"
                rounded
                width="80"
                height="80"
                alt="Client 1"
                className="mx-auto d-block"
                style={{ objectFit: "cover", borderRadius: "8px" }}
              />
              <h5 className="mt-3">Emali Jems</h5>
              <p className="mx-auto" style={{ maxWidth: "600px" }}>
                "Absolutely beautiful flowers! I ordered a bouquet for my mom’s
                birthday, and she loved it. Fresh, vibrant, and delivered right
                on time."
              </p>
            </div>
          </Carousel.Item>

          {/* Feedback 2 */}
          <Carousel.Item>
            <div>
              <Image
                src="https://randomuser.me/api/portraits/men/2.jpg"
                rounded
                width="80"
                height="80"
                alt="Client 2"
                className="mx-auto d-block"
                style={{ objectFit: "cover", borderRadius: "8px" }}
              />
              <h5 className="mt-3">John Doe</h5>
              <p className="mx-auto" style={{ maxWidth: "600px" }}>
                "The service was outstanding. The flowers were fresh and
                beautifully arranged. Will definitely order again!"
              </p>
            </div>
          </Carousel.Item>

          {/* Feedback 3 */}
          <Carousel.Item>
            <div>
              <Image
                src="https://randomuser.me/api/portraits/women/3.jpg"
                rounded
                width="80"
                height="80"
                alt="Client 3"
                className="mx-auto d-block"
                style={{ objectFit: "cover", borderRadius: "8px" }}
              />
              <h5 className="mt-3">Sophia Brown</h5>
              <p className="mx-auto" style={{ maxWidth: "600px" }}>
                "Highly recommended! Fast delivery and the arrangement exceeded
                my expectations. Thank you so much."
              </p>
            </div>
          </Carousel.Item>
        </Carousel>
      </Container>

      <Footer />
    </>
  );
};

export default About;
