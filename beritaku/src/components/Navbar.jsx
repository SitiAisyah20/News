import React from "react";
import Button from "react-bootstrap/Button";
import {
  Container,
  Row,
  Col,
  Form,
  Navbar,
  Nav,
  InputGroup,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FaBookmark, FaSearch } from "react-icons/fa";

function NavScroll() {
  const navigate = useNavigate();

  const onSearch = (e) => {
    e.preventDefault();
    const query = e.target.elements.search.value;
    const queryParams = new URLSearchParams();
    queryParams.set("query", query);
    navigate(`/search?${queryParams.toString()}`);
  };

  return (
    <Navbar
      fixed="top"
      style={{
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: "#1b3260",
        zIndex: 1000,
      }}
      expand="lg"
    >
      <Container>
        <Row className="w-100">
          <Col xs={12} md={4} className="d-flex align-items-center ml-auto">
            <Navbar.Brand as={Link} to={"/"} className="text-white">
              <h2 style={{ fontWeight: "bold" }}>Beritaku</h2>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
          </Col>
          <Col
            xs={12}
            md={4}
            className="d-flex align-items-center justify-content-center "
          >
            <Navbar.Collapse id="navbarScroll">
              <Nav
                className="me-auto my-2 my-lg-0"
                style={{ maxHeight: "100px", color: "white" }}
                navbarScroll
              >
                <Nav.Link as={Link} to="/" style={{ color: "white" }}>
                  Indonesia
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/programming"
                  style={{ color: "white" }}
                >
                  Programming
                </Nav.Link>
                <Nav.Link as={Link} to="/covid19" style={{ color: "white" }}>
                  Covid-19
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Col>
          <Col
            xs={12}
            md={4}
            className="d-flex align-items-center justify-content-end"
          >
            <Navbar.Collapse id="navbarScroll">
              <Form className="d-flex" onSubmit={onSearch}>
                <InputGroup>
                  <Form.Control
                    type="search"
                    name="search"
                    placeholder="Search News"
                    aria-label="Search"
                  />
                  <Button
                    style={{
                      backgroundColor: "white",
                    }}
                    type="submit"
                  >
                    <FaSearch color="black" />
                  </Button>
                </InputGroup>
              </Form>
            </Navbar.Collapse>
            <Navbar.Collapse id="navbarScroll">
              <Nav.Link as={Link} to="/saved" style={{ color: "white" }}>
                <FaBookmark size={32} style={{ color: "white" }} />
              </Nav.Link>
            </Navbar.Collapse>
          </Col>
        </Row>
      </Container>
    </Navbar>
  );
}

export default NavScroll;
