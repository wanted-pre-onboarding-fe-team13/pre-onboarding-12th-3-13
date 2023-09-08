// TODO : 유틸함수 내보내기 추가 시 아래 주석 지우기
export const endOfComposing = () => {
  const event = new KeyboardEvent('keydown', {
    key: 'ArrowRight',
    keyCode: 39,
    which: 39,
  });

  document.activeElement?.dispatchEvent(event);
};
