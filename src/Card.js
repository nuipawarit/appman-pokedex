import React, { Component } from "react";

class Card extends Component {
  render() {
    const { imageUrl, name } = this.props.info;
    const hp =
      this.props.info.hp > 100
        ? 100
        : this.props.info.hp < 0
        ? 0
        : this.props.info.hp;

    return (
      <div className="card">
        <img className="image" src={imageUrl}></img>
        <div className="info">
          <h1 className="name">{name}</h1>
          <p>HP : {hp}</p>
        </div>
        <div className="action-btn">{this.props.actionBtn}</div>
      </div>
    );
  }
}

export default Card;
