
import { KeywordItem } from '@/types'
import { atom } from 'recoil'

export const SearchResultsAtom = atom<KeywordItem[]>({
  key:"SearchResultsAtom",
  default:[]
})