import styled from 'styled-components';

export const CountrySelectButton = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin: 20px;

  button {
    width: 90px;
    padding: 8px 16px;
    border: 1px solid #ccc;
    border-radius: 10px;
    cursor: pointer;
    background: #fff;
    font-size: 14px;
    transition: ease-out 0.2s;

    &:hover {
      background: #f0f0f0;
    }
  }
`;

export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  padding: 20px;
  justify-items: center;
`;

export const TvShowsCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 300px;
  border: 1px solid #ccc;
  border-radius: 12px;
  padding-left: 16px;
  padding-right: 16px;
  padding-top: 10px;
  padding-bottom: 10px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  transition: ease-out 0.2s;

  &:hover {
    background: #eee;
  }
`;

export const TvShowsImage = styled.img`
  height: 150px;
  object-fit: cover;
  margin-right: 20px;
  border-radius: 10px;
  background-color: #f0f0f0;
`;

export const TvShowsDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: left;
  gap: 6px;

  p {
    margin: 0;
    font-size: 15px;
    color: #222;

    &:first-child {
      font-weight: bold;
      font-size: 17px;
    }

    &:nth-child(2) {
      color: #444;
    }

    &:nth-child(3) {
      color: #ffc200;
    }
  }
`;

export const LoadMoreButton = styled.div`
  width: 300px;
  padding: 12px 24px;
  background-color: #f8f8f8;
  border: 1px solid #ddd;
  border-radius: 10px;
  cursor: pointer;
  text-align: center;
  font-weight: bold;

  &:hover {
    background-color: #eee;
  }
`;
