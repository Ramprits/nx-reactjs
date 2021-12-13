import styled from '@emotion/styled';

/* eslint-disable-next-line */
export interface OrderProps {}

const StyledOrder = styled.div`
  color: pink;
`;

export function Order(props: OrderProps) {
  return (
    <StyledOrder>
      <h1>Welcome to Order!</h1>
    </StyledOrder>
  );
}

export default Order;
