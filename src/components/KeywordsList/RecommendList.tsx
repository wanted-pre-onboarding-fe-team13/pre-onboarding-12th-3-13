import { KeywordListItem, KeywordsListContainer } from '.';

export const RecommendList = () => {
  // --- 임시 --- //
  const isLoading = false;
  const error = null;
  const selectedId = 0;
  const data = [
    {
      sickCd: 'C23',
      sickNm: '담낭의 악성 신생물',
    },
    {
      sickCd: 'K81',
      sickNm: '담낭염',
    },
    {
      sickCd: 'K82',
      sickNm: '담낭의 기타 질환',
    },
    {
      sickCd: 'K87',
      sickNm: '달리 분류된 질환에서의 담낭, 담도 및 췌장의 장애',
    },
    {
      sickCd: 'Q44',
      sickNm: '담낭, 담관 및 간의 선천기형',
    },
  ];
  // --- 임시 --- //

  return (
    <KeywordsListContainer>
      <KeywordListItem />
      {isLoading && <p>Loading...</p>}
      {error && <p>Error</p>}
      {!isLoading && data.length === 0 && (
        <>
          <p className="title">추천 검색어</p>
          <p className="empty">추천 검색어가 없습니다.</p>
        </>
      )}
      {!isLoading && data.length > 0 && (
        <>
          <p className="title">추천 검색어</p>
          {data?.map(({ sickCd, sickNm }, idx) => (
            <KeywordListItem key={sickCd} keyword={sickNm} isSelected={idx == selectedId} />
          ))}
        </>
      )}
    </KeywordsListContainer>
  );
};
