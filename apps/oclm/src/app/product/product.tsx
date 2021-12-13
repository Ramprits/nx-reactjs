import styled from '@emotion/styled';

/* eslint-disable-next-line */
export interface ProductProps {}

const StyledProduct = styled.div`
  color: pink;
`;

export function Product(props: ProductProps) {
  return (
    <StyledProduct>
      <h1>Welcome to Product!</h1>
    </StyledProduct>
  );
}

export default Product;
