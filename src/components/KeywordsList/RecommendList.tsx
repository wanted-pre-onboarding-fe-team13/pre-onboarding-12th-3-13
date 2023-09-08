import { useRecoilState, useRecoilValue } from 'recoil';
import { KeywordListItem, KeywordsListContainer } from '.';
import { recommendListState } from '@/recoil/keywordListAtoms';
import useDebounce from '@/hooks/useDebounce';
import { searchByKeyword } from '@/apis/search';
import { isKeyDownActiveState, searchTextState } from '@/recoil/searchAtoms';
import { useState } from 'react';

export const RecommendList = () => {
  const [recommendList, setRecommendList] = useRecoilState(recommendListState);
  const isKeyDownActive = useRecoilValue(isKeyDownActiveState);
  const searchText = useRecoilValue(searchTextState);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const getResultList = async () => {
    if (isKeyDownActive) return;
    setIsLoading(true);

    try {
      const responseData = await searchByKeyword(searchText);
      const slicedData = responseData.slice(0, 6);
      setRecommendList(slicedData);
      setIsLoading(false);
    } catch (error) {
      setIsError(true);
    }
  };

  useDebounce({
    delay: 150,
    callback: getResultList,
    trigger: searchText,
  });

  return (
    <KeywordsListContainer>
      <KeywordListItem />
      {isLoading && <p className="loader">Loading...</p>}
      {isError && <p className="loader">요청이 실패했습니다. 다시 시도해주세요.</p>}
      {!isLoading && !isError && recommendList.length === 0 && (
        <>
          <p className="title">추천 검색어</p>
          <p className="empty">추천 검색어가 없습니다.</p>
        </>
      )}
      {!isLoading && !isError && recommendList.length > 0 && (
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
