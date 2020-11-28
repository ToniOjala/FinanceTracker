import { CssBaseline } from '@material-ui/core';
import React from 'react';
import { CategoryList } from './features/CategoryList';
import { useGetCategories } from './hooks/useCategories';

// const theme = createMuiTheme({
//   palette: {
//     type: 'dark',
//     primary: {
//       light: '#CBD0C9',
//       main: '69927B',
//       dark: ''
//     },
//     background: {
//       paper: '424242',
//       default: '#303030'
//     }
//   }
// })

const App = (): JSX.Element | null => {
  const categories = useGetCategories();
  console.log('categories: ', categories);

  if (categories.length === 0) return null;

  return (
    <>
      <CssBaseline />
      <CategoryList categories={categories} />
    </>
  );
}

export default App;
