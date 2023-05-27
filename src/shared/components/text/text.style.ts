import styled from 'styled-components/native';

interface ContainerTextProps {
  color?: string;
  fontSize: string;
  customMargin?: string;
  fontFamily: 'Poppins-Bold' | 'Poppins-Light' | 'Poppins-Regular' | 'Poppins-SemiBold';
}
export const ContainerText = styled.Text<ContainerTextProps>`
  ${(props: { color: unknown }) => (props.color ? `color: ${props.color};` : '')};
  ${(props: { customMargin: unknown }) =>
    props.customMargin ? `margin: ${props.customMargin};` : ''};

  padding-top: 3px;
  font-family: ${(props: { fontFamily: unknown }) => props.fontFamily};
  font-size: ${(props: { fontSize: unknown }) => props.fontSize};
`;
