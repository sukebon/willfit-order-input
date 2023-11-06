import { Box, Button, Center, Paper, PasswordInput, TextInput } from '@mantine/core';
import React from 'react';

const Login = () => {
  return (
    <Paper shadow="xs" p="xl" w="100%" maw='400px' bg="white">
      <Center>Login</Center>
      <TextInput
        leftSectionPointerEvents="none"
        label="email"
        placeholder="Your email"
      />
      <PasswordInput
        mt={12}
        label="password"
        placeholder="password"
      />
      <Button mt={24} fullWidth>ログイン</Button>
    </Paper>
  );
};

export default Login;