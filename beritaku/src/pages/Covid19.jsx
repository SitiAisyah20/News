import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCovidData } from "../store/reducers/covid19";
import { Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaBookmark, FaInfoCircle } from "react-icons/fa";
import "../styles/App.css";
import { saveCovidArticle, unsaveCovidArticle } from "../store/reducers/saved";

function Covid19() {
  const dispatch = useDispatch();
  const covidData = useSelector((state) => state.covid.data);
  const savedArticles = useSelector((state) => state.saved.covidSaved);

  useEffect(() => {
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

    const formattedDate = oneMonthAgo.toISOString().split("T")[0];

    dispatch(fetchCovidData({ from: formattedDate }));
  }, [dispatch]);

  const formatDate = (publishedAt) => {
    const date = new Date(publishedAt);
    const options = { year: "numeric", month: "short", day: "numeric" };
    return date.toLocaleDateString(undefined, options);
  };

  //sort the articles by publishedAt in descending order
  const sortedArticles = covidData?.articles
    ? [...covidData.articles].sort(
        (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)
      )
    : [];

  const savedCovidArticleIndexes = new Set(
    savedArticles.map((article) => article.index)
  );

  const handleSaved = (article, index) => {
    const isSaved = savedCovidArticleIndexes.has(index);

    if (isSaved) {
      dispatch(unsaveCovidArticle({ index }));
    } else {
      dispatch(saveCovidArticle({ ...article, index }));
    }
  };

  useEffect(() => {
    localStorage.setItem("covidSaved", JSON.stringify(savedArticles));
  }, [savedArticles]);

  return (
    <div className="container" style={{ paddingTop: "80px" }}>
      <h2 className="text-center">
        <b>Covid 19 News</b>
      </h2>
      <Row className="mt-4">
        {sortedArticles.map((article, index) => (
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
              <Link
                to={article.url}
                target="_blank"
                style={{ textDecoration: "none", color: "black" }}
              >
                {article.urlToImage ? (
                  <img
                    src={article.urlToImage}
                    alt={article.title}
                    style={{
                      width: "100%",
                      height: "205px",
                      borderRadius: "10px",
                    }}
                  />
                ) : (
                  <img
                    src="https://placehold.co/600x400?text=No-Image"
                    alt={article.title || "No Image"}
                    style={{
                      width: "100%",
                      height: "auto",
                      borderRadius: "10px",
                    }}
                  />
                )}
              </Link>
              <Card.Body className="card-content">
                <div style={{ color: "#5A5A5A" }}>
                  {article.author} | {formatDate(article.publishedAt)}
                </div>
                <Link
                  to={article.url}
                  target="_blank"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <Card.Title className="card-title">
                    <b>{article.title}</b>
                  </Card.Title>
                </Link>
              </Card.Body>
              <Row className="container">
                <Col md={10} className="d-flex justify-content-end">
                  <Link
                    to={`/detailscovid/${index}`}
                    style={{ textDecoration: "none" }}
                  >
                    <FaInfoCircle
                      size={25}
                      style={{ color: "#1b3260", marginBottom: "10px" }}
                    />
                  </Link>
                </Col>
                <Col md={2}>
                  <FaBookmark
                    size={25}
                    style={{
                      color: savedCovidArticleIndexes.has(index)
                        ? "#2E86C1"
                        : "#1b3260",
                      marginBottom: "10px",
                    }}
                    onClick={() => handleSaved(article, index)}
                  />
                </Col>
              </Row>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default Covid19;
