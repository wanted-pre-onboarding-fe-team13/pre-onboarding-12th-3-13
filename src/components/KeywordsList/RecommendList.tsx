import { useRecoilValue } from 'recoil';
import { KeywordListItem, KeywordsListContainer } from '.';
import {  recommendListState } from '@/recoil/keywordListAtoms';


export const RecommendList = () => {
  // --- 임시 --- //
  const isLoading = false;
  const error = null;
  // --- 임시 --- //
  const recommendList = useRecoilValue(recommendListState);
  

  return (
    <KeywordsListContainer>
      <KeywordListItem />
      {isLoading && <p>Loading...</p>}
      {error && <p>Error</p>}
      {!isLoading && recommendList.length === 0 && (
        <>
          <p className="title">추천 검색어</p>
          <p className="empty">추천 검색어가 없습니다.</p>
        </>
      )}
      {!isLoading && recommendList.length > 0 && (
        <>
          <p className="title">추천 검색어</p>
          {recommendList?.map(({ sickCd, sickNm }, index) => (
            <KeywordListItem key={sickCd} keyword={sickNm} index={index} />
          ))}
        </>
      )}
    </KeywordsListContainer>
  );
};
