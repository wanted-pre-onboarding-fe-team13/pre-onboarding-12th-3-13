import { styled } from 'styled-components';
import { useRecoilValue } from 'recoil';

import { RecentList, RecommendList } from '.';
import { isSearchModeState } from '@/recoil/searchAtoms';

export const KeywordsList = () => {
  const isSearchMode = useRecoilValue(isSearchModeState);

  return (
    <>
      {!isSearchMode && <RecentList />}
      {isSearchMode && <RecommendList />}
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
