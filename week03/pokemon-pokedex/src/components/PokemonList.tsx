
import React, { useEffect, useRef } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchPokemons = async ({ pageParam = 0 }) => {
  const response = await axios.get(
    `https://pokeapi.co/api/v2/pokemon?offset=${pageParam}&limit=20`
  );
  const pokemonWithKoreanNames = await Promise.all(
    response.data.results.map(async (pokemon: any) => {
      const speciesResponse = await axios.get(pokemon.url.replace('/pokemon/', '/pokemon-species/'));
      const koreanNameEntry = speciesResponse.data.names.find(
        (name: any) => name.language.name === 'ko'
      );
      return {
        ...pokemon,
        name: koreanNameEntry ? koreanNameEntry.name : pokemon.name,
      };
    })
  );

  return {
    ...response.data,
    results: pokemonWithKoreanNames,
  };
};

const PokemonList = () => {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ['pokemons'],
    queryFn: fetchPokemons,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      // 가장 확실한 방법입니다. API 응답의 'next' 속성을 직접 확인합니다.
      if (lastPage.next) {
        // 'next' URL에서 offset 값을 파싱하여 반환합니다.
        const url = new URL(lastPage.next);
        const nextOffset = url.searchParams.get('offset');
        return nextOffset ? parseInt(nextOffset, 10) : undefined;
      }
      return undefined;
    },
  });

  const lastPokemonElementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (status !== 'success') return;
    if (isFetchingNextPage) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.5 }
    );

    if (lastPokemonElementRef.current) {
      observer.observe(lastPokemonElementRef.current);
    }

    return () => {
      if (lastPokemonElementRef.current) {
        observer.unobserve(lastPokemonElementRef.current);
      }
    };
  }, [data, hasNextPage, fetchNextPage, status, isFetchingNextPage]);

  if (status === 'pending') {
    return <p>로딩 중...</p>;
  }

  if (status === 'error') {
    return <p>Error: {error.message}</p>;
  }
  
  return (
<div>
    <h1>포켓몬 도감</h1>
    <br/><h2>"우리는 모두 친구!"</h2>
    <div className="pokemon-grid-container">
      {data.pages.map((page, i) => (
        <React.Fragment key={i}>
          {page.results.map((pokemon: any, j: number) => (
            <div
              key={pokemon.name}
              className="pokemon-card"
              ref={i === data.pages.length - 1 && j === page.results.length - 1 ? lastPokemonElementRef : null}
            >
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url.split('/')[6]}.png`}
                alt={pokemon.name}
              />
              <p>{pokemon.name}</p>
            </div>
          ))}
        </React.Fragment>
      ))}
      {isFetchingNextPage && <p>다음 포켓몬을 불러오는 중...</p>}
    </div>
  </div>  );
};

export default PokemonList;