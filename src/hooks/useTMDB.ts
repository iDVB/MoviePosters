import React from "react";
import { MovieResult } from "moviedb-promise";
import { useSearchParams } from "react-router-dom";
import { getList } from "./tmdb.utils";

function getEveryNth(arr: any[], nth: number, index: number) {
  const result = [];

  for (let i = 0 + index; i < arr.length; i += nth) {
    result.push(arr[i]);
  }

  return result;
}

export default function useTMDB() {
  const [searchParams] = useSearchParams();
  const screenIndex = Number(searchParams.get("screenIndex")) || 1;
  const screenCount = Number(searchParams.get("screenCount")) || 5;
  const postersPerScreen = Number(searchParams.get("postersPerScreen")) || 20;
  const [posters, setPosters] = React.useState<MovieResult[]>([]);

  React.useEffect(() => {
    const limit = postersPerScreen * screenCount;
    console.log({ screenIndex, screenCount, postersPerScreen, limit });
    const getPosters = async () => {
      // const moviesResp = await getTMDB(
      //   "discoverMovie",
      //   {
      //     sort_by: "primary_release_date.desc",
      //     with_companies: "2",
      //     language: "en"
      //   },
      //   limit
      // );
      const moviesResp = await getList("8233880");
      const filteredMovies = getEveryNth(moviesResp, screenCount, screenIndex);
      setPosters(filteredMovies);
    };

    getPosters();
  }, [setPosters, screenIndex, screenCount, postersPerScreen]);

  return posters;
}
