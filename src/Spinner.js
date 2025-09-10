import React, { Component } from "react";

export default class Spinner extends Component {
  render() {
    return (
     <div className="d-flex justify-content-center align-items-center" style={{height: '50vh'}}>
        <div className="spinner-border" role="status" style={{width: '5rem', height: '5rem'}}>
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }
}
