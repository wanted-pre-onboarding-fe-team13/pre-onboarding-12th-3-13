import { atom, selector } from 'recoil';

import { KeywordItem } from '@/types';
import { isSearchModeState } from './searchAtoms';

export const recommendListState = atom<KeywordItem[]>({
  key: 'keywordList',
  default: [],
});

export const recentListState = atom<string[]>({
  key: 'recentList',
  default: [],
});

export const focusIndexState = atom<number>({
  key: 'focusItemIndex',
  default: -1,
});

export const keywordListLengthState = selector<number>({
  key: 'keywordListLength',
  get: ({ get }) => {
    return get(isSearchModeState) ? get(recommendListState).length : get(recentListState).length;
  },
});
