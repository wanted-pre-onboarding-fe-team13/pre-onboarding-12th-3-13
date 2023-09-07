import { KeywordListItem, KeywordsListContainer } from '.';

export const RecentList = () => {
  // --- 임시 --- //
  const TEMP_RECENTKEYWORDS = ['일', '이', '삼', '사'];
  const TEMP_SELECTED_ID = 0;
  const recentKeywords = TEMP_RECENTKEYWORDS;
  const selectedId = TEMP_SELECTED_ID;
  // --- 임시 --- //

  return (
    <KeywordsListContainer>
      <p className="title">최근 검색어</p>
      {recentKeywords.length === 0 && <p className="empty">최근 검색어가 없습니다.</p>}
      {recentKeywords &&
        recentKeywords.map((recentKeyword, idx) => (
          <KeywordListItem key={idx} keyword={recentKeyword} isSelected={idx == selectedId} />
        ))}
    </KeywordsListContainer>
  );
};
