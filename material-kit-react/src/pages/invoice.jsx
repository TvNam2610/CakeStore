import { Helmet } from 'react-helmet-async';

import { ProductsView } from 'src/sections/invoice/view';

// ----------------------------------------------------------------------

export default function FlavorPage() {
  return (
    <>
      <Helmet>
        <title> Invoice | Cake Store of TVN </title>
      </Helmet>

      <ProductsView />
    </>
  );
}
