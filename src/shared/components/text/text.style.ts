import styled from 'styled-components/native';

interface ContainerTextProps {
  color?: string;
  fontSize: string;
  fontFamily: 'Poppins-Bold' | 'Poppins-Light' | 'Poppins-Regular';
}
export const ContainerText = styled.Text<ContainerTextProps>`
  ${(props: { color: unknown }) => (props.color ? `color: ${props.color}` : '')};

  padding-top: 3px;
  font-family: ${(props: { fontFamily: unknown }) => props.fontFamily};
  font-size: ${(props: { fontSize: unknown }) => props.fontSize};
`;
