import { styled } from 'styled-components';
import { useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';

import { SubmitBtn, TextInput } from '.';

import { isKeyDownActiveState, isShowKeywordListState } from '@/recoil/searchAtoms';
import { focusIndexState, keywordListLengthState } from '@/recoil/keywordListAtoms';

const MAX_LIST_ITEM = 7;

export const SearchContainer = () => {
  const [focusIndex, setFocusIndex] = useRecoilState(focusIndexState);
  const keywordListLength = useRecoilValue(keywordListLengthState);
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

  const handleKeyDownInput = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.nativeEvent.isComposing) return;

    const maxIndex = Math.min(keywordListLength, MAX_LIST_ITEM) - 1;

    if (event.key === 'ArrowDown') {
      const nextIndex = focusIndex < maxIndex ? focusIndex + 1 : 0;

      setIsKeyDownActive(true);
      setFocusIndex(nextIndex);
    }

    if (event.key === 'ArrowUp') {
      const prevIndex = focusIndex > 0 ? focusIndex - 1 : maxIndex;

      setIsKeyDownActive(true);
      setFocusIndex(prevIndex);
    }

    if (event.key === 'Escape') {
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
