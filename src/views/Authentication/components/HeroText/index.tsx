import React from "react";
import {
  Container,
  RotatedRectangle,
  Title,
  Line,
  UnderlineContainer,
} from "./styles";

export const Underline = ({ children }) => (
  <UnderlineContainer>
    <Line />
    {children}
  </UnderlineContainer>
);

export const RectangleHighLight = ({ children }) => (
  <UnderlineContainer>
    <RotatedRectangle />
    {children}
  </UnderlineContainer>
);

const HeroText: React.FC = () => {
  return (
    <Container>
      <Title>Encuentra lo que </Title>
      <RectangleHighLight>
        <Title style={{ color: "white" }}>buscas</Title>
      </RectangleHighLight>
      <Title> cerca de </Title>
      <RectangleHighLight>
        <Title style={{ color: "white" }}>ti</Title>
      </RectangleHighLight>
    </Container>
  );
};

export default HeroText;
