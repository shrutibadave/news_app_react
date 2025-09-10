import React, { Component } from "react";
import NewsCard from "./NewsCard";
import Spinner from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {
  
  constructor(props)
  {
    super(props)
    this.state = {
    newsData: [],
    pageValue: 1,
    totalResult: 0,
    pageSize: 8,
    isSpinnerShow: false,
    hasMore: true
  }
}
  async getNews() {
    const response = await fetch(
      `https://newsapi.org/v2/everything?q=${this.props.category}&page=${this.state.pageValue}&pageSize=${this.state.pageSize}&apiKey=f105d84853ed4a42ba9598b3948234d3`
    );
    const data = await response.json();
    if(response.status === 200)
    {
    this.setState({
      newsData: data.articles,
      totalResult: data.totalResults / 1000,
      isSpinnerShow: false,
      hasMore:true
    });
  }
  else{
    this.setState({
      isSpinnerShow: false,
      hasMore:false
    });
  }
  }
  componentDidMount() {
    this.getNews();
  }
  increaseCount = () => {
    if (
      this.state.buttonValue <
      Math.ceil(this.state.totalResult / this.state.newsData.length)
    ) {
      this.setState({
        pageValue: this.state.pageValue + 1,
        isSpinnerShow: true,
        newsData: [],
      });
      this.getNews();
    }
  };
  decreseCount = () => {
    if (this.state.buttonValue > 1) {
      this.setState({
        pageValue: this.state.pageValue - 1,
        isSpinnerShow: true,
        newsData: [],
      });
      this.getNews();
    }
  };
   fetchMoreData = async () => {
    let newPage= this.state.pageValue +1;
    const response = await fetch(
      `https://newsapi.org/v2/everything?q=${this.props.category}&page=${newPage}&pageSize=${this.state.pageSize}&apiKey=f105d84853ed4a42ba9598b3948234d3`
    );
    const data = await response.json(); 
    if(response.status === 200)
    {
    this.setState({
      newsData: this.state.newsData.concat(data.articles),
      totalResult: data.totalResults / 1000,
      isSpinnerShow: false,
      pageValue:this.state.pageValue + 1,
      hasMore:true
    });
  }
  else{
    this.setState({
      isSpinnerShow: false,
      hasMore:false
    });
  }
  };
  render() {
    return (
      <>
        {this.state.isSpinnerShow && <Spinner></Spinner>}
        <div className="container">
         
            <InfiniteScroll
              dataLength={this.state.newsData.length}
              next={this.fetchMoreData}
              hasMore={this.state.hasMore}
              loader={<h4><Spinner></Spinner></h4>}
            >
               <div className="row">
              {this.state.newsData.map((item) => (
                <div
                  className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
                  key={item.url}
                >
                  <NewsCard news={item}></NewsCard>
                </div>
              ))}
              </div>
            </InfiniteScroll>
            {/* {this.state.newsData.map((item) => (
              <div
                className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
                key={item.url}
              >
                <NewsCard news={item}></NewsCard>
              </div>
            ))} */}
          </div>
        
        {/* <div className="container d-flex justify-content-between mt-4">
          <button
            type="button"
            className="btn btn-primary"
            onClick={this.decreseCount}
            disabled={this.state.buttonValue <= 1}
          >
            Previous
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={this.increaseCount}
            disabled={this.state.buttonValue >= Math.ceil(this.state.totalResult / this.state.newsData.length)}
          >
            Next
          </button>
        </div> */}
      </>
    );
  }
}
