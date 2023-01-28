export function fetchImagas(query, page, perPage) {
  const API_KEY = '31630114-541891e344088f225cf30f54b';
  const BASE_URL = 'https://pixabay.com/api/';

  const options = {
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
  };

  return fetch(
    `${BASE_URL}?key=${API_KEY}&q=${query}&page=${page}&per_page=${perPage}`,
    options
  ).then(response => response.json());
}

