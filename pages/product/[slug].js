import React from 'react';
import { useRouter } from 'next/router';
import data from '../../utils/data';
export default function Productscreen() {
  const route = useRouter();
  const { slug } = route.query;
  const product = data.products.find((e) => e.slug === slug);

  if (!product) {
    return <div>No Product Found</div>;
  }

  return <div>{product.name}</div>;
}
