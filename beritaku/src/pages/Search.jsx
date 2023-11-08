import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Row, Col, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { searchNews } from "../store/reducers/search";
import { FaBookmark, FaInfoCircle } from "react-icons/fa";

function Search() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("query");
  const dispatch = useDispatch();
  const news = useSelector((state) => state.search.searchResults);

  useEffect(() => {
    if (query) {
      dispatch(searchNews(query));
    }
  }, [dispatch, query]);

  const InputValue = () => {
    if (query !== "") {
      return (
        <h3 style={{ color: "#1b3260" }}>
          <b>Search Result "{query}"</b>
        </h3>
      );
    }
    return query;
  };

  const formatDate = (publishedAt) => {
    const date = new Date(publishedAt);
    const options = { year: "numeric", month: "short", day: "numeric" };
    return date.toLocaleDateString(undefined, options);
  };

  return (
    <div className="container" style={{ paddingTop: "80px" }}>
      <Row className="mt-4">
        {<InputValue />}
        {news && news.length > 0 ? (
          news.map((mynews, index) => (
            <Col sm={12} md={6} lg={3} key={index}>
              <Card
                className="card"
                style={{
                  marginBottom: "50px",
                  borderRadius: "10px",
                  backgroundColor: "#B4CFE6",
                  height: "90%",
                }}
              >
                {mynews.urlToImage ? (
                  <img
                    src={mynews.urlToImage}
                    alt={mynews.title}
                    style={{
                      width: "100%",
                      height: "205px",
                      borderRadius: "10px",
                    }}
                  />
                ) : (
                  <img
                    src="https://placehold.co/600x400?text=No-Image"
                    alt={mynews.title || "No Image"}
                    style={{
                      width: "100%",
                      height: "auto",
                      borderRadius: "10px",
                    }}
                  />
                )}
                <Card.Body className="card-content">
                  <div style={{ color: "#5A5A5A" }}>
                    {mynews.author} | {formatDate(mynews.publishedAt)}
                  </div>
                  <Card.Title className="card-title">
                    <b>{mynews.title}</b>
                  </Card.Title>
                </Card.Body>
                <Row className="container">
                  <Col md={10} className="d-flex justify-content-end">
                    <FaInfoCircle
                      size={25}
                      style={{ color: "#1b3260", marginBottom: "10px" }}
                    />
                  </Col>
                  <Col md={2}>
                    <FaBookmark
                      size={25}
                      style={{
                        color: "#1b3260",
                        marginBottom: "10px",
                      }}
                    />
                  </Col>
                </Row>
              </Card>
            </Col>
          ))
        ) : (
          <h3 className="mt-5" style={{ color: "#1b3260" }}>
            <b>Oops.. No result found</b>
          </h3>
        )}
      </Row>
    </div>
  );
}

export default Search;
