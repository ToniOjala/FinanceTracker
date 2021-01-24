import { Category } from "../../shared/types";

export const sampleCategories: Category[] = [
  {
    id: 2,
    name: 'Test Category 1',
    type: 'income',
    balance: 0,
    created: '2019',
  },
  {
    id: 1,
    name: 'Test Category 2',
    type: 'expense',
    balance: 100,
    created: '2018',
  },
  {
    id: 3,
    name: 'Test Category 3',
    type: 'expense',
    balance: 3300,
    created: '2015',
  },
  {
    id: 4,
    name: 'Test Category 4',
    type: 'expense',
    balance: 0,
    created: '2016',
    removed: '2018'
  }
]