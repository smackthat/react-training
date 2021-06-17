import * as React from 'react';
import { useParams } from 'react-router-dom';

interface Params {
  id: string;
}

export function ProductPage() {
  const { id } = useParams<Params>();

  return <h3>Product page</h3>;
}
