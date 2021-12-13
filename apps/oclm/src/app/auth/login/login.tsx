import { Link } from 'react-router-dom';

import styled from '@emotion/styled';

/* eslint-disable-next-line */
export interface LoginProps {}

const StyledLogin = styled.div`
  color: pink;
`;

export function Login(props: LoginProps) {
  return (
    <StyledLogin>
      <h1>Welcome to Login!</h1>

      <ul>
        <li>
          <Link to="/">login root</Link>
        </li>
      </ul>
    </StyledLogin>
  );
}

export default Login;
