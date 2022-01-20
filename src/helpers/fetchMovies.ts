import axios from 'axios';

export const fetchMovies = async () => {
  try {
    const response = await axios({
      method: 'get',
      url: 'https://swapi.py4e.com/api/films/',
    });
    const data = response.data;
    return data;
  } catch (err) {
    console.log(err);
  }
};
