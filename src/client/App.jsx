/*eslint-disable*/
import React from 'react';
import {hot} from 'react-hot-loader';
import styles from 'style.scss';

import Home from './components/home/main';

const RESULTS = require('../../results.js');

// Search Bar
class SearchBar extends React.Component {
  constructor(){
    super()
  }

  render() {
    return (
      <form className={styles.center_form}>
        <input type="text" placeholder="Search..." />
        <button onClick={this.search}>Search</button>
      </form>
    );
  }
}

// Individual Result
class Result_item extends React.Component {
  constructor(){
    super()
  }

  render() {
      return (
        <div>
          <img src={this.props.show_image} alt="Show Image"></img>
          <h3>{this.props.name}</h3>
          <p>Language: {this.props.language}</p>
          <p>Rating: {this.props.rating}</p>
          <hr></hr>
        </div>
      );
  }
}

class Result_List extends React.Component {
  constructor(){
    super()
  }

  render() {
    const ResultNode = this.props.results.results.map( (result) => {
                          return <Result_item key={result.show.id}
                                              name={result.show.name}
                                              rating={result.show.rating.average}
                                              language={result.show.language}
                                              show_image={result.show.image.medium}
                                              show_url={result.show.url}>
                                </Result_item>
    });

    return (
      <div>{ResultNode}</div>
    );
  }
}

const App = () => (
  <div>
    <Home />,

    <SearchBar />,

    <Result_List results={RESULTS} />
  </div>
);

export default hot(module)(App);
