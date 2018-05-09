/*eslint-disable*/

export const queryTVMazeAPI = (query, callback) => {
  const url = 'http://api.tvmaze.com/search/shows?q=' + query;
  fetch(url)
    .then((response) => {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' + response.status);
        return;
      }

      // Examine the text in the response
      response.json().then(function(results) {
        callback(results);
      });
    })
    .catch((err) => {
      console.log('Fetch Error :-S', err);
    });
};
