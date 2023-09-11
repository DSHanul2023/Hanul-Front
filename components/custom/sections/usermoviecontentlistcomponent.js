import React from "react";
import { Card, CardImg, CardBody, CardTitle, CardSubtitle, CardText } from "reactstrap";

const UserMovieContentListComponent = ({ recommendedMovies }) => {
  return (
    <div className="recommended-movies mt-3">
      <h4>추천 영화 목록</h4>
      {recommendedMovies.map((movie) => (
        <Card key={movie.id}>
          <CardImg top src={movie.posterUrl} alt={movie.itemNm} />
          <CardBody>
            <CardTitle>{movie.itemNm}</CardTitle>
            <CardSubtitle>{movie.genreName}</CardSubtitle>
            <CardText>{movie.itemDetail}</CardText>
          </CardBody>
        </Card>
      ))}
    </div>
  );
};

export default UserMovieContentListComponent;