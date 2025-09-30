import React, { useState, useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import "./App.css";
import * as S from "./App.styles.js";

// 한 번에 불러오는 데이터의 개수 정의
export const DATA_LIMIT = 5;

// getPosts 함수 정의
export const getMovies = async ({ pageParam = 1, genre = "" }) => {
  const response = await fetch(
    `https://yts.mx/api/v2/list_movies.json?sort_by=rating&limit=${DATA_LIMIT}&page=${pageParam}${genre ? `&genre=${genre}` : ""}`);
  const data = await response.json();
  console.log(data.data);
  return data.data;
};



const App = () => {
  const [target, setTarget] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["movies", search],
    queryFn: ({ pageParam = 1 }) => getMovies({ pageParam, genre: search }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { page_number, limit, movie_count } = lastPage;
      const totalPages = Math.ceil(movie_count / limit);
      return page_number < totalPages ? page_number + 1 : undefined;
    },
    staleTime: 0,
    cacheTime: 0,
  });

  const onIntersect = async ([entry], observer) => {
    if (entry.isIntersecting && hasNextPage) {
      observer.unobserve(entry.target);
      await fetchNextPage();
      observer.observe(entry.target);
    }
  };

  useEffect(() => {
    let observer;
    if (target) {
      observer = new IntersectionObserver(onIntersect, { threshold: 0.2 });
      observer.observe(target);
    }
    return () => observer && observer.disconnect();
  }, [target]);

  if (isFetching && !isFetchingNextPage) {
    return <div>로딩 중⚙️</div>;
  }

  if (error) {
    return <div>⚠️</div>;
  }

  return (
    <S.Container>
      <S.SearchBar>
        <S.SearchContent
          placeholder="장르를 입력해 주세요" 
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <S.SearchBtn onClick={() => setSearch(searchInput.trim())}>🔍</S.SearchBtn>
      </S.SearchBar>

      {data.pages.map((group, idx) => (
        <React.Fragment key={idx}>
          {group.movies?.map(({ id, title, year, genres, medium_cover_image  }) => (
            <S.ProductCard key={`movie_${id}`}>
              <S.ProductImage src={medium_cover_image} alt={title} />
              <S.ProductDetails>
                <p>{title}</p>
                <p>{year}</p>
                <p>{genres?.join(" | ")}</p>
              </S.ProductDetails>
            </S.ProductCard>
          ))}
        </React.Fragment>
      ))}
      <S.LoadMoreButton ref={setTarget}>
        {hasNextPage ? "더 많은 영화 불러오기" : "마지막 영화"}
      </S.LoadMoreButton>
    </S.Container>
  );
};

export default App;