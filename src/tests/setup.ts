import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { server } from './mocks/node.js';

// Cleanup after each test
afterEach(() => {
  cleanup();
});

// Establish API mocking before all tests.
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
