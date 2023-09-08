import { useRef } from 'react';
import { styled } from 'styled-components';
import { useRecoilState, useResetRecoilState, useSetRecoilState } from 'recoil';

import { focusIndexState } from '@/recoil/keywordListAtoms';
import { isKeyDownActiveState, searchTextState } from '@/recoil/searchAtoms';

export const TextInput = ({ ...rest }: React.InputHTMLAttributes<HTMLInputElement>) => {
  const [searchText, setSearchText] = useRecoilState(searchTextState);
  const setIsKeyDownActive = useSetRecoilState(isKeyDownActiveState);
  const resetFocusIndex = useResetRecoilState(focusIndexState);

  const inputRef = useRef<HTMLInputElement>(null);

  const keywordOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setIsKeyDownActive(false);
    setSearchText(value);
    resetFocusIndex();
  };

  return (
    <StyledInput
      type="text"
      value={searchText}
      onChange={keywordOnChange}
      autoComplete="off"
      ref={inputRef}
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
