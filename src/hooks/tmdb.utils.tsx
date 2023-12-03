import { orderBy as _orderBy, filter as _filter } from "lodash-es";
import { MovieDb, MovieResult, MovieImagesResponse } from "moviedb-promise";

const TMDB_API_KEY = "dd0f0162286daafc7138cd1b6d6a3f07";
export const TMDB_POSTER_API = "//image.tmdb.org/t/p";
const moviedb = new MovieDb(TMDB_API_KEY);

export interface ExtMovieResult extends MovieResult {
  posterUrl?: string
  images?: MovieImagesResponse
}

export const getAssetUrl = (file_path: string, size = "original") =>
  `${TMDB_POSTER_API}/${size}${file_path}`;

export const orderBestPosters = (images: MovieImagesResponse) =>
  _orderBy(
    _filter(images.posters, { iso_639_1: "en" }),
    ["vote_average", "width"],
    ["desc", "desc"]
  );

// const getPaginatedResult = async (
//   method: string,
//   params: any,
//   limit: number
// ) => {
//   const getPage = async (results = [], page: number = 1): Promise<any> => {
//     const newParams = { ...params, page };
//     const resp:any = await moviedb[method](newParams);
//     console.log({ resp });
//     const nextResults = [...results, ...resp.results];

//     if (nextResults.length < limit && resp.total_pages >= ++page) {
//       return getPage(nextResults, page);
//     } else {
//       return nextResults;
//     }
//   };

//   return getPage();
// };

export const addData = async (movie: MovieResult, index: number): Promise<ExtMovieResult> => {
  if (!movie?.id) return movie;

  const images = await moviedb.movieImages(movie.id);

  // const releaseDates = await moviedb.movieReleaseDates(movie);
  // console.log({ releaseDates });
  const { file_path } = orderBestPosters(images)?.[0] || {};
  const posterUrl = file_path && getAssetUrl(file_path);
  return { ...movie, images, posterUrl };
};

export const getList = async (id: string) => {
  const list = await moviedb.listInfo({ id });
  const movies = list.items;
  if (!movies) return [];

  const moviesWImages = await Promise.all(movies.map(addData));

  return moviesWImages;
};

// export const getTMDB = async (
//   method: string,
//   params: any,
//   limit = 100
// ): Promise<MovieResult[]> => {
//   const movies = await getPaginatedResult(method, params, limit);
//   if (!movies) return [];

//   const moviesWImages = await Promise.all(movies.map(addData));
//   return moviesWImages;
// };
