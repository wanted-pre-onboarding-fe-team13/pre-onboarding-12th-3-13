import { styled } from 'styled-components';
import { useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';

import { SubmitBtn, TextInput } from '.';

import {
  isKeyDownActiveState,
  isSearchModeState,
  isShowKeywordListState,
  searchTextState,
} from '@/recoil/searchAtoms';
import {
  focusIndexState,
  keywordListLengthState,
  recentListState,
  recommendListState,
} from '@/recoil/keywordListAtoms';
import { endOfComposing } from '@/utils';

const MAX_LIST_ITEM = 7;

export const SearchContainer = () => {
  const [focusIndex, setFocusIndex] = useRecoilState(focusIndexState);
  const isSearchMode = useRecoilValue(isSearchModeState);
  const keywordListLength = useRecoilValue(keywordListLengthState);
  const recommendList = useRecoilValue(recommendListState);
  const recentList = useRecoilValue(recentListState);
  const setSerachText = useSetRecoilState(searchTextState);
  const setIsShowKeywordList = useSetRecoilState(isShowKeywordListState);
  const setIsKeyDownActive = useSetRecoilState(isKeyDownActiveState);
  const resetFocusIndex = useResetRecoilState(focusIndexState);

  const handleFocusInput = () => {
    setIsShowKeywordList(true);
  };

  const handleBlurInput = () => {
    setIsShowKeywordList(false);
    setIsKeyDownActive(false);
  };

  const getKeyword = (index: number) => {
    if (index < 0) return '';

    const keyword = isSearchMode ? recommendList[index].sickNm : recentList[index];

    return keyword;
  };

  const handleKeyDownInput = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.nativeEvent.isComposing) return;

    const maxIndex = Math.min(keywordListLength, MAX_LIST_ITEM) - 1;

    if (event.key === 'ArrowDown' && maxIndex > -1) {
      const nextIndex = focusIndex < maxIndex ? focusIndex + 1 : 0;

      endOfComposing();

      setIsKeyDownActive(true);
      setFocusIndex(nextIndex);

      const keyword = getKeyword(nextIndex);

      if (keyword) {
        setSerachText(keyword);
      }
    }

    if (event.key === 'ArrowUp' && maxIndex > -1) {
      const prevIndex = focusIndex > 0 ? focusIndex - 1 : maxIndex;

      endOfComposing();

      setIsKeyDownActive(true);
      setFocusIndex(prevIndex);

      const keyword = getKeyword(prevIndex);

      if (keyword) {
        setSerachText(keyword);
      }
    }

    if (event.key === 'Escape') {
      event.preventDefault();

      setIsShowKeywordList(false);
      resetFocusIndex();
    }
  };
  return (
    <Container>
      <TextInput
        placeholder="질환명을 입력해주세요."
        id="text-input"
        onFocus={handleFocusInput}
        onBlur={handleBlurInput}
        onKeyDown={handleKeyDownInput}
      />
      <SubmitBtn />
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  background-color: white;
  padding: 8px 8px 8px 24px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  border-radius: 99px;
  align-items: center;

  & div:first-child {
    margin-right: 8px;
  }
`;
