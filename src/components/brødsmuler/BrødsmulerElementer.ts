import styled from 'styled-components';
import { device } from '../../utils/styles';

export const StyledBrødsmuler = styled.div`
  font-size: 16px;
  width: 100%;
  margin-top: 1rem;
  padding-bottom: 1rem;
  text-align: center;
  margin-right: 500px;

  @media ${device.tablet} {
    text-align: left;
    margin-right: 0;
    margin-left: 30px;
  }
`;

export const Brødsmule = styled.span`
  margin-left: 5px;
  margin-right: 5px;

  a {
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }
`;
