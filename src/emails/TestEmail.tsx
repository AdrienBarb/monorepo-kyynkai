import { Html, Body, Text } from '@react-email/components';
import * as React from 'react';

const TestEmail = () => {
  return (
    <Html>
      <Body>
        <Text>Test Email</Text>
      </Body>
    </Html>
  );
};

export default TestEmail;

export const previewProps = {};

