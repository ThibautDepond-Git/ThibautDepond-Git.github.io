const API = 'https://itunes.apple.com/search';

const audioTag = document.querySelector('audio');
const searchInput = document.querySelector('#search');
const searchBtn = document.querySelector('.search-container .btn');
const songsList = document.querySelector('.results');

/**
 * Fetch iTunes API with HTTP GET
 * return JSON
 * @param {string} term
 */
const fetchItunesSongs = async (term) => {
  try {
    const url = `${API}?term=${term}`;
    const response = await fetch(url);
    console.log(response)
    const responseJson = await response.json();
    return responseJson;
  } catch (err) {
    console.log(err);
  }
};

/**
 * Handle click on the <ul> results list
 * Get the corresponding <li>, and the data attribute attached
 * Play the song
 * @param {object} event
 */
const handleClickSong = (event) => {
  const target = event.target;
  console.log(target);
  if (target.tagName !== 'LI' && !target.getAttribute('data-preview')) {
    return;
  }
  audioTag.setAttribute('src', target.getAttribute('data-preview'));
  audioTag.play();
};

/**
 * From a song object returned by the API, create a <li> tag
 * @param {object} s
 */
const createSongLI = (s) => {
  const li = document.createElement('li');
  const h1 = document.createElement('h1');
  const span = document.createElement('span');
  h1.textContent = s.artistName;
  span.textContent = s.trackName;
  li.id = s.trackId;
  li.setAttribute('data-preview', s.previewUrl);
  li.addEventListener('click', handleClickSong);
  li.appendChild(h1);
  li.appendChild(span);
  return li;
};

/**
 * Perform a search request + add the results to the DOM
 */
const search = async () => {
  let searchValue = searchInput.value.trim();
  if (!searchValue) return;
  songsList.innerHTML = '';

  searchValue = searchValue.replace(' ', '+');
  const response = await fetchItunesSongs(searchValue);
  if (response.resultCount) {
    document.querySelector('.no-result').style.display = 'none';
    const songs = response.results.filter((r) => r.kind === 'song');
    const ul = document.createElement('ul');
    songs.forEach((s) => {
      ul.appendChild(createSongLI(s));
    });
    songsList.appendChild(ul);
  } else {
    document.querySelector('.no-result').style.display = 'block';
  }
};

/**
 * Bind keypress event on input to catch the enter key event
 */
searchInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    search();
  }
});
// bind the click on button
searchBtn.addEventListener('click', search);
// bind the click on result list
songsList.addEventListener('click', handleClickSong);

(function main() {
  console.log('--- main ---');
})();
