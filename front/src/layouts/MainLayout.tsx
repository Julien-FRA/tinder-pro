import { Container } from "@mui/material";
import { type PropsWithChildren } from "react";

export default function MainLayout({ children }: PropsWithChildren) {
  return <Container>{children}</Container>;
}
