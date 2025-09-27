import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  margin: 0;
  padding: 0;
  background: #f8f9fa;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Header = styled.header`
  text-align: center;
  margin-bottom: 2rem;
  width: 100%;
  padding: 2rem 0;
`;

export const Title = styled.h1`
  font-size: 2.5rem;
  color: #222;
  margin: 0;
`;

export const Subtitle = styled.p`
  font-size: 1.2rem;
  color: #666;
  margin: 0.5rem 0 0 0;
`;

export const MoviesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 2rem;
  width: 100%;
  max-width: 1200px;
  padding: 0 20px;
  justify-items: center;
`;

export const MovieCard = styled.div`
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 260px;
  transition: transform 0.2s ease;
  
  &:hover {
    transform: translateY(-4px);
  }
`;

export const MoviePoster = styled.img`
  width: 100%;
  height: 350px;
  object-fit: cover;
`;

export const MovieDetails = styled.div`
  padding: 1rem;
`;

export const MovieTitle = styled.h2`
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
  color: #222;
  font-weight: 700;
`;

export const MovieInfo = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`;

export const Rating = styled.span`
  color: #1976d2;
  font-weight: bold;
`;

export const ReleaseDate = styled.span`
  color: #888;
`;

export const MovieOverview = styled.p`
  font-size: 1rem;
  color: #444;
  margin-bottom: 0.5rem;
  line-height: 1.5;
`;

export const VoteCount = styled.div`
  font-size: 0.9rem;
  color: #888;
`;

export const LoadMoreSection = styled.div`
  text-align: center;
  margin: 2rem 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const LoadingContainer = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  font-size: 1.2rem;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f8f9fa;
`;

export const ErrorContainer = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  color: #d32f2f;
  font-size: 1.2rem;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f8f9fa;
`;

export const LoadingSpinner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
`;

export const Spinner = styled.div`
  width: 32px;
  height: 32px;
  border: 4px solid #eee;
  border-top: 4px solid #1976d2;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

export const LoadMoreText = styled.div`
  color: #1976d2;
  font-size: 1.1rem;
  margin-top: 1rem;
`;

export const EndMessage = styled.div`
  color: #43a047;
  font-size: 1.1rem;
  margin-top: 1rem;
`;