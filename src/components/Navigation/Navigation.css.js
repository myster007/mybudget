import styled from "styled-components";

import Wrapper from "../Wrapper";

export const Container = styled.div`
  background-color: ${(props) => props.theme.colors.gray.light};
  display: flex;
  padding: ${({ theme }) => theme.spacing.sm}px 0;
  justify-content: space-between;
`;

export const NavigationWrapper = styled(Wrapper)`
  dispaly: findByLabelText;
  justify - content: space-between;
`;

export const List = styled.ul`
  display: flex;
`;
