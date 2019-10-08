import React, { Component } from "react";
import "./App.css";
import Card from "./Card";

const COLORS = {
  Psychic: "#f8a5c2",
  Fighting: "#f0932b",
  Fairy: "#c44569",
  Normal: "#f6e58d",
  Grass: "#badc58",
  Metal: "#95afc0",
  Water: "#3dc1d3",
  Lightning: "#f9ca24",
  Darkness: "#574b90",
  Colorless: "#FFF",
  Fire: "#eb4d4b"
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nonSelectedCards: [],
      selectedCards: [],
      modelShowState: false,
      filterText: ""
    };
  }

  componentDidMount() {
    fetch("http://localhost:3030/api/cards")
      .then(response => response.json())
      .then(data => this.setState({ nonSelectedCards: data.cards }));
  }

  showModal = () => {
    this.setState({ modelShowState: true });
  };

  hideModel = () => {
    this.setState({ modelShowState: false });
  };

  addCard = card => {
    this.setState({
      selectedCards: this.state.selectedCards.concat(card),
      nonSelectedCards: this.state.nonSelectedCards.filter(
        nsc => nsc.id !== card.id
      )
    });
  };

  removeCard = card => {
    this.setState({
      selectedCards: this.state.selectedCards.filter(sc => sc.id !== card.id),
      nonSelectedCards: this.state.nonSelectedCards.concat(card)
    });
  };

  handleFilterChange = event => {
    this.setState({ filterText: event.target.value });
  };

  render() {
    return (
      <div className="App">
        <h1>My Pokedex</h1>
        <div className="selected-card-container">
          {this.state.selectedCards.map(card => (
            <Card
              key={card.id}
              info={card}
              actionBtn={
                <h3 className="card-btn" onClick={() => this.removeCard(card)}>
                  Remove
                </h3>
              }
            />
          ))}
        </div>
        <button className="add-btn" onClick={this.showModal}>
          +
        </button>
        <div
          className="modal-bd"
          onClick={this.hideModel}
          style={{ display: this.state.modelShowState ? "block" : "none" }}
        />
        <div
          className="modal"
          style={{ display: this.state.modelShowState ? "block" : "none" }}
        >
          <input onChange={this.handleFilterChange}></input>
          {this.state.nonSelectedCards
            .filter(
              nsc =>
                nsc.name
                  .toLowerCase()
                  .includes(this.state.filterText.toLowerCase()) ||
                nsc.type
                  .toLowerCase()
                  .includes(this.state.filterText.toLowerCase())
            )
            .map(card => (
              <Card
                key={card.id}
                info={card}
                actionBtn={
                  <h3 className="card-btn" onClick={() => this.addCard(card)}>
                    Add
                  </h3>
                }
              />
            ))}
        </div>
      </div>
    );
  }
}

export default App;
