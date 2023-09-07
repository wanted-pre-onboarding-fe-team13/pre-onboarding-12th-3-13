import { useState } from 'react';
import { styled } from 'styled-components';

import { KeywordsList, SearchContainer } from '@/components';

const Search = () => {
  const [showKeywordsList, setShowKeywordsList] = useState<boolean>(false);

  const onInputFocus = () => setShowKeywordsList(true);
  const onInputBlur = () => setShowKeywordsList(false);

  return (
    <Container>
      <h2>
        국내 모든 임상시험 검색하고
        <br /> 온라인으로 참여하기
      </h2>
      <SearchContainer onInputFocus={onInputFocus} onInputBlur={onInputBlur} />
      {showKeywordsList && <KeywordsList />}
    </Container>
  );
};

export default Search;

const Container = styled.div`
  width: 500px;
  position: relative;
  height: 100%;
  padding: 80px 0px 0px 0px;

  h2 {
    font-size: 40px;
    text-align: center;
    font-weight: 700;
    line-height: 1.6;
    margin-bottom: 40px;
  }
`;
