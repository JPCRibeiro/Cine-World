const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const API_URL = process.env.NEXT_PUBLIC_API_URL;

/* Home */

export async function getTrending() {
  try {
    const response = await fetch(`${API_URL}/trending/all/day?language=pt-BR&api_key=${API_KEY}`);
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Erro:', error);
  }
}

export async function getMoviesGenres() {
  try {
    const response = await fetch(`${API_URL}/genre/movie/list?language=pt-BR&api_key=${API_KEY}`);
    const data = await response.json();
    return data.genres;
  } catch (error) {
    console.error('Erro:', error);
  }
}

export async function getSeriesGenres() {
  try {
    const response = await fetch(`${API_URL}/genre/tv/list?language=pt-BR&api_key=${API_KEY}`);
    const data = await response.json();
    return data.genres;
  } catch (error) {
    console.error('Erro:', error);
  }
}

/* Movie Page */

export async function getMovies() {
  try {
    const response = await fetch(`${API_URL}/trending/movie/week?language=pt-BR&page=1&api_key=${API_KEY}`);
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Erro:', error);
  }
}

export async function getTopRatedMovies() {
  try {
    const response = await fetch(`${API_URL}/movie/top_rated?language=pt-BR&page=1&api_key=${API_KEY}`);
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Erro:', error);
  }
}

export async function getPopularMovies() {
  try {
    const response = await fetch(`${API_URL}/movie/popular?language=pt-BR&page=1&api_key=${API_KEY}`);
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Erro:', error);
  }
}

export async function getNowPlayingMovies() {
  try {
    const response = await fetch(`${API_URL}/movie/now_playing?language=pt-BR&page=2&api_key=${API_KEY}`);
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Erro:', error);
  }
}

/* Series Page */

export async function getSeries() {
  try {
    const response = await fetch(`${API_URL}/trending/tv/week?language=pt-BR&page=1&api_key=${API_KEY}`);
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Erro:', error);
  }
}

export async function getTopRatedSeries() {
  try {
    const response = await fetch(`${API_URL}/tv/top_rated?language=pt-BR&page=1&api_key=${API_KEY}`);
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Erro:', error);
  }
}

export async function getPopularSeries() {
  try {
    const response = await fetch(`${API_URL}/tv/popular?language=pt-BR&page=1&api_key=${API_KEY}`);
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Erro:', error);
  }
}

export async function getNowPlayingSeries() {
  try {
    const response = await fetch(`${API_URL}/tv/airing_today?language=pt-BR&page=1&api_key=${API_KEY}`);
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Erro:', error);
  }
}

/* Movie Details */

export async function getMovieDetails(id) {
  try {
    const response = await fetch(`${API_URL}/movie/${id}?language=pt-BR&api_key=${API_KEY}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro:', error);
  }
}

export async function getMovieCast(id) {
  try {
    const response = await fetch(`${API_URL}/movie/${id}/credits?language=pt-BR&api_key=${API_KEY}`);
    const data = await response.json();
    return data.cast;
  } catch (error) {
    console.error('Erro:', error);
  }
}

export async function getSimilarMovies(id) {
  try {
    const response = await fetch(`${API_URL}/movie/${id}/similar?language=pt-BR&api_key=${API_KEY}`);
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Erro:', error);
  }
}

export async function getMovieRecomendations(id) {
  try {
    const response = await fetch(`${API_URL}/movie/${id}/recommendations?language=pt-BR&api_key=${API_KEY}`);
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Erro:', error);
  }
}

export async function getMovieReviews(id) {
  try {
    const response = await fetch(`${API_URL}/movie/${id}/reviews?language=en-US&api_key=${API_KEY}`);
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Erro:', error);
  }
}

/* Actor Details */

export async function getActorDetails(id) {
  try {
    const response = await fetch(`${API_URL}/person/${id}?language=pt-BR&api_key=${API_KEY}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro:', error);
  }
}

export async function getActorMovies(id) {
  try {
    const response = await fetch(`${API_URL}/person/${id}/movie_credits?language=pt-BR&api_key=${API_KEY}`);
    const data = await response.json();
    return data.cast;
  } catch (error) {
    console.error('Erro:', error);
  }
}

/* Series Details */

export async function getSerieDetails(id) {
  try {
    const response = await fetch(`${API_URL}/tv/${id}?language=pt-BR&api_key=${API_KEY}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro:', error);
  }
}

export async function getSerieCast(id) {
  try {
    const response = await fetch(`${API_URL}/tv/${id}/credits?language=pt-BR&api_key=${API_KEY}`);
    const data = await response.json();
    return data.cast;
  } catch (error) {
    console.error('Erro:', error);
  }
}

export async function getSimilarSeries(id) {
  try {
    const response = await fetch(`${API_URL}/tv/${id}/similar?language=pt-BR&api_key=${API_KEY}`);
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Erro:', error);
  }
}

export async function getSerieRecomendations(id) {
  try {
    const response = await fetch(`${API_URL}/tv/${id}/recommendations?language=pt-BR&api_key=${API_KEY}`);
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Erro:', error);
  }
}

export async function getSerieReviews(id) {
  try {
    const response = await fetch(`${API_URL}/tv/${id}/reviews?language=en-US&api_key=${API_KEY}`);
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Erro:', error);
  }
}

/* Search */

export async function getSearchRequest(query) {
  try {
    const response = await fetch(`${API_URL}/search/multi?language=pt-BR&query=${query}&api_key=${API_KEY}`);
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Erro:', error);
  }
}