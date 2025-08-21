import { render, screen } from '@testing-library/react';
// Components
import App from '@/App';

describe('Initial test', () => {
  it('should pass a test', () => {
    expect(true).toBeTruthy();
  });

  it('should run a test', () => {
    render(<App />);
    const heading = screen.queryByText('SkillGrow');
    expect(heading).toBeInTheDocument();
  });
});
