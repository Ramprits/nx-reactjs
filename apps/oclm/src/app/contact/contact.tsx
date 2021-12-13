import styled from '@emotion/styled';

/* eslint-disable-next-line */
export interface ContactProps {}

const StyledContact = styled.div`
  color: pink;
`;

export function Contact(props: ContactProps) {
  return (
    <StyledContact>
      <h1>Welcome to Contact!</h1>
    </StyledContact>
  );
}

export default Contact;
