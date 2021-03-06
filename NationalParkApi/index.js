'use strict'

const apiKey = 'MZmerdcgQ4JnrzQ0cS0MIrQhFsuHx6d1LT0rsIjW';
const searchUrl = 'https://developer.nps.gov/api/v1/places';

function formatQueryParams(params){
    const queryItems = Object.keys(params).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&')
}

function displayResults(responseJson){
  let resultsArray = responseJson.data
  let html =''
    console.log(resultsArray)
  for (const repo of resultsArray){
      // console.log(repo)
      if(responseJson.total == 0){
        
        html += `Sorry, that park cannot be found, please try again!`
      }
      else{
        html += `<ul>
        <li>
            <h3>${repo.title}</h3>
            <p>${repo.listingdescription}</p>
            <p>${repo.url}</p>
        </li>
        </ul>
      `
      }
      console.log(responseJson.total)
  }
  $('#searchResults').html(html)

}

function getNatParkResults(query, maxResults=10){
 const params = {
     api_key: apiKey,
     q: query,
     part: 'snippet',
     maxResults,
     type: ''
    };
        const queryString = formatQueryParams(params);
        console.log(queryString)
        const url = searchUrl + '?' + queryString;

        console.log(url);
    fetch(url)
    .then(response => response.json())
    .then(response => {

        // console.log(response);
        displayResults(response)
    })
    .catch(err => {
        $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });

}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchTerm = $('#js-search-term').val();
    const maxResults = $('#js-max-results').val();
    getNatParkResults(searchTerm, maxResults);
  });
}

$(watchForm);