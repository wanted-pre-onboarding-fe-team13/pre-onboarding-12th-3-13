import { useRecoilValue } from 'recoil';
import { KeywordListItem, KeywordsListContainer } from '.';
import { recentListState } from '@/recoil/keywordListAtoms';

export const RecentList = () => {
  const recentKeywords = useRecoilValue(recentListState);

  return (
    <KeywordsListContainer>
      <p className="title">최근 검색어</p>
      {recentKeywords.length === 0 && <p className="empty">최근 검색어가 없습니다.</p>}
      {recentKeywords &&
        recentKeywords.map((recentKeyword, index) => (
          <KeywordListItem key={index} keyword={recentKeyword} index={index} />
        ))}
    </KeywordsListContainer>
  );
};
