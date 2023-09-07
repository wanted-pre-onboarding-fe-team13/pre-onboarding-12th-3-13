import { useRecoilState, useResetRecoilState } from 'recoil';
import { styled } from 'styled-components';

import { focusIndexState } from '@/recoil/keywordListAtoms';

interface Props {
  keyword?: string;
  index?: number;
}

export const KeywordListItem = ({ keyword = '검색어', index, ...rest }: Props) => {
  const [focusIndex, setFocusIndex] = useRecoilState(focusIndexState);
  const resetFocusIndex = useResetRecoilState(focusIndexState);

  const handleMouseOver = () => {
    if (index === undefined) return;

    setFocusIndex(index);
  };

  const handleMouseOut = () => {
    resetFocusIndex();
  };

  return (
    <Container
      $isSelected={index === focusIndex}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      {...rest}
    >
      <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
        <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
      </svg>
      <span>{keyword}</span>
    </Container>
  );
};

const Container = styled.div<{ $isSelected: boolean }>`
  display: flex;
  gap: 8px;
  padding: 12px 24px 12px 24px;
  align-items: center;

  ${({ theme, $isSelected }) =>
    $isSelected &&
    `
    background-color: ${theme.color.grey100};
  `}

  span {
    color: ${({ theme }) => theme.color.fontPrimary};
  }

  svg {
    fill: ${({ theme }) => theme.color.grey200};
  }
`;
