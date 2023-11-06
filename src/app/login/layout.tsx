import { Container, Flex } from '@mantine/core';
import React, { ReactNode } from 'react';

export default function LoginLayout({ children }: { children: ReactNode; }) {
  return (
    <Flex justify="center" align="center" mih="100vh" style={{ backgroundColor: "#eee" }}>
      {children}
    </Flex>
  );
};
