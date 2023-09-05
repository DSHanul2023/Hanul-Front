import { useRouter } from 'next/router';
import MinichatContentList from '../components/custom/sections/minichatcontentlistcomponent';

const MinichatContentListPage = () => {
    const router = useRouter();
    const { recommendedMovies } = router.query;

    // recommendedMovies를 파싱하여 배열로 변환
    const parsedRecommendedMovies = recommendedMovies ? JSON.parse(recommendedMovies) : [];

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '40px' }}>
            <h4>추천된 영화 목록</h4>
            <MinichatContentList recommendedMovies={parsedRecommendedMovies} />
        </div>

    );
}

export default MinichatContentListPage;
