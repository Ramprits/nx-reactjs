import styled from '@emotion/styled';
import { useEffect } from 'react';
import { useAppDispatch } from '../../hook';
import { fetchProduct } from './product.slice';
/* eslint-disable-next-line */
export interface ProductProps {}

const StyledProduct = styled.div`
  color: pink;
`;

export function Product(props: ProductProps) {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const promise = dispatch(fetchProduct());
    return () => promise.abort();
  }, [dispatch]);

  return (
    <StyledProduct>
      <h1>Welcome to Product!</h1>
    </StyledProduct>
  );
}

export default Product;
