import { Link } from 'react-router-dom';

import styled from '@emotion/styled';

/* eslint-disable-next-line */
export interface ProfileProps {}

const StyledProfile = styled.div`
  color: pink;
`;

export function Profile(props: ProfileProps) {
  return (
    <StyledProfile>
      <h1>Welcome to Profile!</h1>

      <ul>
        <li>
          <Link to="/">profile root</Link>
        </li>
      </ul>
    </StyledProfile>
  );
}

export default Profile;
