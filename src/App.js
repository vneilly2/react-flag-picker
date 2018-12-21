import React, { Component } from "react";
import SearchBox from "./components/searchbox";
import "./App.css";

import data from "./data/continents.json";
console.log(data);

class App extends Component {
  constructor(props) {
    super(props);
    this.onSelectContinent = this.onSelectContinent.bind(this);
    this.onSelectCountry = this.onSelectCountry.bind(this);
    this.state = {
      continent: "",
      countries: [],
      countryNames: [],
      continentNames: data.map(d => d.continent),
      selectedCountries: [],
      countrySelectorVisible: false
    };
  }

  // when a continent is selected
  onSelectContinent(continent) {
    let countries = data.filter(d => d.continent === continent)[0];
    let countryNames = [];
    if (countries) {
      countries = countries.countries;
      countryNames = countries.map(d => d.name);
    }
    this.setState({
      continent: continent,
      countries: countries || [],
      countryNames: countryNames
    });
  }

  // when a country is selected
  onSelectCountry(countrynames) {
    const countries = this.state.countries.filter(d => {
      return countrynames.indexOf(d.name.toLowerCase()) !== -1;
    });
    this.setState({
      selectedCountries: countries || []
    });
  }

  render() {
    return (
      <div className="App container">
        <div className="row justify-content-md-center">
          <div className="col-12">
            <h1 className="title-header text-center">Flag Picker</h1>
          </div>
          <div className="col-6">
            <SearchBox
              id={"searchContinent"}
              options={this.state.continentNames}
              onSelectOption={this.onSelectContinent}
              type="continent"
            />
            <SearchBox
              id={"searchCountry"}
              options={this.state.countryNames}
              onSelectOption={this.onSelectCountry}
              type="country"
            />
          </div>
        </div>

        <div className="row justify-content-md-center">
          <div className="col-6 country">
            {this.state.selectedCountries.map((country, i) => {
              return (
                <div key={i}>
                  <span className="country-name">{country.name}</span>
                  <span className="country-flag">{country.flag}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
