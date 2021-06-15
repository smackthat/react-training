import { selectProducts } from 'app/pages/HomePage/slice/selectors';
import * as React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

export function FeaturedProduct() {
  const products = useSelector(selectProducts);

  const productOfTheDay =
    products.length > 0
      ? products[Math.floor(products.length * Math.random())]
      : null;

  if (!productOfTheDay) {
    return <></>;
  }

  return (
    <>
      <h2>The product of today!</h2>
      <StyledImg src={productOfTheDay.image} />
      <p>{productOfTheDay.title}</p>
      <span>{productOfTheDay.price} €</span>
    </>
  );
}

const StyledImg = styled.img`
  max-height: 30%;
  max-width: 30%;
`;
