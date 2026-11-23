import axios from "axios";

const TOKEN = import.meta.env.VITE_TMDB_TOKEN;

const tmdb = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Authorization: `Bearer ${TOKEN}`,
    accept: "application/json",
  },
});

// Standard rows
export const getTrending = () => tmdb.get("/trending/movie/week");
export const getTopRated = (page = 1) =>
  tmdb.get("/movie/top_rated", { params: { page } });
export const getPopular = (page = 1) =>
  tmdb.get("/movie/popular", { params: { page } });
export const getUpcoming = () => tmdb.get("/movie/upcoming");
export const getNewReleases = () => tmdb.get("/movie/now_playing");
export const getActionMovies = () =>
  tmdb.get("/discover/movie", {
    params: { with_genres: 28, sort_by: "popularity.desc" },
  });
export const getTvShows = () => tmdb.get("/tv/popular");
export const getAdultTvShows = () =>
  tmdb.get("/discover/tv", {
    params: { without_genres: 10762, sort_by: "popularity.desc" },
  });

// Kids and family
export const getKidsMovies = () =>
  tmdb.get("/discover/movie", {
    params: {
      with_genres: "10751,16", // Family & Animation
      sort_by: "popularity.desc",
      page: 1,
    },
  });

export const getKidsTv = () =>
  tmdb.get("/discover/tv", {
    params: {
      with_genres: "10762", // Kids
      sort_by: "popularity.desc",
      page: 1,
    },
  });

// Search page results
export const getMovieSearch = (query, page = 1) =>
  tmdb.get("/search/movie", {
    params: { query, page },
  });

export const getMovieRecommendations = (id, page = 1) =>
  tmdb.get(`/movie/${id}/recommendations`, {
    params: { page },
  });

// Movie Details and collections
export const getMovieDetails = (id) => tmdb.get(`/movie/${id}`);
export const getCollectionDetails = (id) => tmdb.get(`/collection/${id}`);
export const getMovieCredits = (id) => tmdb.get(`/movie/${id}/credits`);
export const getMovieVideos = (id) => tmdb.get(`/movie/${id}/videos`);
export const getSimilarMovies = (id) => tmdb.get(`/movie/${id}/similar`);
export const getMovieImages = (id) =>
  tmdb.get(`/movie/${id}/images`, {
    params: { include_image_language: "en,null" },
  });

// TV Show specific endpoints so it points to an actual show and not movie
export const getTvDetails = (id) => tmdb.get(`/tv/${id}`);
export const getTvCredits = (id) => tmdb.get(`/tv/${id}/credits`);
export const getTvVideos = (id) => tmdb.get(`/tv/${id}/videos`);
export const getTvImages = (id) =>
  tmdb.get(`/tv/${id}/images`, {
    params: { include_image_language: "en,null" },
  });
export const getSimilarTv = (id) => tmdb.get(`/tv/${id}/similar`);

export default tmdb;
