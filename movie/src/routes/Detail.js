import { useParams } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
function Detail() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [movies, setMovie] = useState();

  const getMovie = useCallback(async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();
    setMovie(json.data.movie);
    setLoading(false);
  }, [id]);

  useEffect(() => {
    getMovie();
  }, [getMovie]);

  return (
    <div>
      {loading ? (
        <h4>Loading...</h4>
      ) : (
        <div>
          <img src={movies.large_cover_image} alt={movies.title} />
          <h2>{movies.title_long}</h2>
          <span>(평점 {movies.rating}) </span>
          {movies.genres.map((genre) => (
            <sapn>[{genre}] </sapn>
          ))}
          <p>{movies.description_full}</p>
        </div>
      )}
    </div>
  );
}

export default Detail;
