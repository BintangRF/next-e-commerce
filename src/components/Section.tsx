import React from "react";
import { Container } from "@/components/Container";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function Section(props: Readonly<ContainerProps>) {
  return (
    <div className={`min-h-screen ${props.className ? props.className : ""}`}>
      <Container>{props.children}</Container>
    </div>
  );
}
