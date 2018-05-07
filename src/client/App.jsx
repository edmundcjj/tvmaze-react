/*eslint-disable*/
import React from 'react';
import {hot} from 'react-hot-loader';
import styles from 'style.scss';

import Home from './components/home/main';

const RESULTS = require('../../results.js');

// Each Individual Result
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
          <a href={this.props.show_url} target="_blank">Link to movie</a>
          <hr></hr>
        </div>
      );
  }
}

// List of results after querying
class Result_List extends React.Component {
  constructor(){
    super();

    this.state = {
      query: "",
      movie_list: [],
      queried_movie_list: []
    }

    this.populate_movie_list = this.populate_movie_list.bind( this );
    this.search = this.search.bind( this );
    this.set_query = this.set_query.bind( this );
  }

  // Save all the movies retrieved from the json file into an array
  populate_movie_list(){
    this.props.results.results.map( (result) => {
      this.state.movie_list.push(result);
    });
    this.setState({movie_list: this.state.movie_list});
  }

  // Save the query
  set_query(event){
    this.setState({query: event.target.value});
  }

  // Function to retrieve the related movie titles based on the query
  search(){
    this.populate_movie_list();

    let current_query = this.state.query;
    let movies_array = this.state.movie_list;

    this.setState({query: ""});

    for (var i = 0; i < movies_array.length; i++) {
      if (movies_array[i].show.name.indexOf(current_query) != -1) {
        this.state.queried_movie_list.push(movies_array[i]);
      }
    }
    this.setState({queried_movie_list: this.state.queried_movie_list});
  }

  render() {
    console.log("Movie List =>", this.state.queried_movie_list);
    const ResultNode = this.state.queried_movie_list.map( (result) => {
                          return <Result_item key={result.show.id}
                                              name={result.show.name}
                                              rating={result.show.rating.average}
                                              language={result.show.language}
                                              show_image={result.show.image.medium}
                                              show_url={result.show.url}>
                                </Result_item>
    });

    return (
      <div>
        <div className={styles.center_form}>
          <input type="text" placeholder="Search..." onChange={this.set_query} value={this.state.query}/>
          <button onClick={this.search}>Search</button>
        </div>

        <br></br>

        {ResultNode}
      </div>
    );
  }
}

const App = () => (
  <div>
    <Home />

    <Result_List results={RESULTS} />
  </div>
);

export default hot(module)(App);
