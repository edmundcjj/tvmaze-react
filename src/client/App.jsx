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
  constructor(props){
    super(props);

    this.state = {
      query: "",
      sorting_criteria: "",
      movie_list: this.props.results.results,
      queried_movie_list: [],
      sorted_movie_list: []
    }

    this.search = this.search.bind( this );
    this.set_query = this.set_query.bind( this );
    this.sort = this.sort.bind( this );
    this.set_sort_parameter = this.set_sort_parameter.bind( this );
    this.sort_by_titles = this.sort_by_titles.bind( this );
    this.sort_by_ratings = this.sort_by_ratings.bind( this );
  }

  // Save the query
  set_query(event){
    this.setState({query: event.target.value});
  }

  // Save the sorting criteria
  set_sort_parameter(event){
    this.setState({sorting_criteria: event.target.value});
  }

  // Function to retrieve the related movie titles based on the query
  search(){
    let current_query = this.state.query;
    let movies_array = this.state.movie_list;
    let temp_queried_movie_list = [];

    this.setState({query: ""});

    for (var i = 0; i < movies_array.length; i++) {
      if (movies_array[i].show.name.indexOf(current_query) != -1) {
        temp_queried_movie_list.push(movies_array[i]);
      }
    }
    this.setState({queried_movie_list: temp_queried_movie_list});
  }

  // Function sort based on certain criteria
  sort(){
    if (this.state.sorting_criteria === 'rating') {
      this.sort_by_ratings(this.state.queried_movie_list);
    }
    else if (this.state.sorting_criteria === 'title') {
      this.sort_by_titles(this.state.queried_movie_list);
    }
  }

  // Sort movie titles based on ratings
  sort_by_ratings(movieList){
    this.setState({queried_movie_list: []});
    movieList.sort(function(a, b){
      return a.show.rating.average - b.show.rating.average
    })

    this.setState({queried_movie_list: movieList});
  }

  // Sort movie titles based on movie titles
  sort_by_titles(movieList){
    movieList.sort(function(a, b){
      var nameA=a.show.name.toLowerCase(), nameB=b.show.name.toLowerCase()

      if (nameA < nameB) //sort string ascending
          return -1
      if (nameA > nameB)
          return 1
      return 0 //default return value (no sorting)
    })

    this.setState({queried_movie_list: movieList});
  }

  // Lifecycle Methods
  componentDidMount() {
    console.log( "component did mount");
  }

  static getDerivedStateFromProps( nextProps, prevState ){
    console.log( "get derived state from props");
    return null;
  }

  shouldComponentUpdate( nextProps, nextState ) {
    console.log( "component should update");
    return true;

  }

  getSnapshotBeforeUpdate( prevProps, prevState ){
    console.log("get snapshot before update");
    return null;
  }

  componentDidUpdate( prevProps, prevState, snapshot ) {
    console.log( "component did update");
  }

  componentWillUnmount() {
    console.log( "component will unmount");
  }

  // Display content onto the Result_List meta tag
  render() {
    console.log("Queried Movie List after querying => ", this.state.queried_movie_list);
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

          <br></br><br></br>

          <select onChange={this.set_sort_parameter} value={this.state.sorting_criteria}>
            <option value="rating">Ratings</option>
            <option value="title">Titles</option>
          </select>
          <button onClick={this.sort}>Sort</button>
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
