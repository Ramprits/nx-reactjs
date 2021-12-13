import { Link } from 'react-router-dom';

import styled from '@emotion/styled';

/* eslint-disable-next-line */
export interface RegisterProps {}

const StyledRegister = styled.div`
  color: pink;
`;

export function Register(props: RegisterProps) {
  return (
    <StyledRegister>
      <h1>Welcome to Register!</h1>

      <ul>
        <li>
          <Link to="/">register root</Link>
        </li>
      </ul>
    </StyledRegister>
  );
}

export default Register;
