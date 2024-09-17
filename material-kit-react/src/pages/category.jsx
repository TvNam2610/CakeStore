import { Helmet } from 'react-helmet-async';

import { ProductsView } from 'src/sections/category/view';

// ----------------------------------------------------------------------

export default function CategoryPage() {
  return (
    <>
      <Helmet>
        <title> Category | Cake Store of TVN </title>
      </Helmet>

      <ProductsView />
    </>
  );
}
