import styled from 'styled-components/native';

interface ContainerTextProps {
  color?: string;
  fontSize: string;
}
export const ContainerText = styled.Text<ContainerTextProps>`
  ${(props: { color: unknown }) => (props.color ? `color: ${props.color}` : '')};

  font-size: ${(props: { fontSize: unknown }) => props.fontSize};
`;
