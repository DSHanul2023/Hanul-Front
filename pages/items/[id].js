import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import MovieDetailComponent from '../../components/custom/sections/movieDetailcomponent';

const MovieDetailPage = () => {
  const router = useRouter();
  const { id } = router.query; // [id]를 통해 동적으로 전달되는 영화 ID

  return (
    <div>
      {/* MovieDetailComponent로 영화 ID를 전달 */}
      <MovieDetailComponent movieId={id} />
    </div>
  );
};

export default MovieDetailPage;
