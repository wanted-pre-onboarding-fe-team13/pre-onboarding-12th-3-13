import { ChangeEvent, useState } from 'react';
import { styled } from 'styled-components';

interface Props {
  placeholder: string;
  onInputFocus: () => void;
  onInputBlur: () => void;
  id: string;
}

export const TextInput = ({ placeholder, onInputFocus, onInputBlur, id, ...rest }: Props) => {
  const [inputValue, setInputValue] = useState<string>('');

  const keywordOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    // setSelectedId(-1);
  };

  return (
    <StyledInput
      type="text"
      placeholder={placeholder}
      value={inputValue}
      onChange={keywordOnChange}
      onFocus={onInputFocus}
      onBlur={onInputBlur}
      autoComplete="off"
      id={id}
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
