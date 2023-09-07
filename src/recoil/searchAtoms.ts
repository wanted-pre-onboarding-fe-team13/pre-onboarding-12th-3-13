import { atom, selector } from 'recoil';

export const searchTextState = atom<string>({
  key: 'searchText',
  default: '',
});

export const isShowKeywordListState = atom<boolean>({
  key: 'isShowKeywordList',
  default: false,
});

export const isKeyDownActiveState = atom<boolean>({
  key: 'isKeyDownActive',
  default: false,
});

export const isSearchModeState = selector({
  key: 'isSearchMode',
  get: ({ get }) => {
    return !!get(searchTextState);
  },
});
