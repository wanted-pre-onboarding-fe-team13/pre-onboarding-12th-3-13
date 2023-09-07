import { styled } from 'styled-components';

import { SubmitBtn, TextInput } from '.';

interface Props {
  onInputFocus: () => void;
  onInputBlur: () => void;
}

export const SearchContainer = ({ onInputFocus, onInputBlur }: Props) => {
  return (
    <Container>
      <TextInput
        placeholder="질환명을 입력해주세요."
        id="text-input"
        onInputFocus={onInputFocus}
        onInputBlur={onInputBlur}
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
