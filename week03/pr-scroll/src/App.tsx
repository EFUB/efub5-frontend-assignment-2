import React, { useState, useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import * as S from "./App.styles";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
}

interface ApiResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export const DATA_LIMIT = 20;

export const getMovies = async (context: { pageParam?: number }): Promise<ApiResponse> => {
  const pageParam = context.pageParam ?? 1;
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=ko-KR&page=${pageParam}`
  );
  if (!response.ok) {
    throw new Error('Failed to fetch movies');
  }
  const data = await response.json();
  const movies: Movie[] = data.results.map((item: any) => ({
    id: item.id,
    title: item.title,
    overview: item.overview,
    poster_path: item.poster_path
      ? `https://image.tmdb.org/t/p/w400${item.poster_path}`
      : 'https://placehold.co/400x600?text=No+Image',
    release_date: item.release_date,
    vote_average: item.vote_average,
    vote_count: item.vote_count
  }));
  return {
    page: pageParam,
    results: movies,
    total_pages: data.total_pages,
    total_results: data.total_results
  };
};

const App: React.FC = () => {
  const [target, setTarget] = useState<HTMLDivElement | null>(null);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery<ApiResponse, Error>({
    queryKey: ["movies"],
    queryFn: getMovies,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined;
    },
  });

  const onIntersect = async ([entry]: IntersectionObserverEntry[], observer: IntersectionObserver) => {
    if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
      observer.unobserve(entry.target);
      await fetchNextPage();
      observer.observe(entry.target);
    }
  };

  useEffect(() => {
    let observer: IntersectionObserver;
    if (target) {
      observer = new IntersectionObserver(onIntersect, { threshold: 0.2 });
      observer.observe(target);
    }
    return () => observer && observer.disconnect();
  }, [target, hasNextPage, isFetchingNextPage]);

  if (status === 'pending' || status === 'loading') {
    return <S.LoadingContainer>영화 데이터를 불러오는 중...</S.LoadingContainer>;
  }

  if (error) {
    return <S.ErrorContainer>오류가 발생했습니다: {error.message}</S.ErrorContainer>;
  }

  return (
    <S.Container style={{
      minHeight: "100vh",
      width: "100%",
      padding: "20px 0",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      backgroundColor: "#f8f9fa",
    }}>
      <S.Header>
        <S.Title>🎬 Movie</S.Title>
      </S.Header>
      <div style={{
        width: "100%",
        display: "flex",
        justifyContent: "center"
      }}>
        <S.MoviesGrid style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", 
          gap: "32px", 
          padding: "32px 0",
          maxWidth: "1100px",
          width: "100%"
        }}>
          {data?.pages.map((page, pageIndex) => (
            <React.Fragment key={`page_${pageIndex}`}>
              {page.results.map((movie: Movie) => (
                <S.MovieCard
                  key={`movie_${movie.id}`}
                  onClick={() => setSelectedMovie(movie)}
                  style={{
                    cursor: "pointer",
                    transition: "box-shadow 0.2s, transform 0.2s",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.14)",
                    borderRadius: "20px",
                    background: "#fff",
                    margin: "0 auto",
                    maxWidth: "260px",
                    minHeight: "420px",
                    display: "flex",
                    flexDirection: "column",
                    overflow: "hidden",
                    border: "1px solid #e0e0e0",
                    position: "relative"
                  }}
                  onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.03)")}
                  onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
                >
                  <S.MoviePoster 
                    src={movie.poster_path} 
                    alt={movie.title}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://placehold.co/400x600?text=No+Image';
                    }}
                    style={{
                      borderRadius: "20px 20px 0 0",
                      width: "100%",
                      height: "340px",
                      objectFit: "cover",
                      background: "#f5f5f5"
                    }}
                  />
                  <S.MovieDetails style={{ padding: "18px 16px 12px" }}>
                    <S.MovieTitle style={{ fontWeight: 700, fontSize: "1.15rem", marginBottom: "8px", color: "#222" }}>{movie.title}</S.MovieTitle>
                    <S.MovieInfo style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px", fontSize: "0.97rem" }}>
                      <S.Rating style={{ color: "#1976d2", fontWeight: 600 }}>⭐ {movie.vote_average.toFixed(1)}</S.Rating>
                      <S.ReleaseDate style={{ color: "#888" }}>{movie.release_date}</S.ReleaseDate>
                    </S.MovieInfo>
                    <S.VoteCount style={{ fontSize: "0.92rem", color: "#555" }}>👥 {movie.vote_count.toLocaleString()} votes</S.VoteCount>
                  </S.MovieDetails>
                </S.MovieCard>
              ))}
            </React.Fragment>
          ))}
        </S.MoviesGrid>
      </div>
      <S.LoadMoreSection ref={setTarget}>
        {isFetchingNextPage && (
          <S.LoadingSpinner>
            <S.Spinner />
            영화들을 불러오는 중...
          </S.LoadingSpinner>
        )}
        {hasNextPage && !isFetchingNextPage && (
          <S.LoadMoreText>스크롤하여 더 많은 영화 보기</S.LoadMoreText>
        )}
        {!hasNextPage && (
          <S.EndMessage>모든 영화를 확인했습니다!</S.EndMessage>
        )}
      </S.LoadMoreSection>

      {selectedMovie && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(40,40,40,0.55)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            backdropFilter: "blur(2px)"
          }}
          onClick={() => setSelectedMovie(null)}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: "28px",
              maxWidth: "440px",
              width: "95vw",
              padding: "2.2rem 2rem 2rem",
              boxShadow: "0 12px 48px rgba(0,0,0,0.22)",
              position: "relative",
              display: "flex",
              flexDirection: "column",
              alignItems: "center"
            }}
            onClick={e => e.stopPropagation()}
          >
            <img
              src={selectedMovie.poster_path}
              alt={selectedMovie.title}
              style={{
                width: "100%",
                maxHeight: "420px",
                borderRadius: "18px",
                objectFit: "cover",
                marginBottom: "1.2rem",
                background: "#f5f5f5"
              }}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = 'https://placehold.co/400x600?text=No+Image';
              }}
            />
            <h2 style={{ margin: "0 0 0.7rem", fontSize: "1.55rem", fontWeight: 700, textAlign: "center", color: "#222" }}>{selectedMovie.title}</h2>
            <p style={{ color: "#1976d2", fontSize: "1.05rem", marginBottom: "0.7rem", textAlign: "center", fontWeight: 500 }}>{selectedMovie.release_date}</p>
            <p style={{ fontSize: "1.02rem", marginBottom: "1.2rem", color: "#444", textAlign: "left", lineHeight: 1.6 }}>{selectedMovie.overview}</p>
            <div style={{ color: "#1976d2", fontWeight: "bold", fontSize: "1.08rem", marginBottom: "0.5rem" }}>
              ⭐ {selectedMovie.vote_average.toFixed(1)} / 👥 {selectedMovie.vote_count.toLocaleString()} votes
            </div>
            <button
              style={{
                position: "absolute",
                top: "1.1rem",
                right: "1.1rem",
                background: "#1976d2",
                color: "#fff",
                border: "none",
                borderRadius: "50%",
                width: "36px",
                height: "36px",
                fontSize: "1.35rem",
                cursor: "pointer",
                boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
              aria-label="닫기"
              onClick={() => setSelectedMovie(null)}
            >×</button>
          </div>
        </div>
      )}
    </S.Container>
  );
};

export default App;