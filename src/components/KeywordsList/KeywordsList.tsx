import { styled } from 'styled-components';

import { RecentList, RecommendList } from '.';

export const KeywordsList = () => {
  // --- 임시 --- //
  const TEMP_KEYWORD = '';
  const keyword = TEMP_KEYWORD;
  // --- 임시 --- //

  const list_type = keyword === '' ? 'recent' : 'recommended';

  return (
    <>
      {list_type === 'recent' && <RecentList />}
      {list_type === 'recommended' && <RecommendList />}
    </>
  );
};

export const KeywordsListContainer = styled.div`
  background-color: white;
  padding: 24px 0 24px 0;
  max-height: 360px;
  width: 100%;
  overflow: scroll;
  overflow-x: hidden;
  position: absolute;
  box-sizing: border-box;
  margin-top: 8px;
  border-radius: 24px;

  .title {
    margin-left: 24px;
    margin-bottom: 24px;
    margin-top: 24px;
    font-size: 14px;
    color: ${({ theme }) => theme.color.grey600};
  }

  .empty {
    margin-left: 24px;
    color: ${({ theme }) => theme.color.grey400};
  }
`;
