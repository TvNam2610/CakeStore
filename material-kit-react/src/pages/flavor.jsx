import { Helmet } from 'react-helmet-async';

import { ProductsView } from 'src/sections/flavor/view';

// ----------------------------------------------------------------------

export default function FlavorPage() {
  return (
    <>
      <Helmet>
        <title> Flavor | Cake Store of TVN </title>
      </Helmet>

      <ProductsView />
    </>
  );
}
