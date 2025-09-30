import React, { useState, useEffect } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import './App.css';
import * as S from './App.styles';

// 국가 코드 타입
type CountryCode = 'ALL' | 'KR' | 'US' | 'JP';

// getPosts 함수 정의
export const getPosts = async ({ pageParam = 1, country = 'ALL' }) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/tv/top_rated?api_key=a49cebc646cba495f5766bce548aff42&language=ko-KR&page=${pageParam}`
  );

  if (!response.ok) {
    throw new Error('데이터를 불러오지 못했습니다.');
  }

  const data = await response.json();

  // origin_country 필터링
  const filtered =
    country === 'ALL'
      ? data.results
      : data.results.filter((tv) => tv.origin_country.includes(country));

  return {
    tvShows: filtered,
    totalPages: data.total_pages,
    currentPage: data.page,
  };
};

const App = () => {
  const [target, setTarget] = useState(null);
  const [country, setCountry] = useState<CountryCode>('ALL');

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['TV', country],
    queryFn: ({ pageParam = 1 }) => getPosts({ pageParam, country }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.currentPage < lastPage.totalPages
        ? lastPage.currentPage + 1
        : undefined,
  });

  const handleCountryChange = (newCountry: CountryCode) => {
    setCountry(newCountry);
  };

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
    return <div>📡 데이터를 불러오는 중...</div>;
  }

  if (error) {
    return <div>❌ 데이터를 불러오지 못했습니다.</div>;
  }

  return (
    <>
      <S.CountrySelectButton>
        <button onClick={() => handleCountryChange('ALL')}>🌐 전체</button>
        <button onClick={() => handleCountryChange('KR')}>🇰🇷 한국</button>
        <button onClick={() => handleCountryChange('US')}>🇺🇸 미국</button>
        <button onClick={() => handleCountryChange('JP')}>🇯🇵 일본</button>
      </S.CountrySelectButton>
      <S.Container>
        {data!.pages.map((group, idx) => (
          <React.Fragment key={idx}>
            {group.tvShows.map(
              ({ id, name, original_name, vote_average, poster_path }) => (
                <S.TvShowsCard key={id}>
                  <S.TvShowsImage
                    src={
                      poster_path
                        ? `https://image.tmdb.org/t/p/w200${poster_path}`
                        : 'https://via.placeholder.com/100x150?text=No+Image'
                    }
                    alt={name}
                  />

                  <S.TvShowsDetails>
                    <p>{name}</p>
                    <p>{original_name}</p>
                    <p>⭐ {vote_average}</p>
                  </S.TvShowsDetails>
                </S.TvShowsCard>
              )
            )}
          </React.Fragment>
        ))}
        <S.LoadMoreButton ref={setTarget}>
          {hasNextPage ? 'TV 시리즈 불러오기' : '마지막 입니다'}
        </S.LoadMoreButton>
      </S.Container>
    </>
  );
};

export default App;
