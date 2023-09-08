import { useEffect, useRef } from 'react';
import { styled } from 'styled-components';
import { useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';

import { focusIndexState, recentListState, recommendListState } from '@/recoil/keywordListAtoms';
import { isKeyDownActiveState, isSearchModeState, searchTextState } from '@/recoil/searchAtoms';
import { searchByKeyword } from '@/apis/search';
import useDebounce from '@/hooks/useDebounce';

export const TextInput = ({ ...rest }: React.InputHTMLAttributes<HTMLInputElement>) => {
  const [searchText, setSearchText] = useRecoilState(searchTextState);
  const isSearchMode = useRecoilValue(isSearchModeState);
  const recommendList = useRecoilValue(recommendListState);
  const recentList = useRecoilValue(recentListState);
  const isKeyDownActive = useRecoilValue(isKeyDownActiveState);
  const focusIndex = useRecoilValue(focusIndexState);
  const resetFocusIndex = useResetRecoilState(focusIndexState);
  const setRecommendList = useSetRecoilState(recommendListState);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isKeyDownActive && focusIndex >= 0 && inputRef.current) {
      const keyword = isSearchMode ? recommendList[focusIndex].sickNm : recentList[focusIndex];

      setSearchText(keyword);

      inputRef.current.selectionStart = keyword.length;
      inputRef.current.selectionEnd = keyword.length;
    }
  }, [focusIndex]);

  const getResultList = async () => {
    if (isKeyDownActive) return;
    const responseData = await searchByKeyword(searchText);
    const slicedData = responseData.slice(0, 6);
    setRecommendList(slicedData);
  };

  const keywordOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchText(value);
    resetFocusIndex();
  };

  useDebounce({
    delay: 300,
    callback: getResultList,
    trigger: searchText,
  });

  return (
    <StyledInput
      type="text"
      value={searchText}
      onChange={keywordOnChange}
      autoComplete="off"
      {...rest}
    />
  );
};

const StyledInput = styled.input`
  border: none;
  outline: none;
  width: calc(100% - 56px);
  height: fit-content;
  background-color: transparent;
  font-size: 16px;
  color: ${({ theme }) => theme.color.fontPrimary};

  &::placeholder {
    color: ${({ theme }) => theme.color.grey200};
  }
`;
