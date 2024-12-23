// components
import ContentWrapper from '../layout/ContentWrapper';
import PageSubHeader from '../utility/PageSubHeader';
import HorizontalSmallCardsCarousel from '../utility/reels/HorizontalSmallCardsCarousel';
import MovieSmallCard from '../utility/cards/MovieSmallCard';

// types
import {Movie} from '../../../types/MoviesTypes';

// TODO handle undefined
function MovieCategorySlider({categoryList, category}: {categoryList: Movie[]; category: string | undefined}) {
  return (
    <>
      <ContentWrapper padding>
        <PageSubHeader headerText={category} />
      </ContentWrapper>
      <HorizontalSmallCardsCarousel>
        {categoryList.map((movie: Movie, i: number) => (
          <MovieSmallCard movie={movie} key={i} />
        ))}
      </HorizontalSmallCardsCarousel>
    </>
  );
}

export default MovieCategorySlider;
