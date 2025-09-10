import React, { Component } from "react";

export default class NewsCard extends Component {
  render() {
    const {news} =this.props;
    return (
     <div className="card h-100 shadow-sm mt-4">
        <img
          src={news.urlToImage}
          className="card-img-top"
          alt={news.title || "News"}
          style={{ objectFit: "cover", height: "180px" }}
        />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{news.title || news.name}</h5>
          <p className="card-text">{news.description}</p>
          <a
            href={(news.url===null|| news.url===undefined)?'https://media.wired.com/photos/6893588e2d5fc658cf0c25ea/191:100/w_1280,c_limit/%20WIRED%20x%20CONDE%20NAST%20no.6%20_The%20Unwritten%20Rules%20of%20New%20Business%20Travel%20_1.jpg':news.url}
            className="btn btn-primary mt-auto"
            target="_blank"
            rel="noopener noreferrer"
          >
            News Link
          </a>
        </div>
        </div>
    );
  }
}
