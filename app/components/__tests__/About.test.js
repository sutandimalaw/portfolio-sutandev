import React from 'react';
import { render, screen } from '@testing-library/react';
import About from '../About'; // Assuming About.jsx is in the parent directory
import { assets } from '@/assets/assets'; // Import the original assets

// Mock the assets module
jest.mock('@/assets/assets', () => ({
  assets: {
    user_image: 'mocked-user-image.png',
  },
  infoList: [
    {
      icon: 'mocked-icon-light-1.png',
      iconDark: 'mocked-icon-dark-1.png',
      title: 'Mocked Info Title 1',
      description: 'Mocked info description 1.',
    },
    {
      icon: 'mocked-icon-light-2.png',
      iconDark: 'mocked-icon-dark-2.png',
      title: 'Mocked Info Title 2',
      description: 'Mocked info description 2.',
    },
  ],
  toolsData: ['mocked-tool-icon-1.png', 'mocked-tool-icon-2.png', 'mocked-tool-icon-3.png'],
}));

describe('About Component', () => {
  test('renders without crashing', () => {
    render(<About isDarkMode={false} />);
  });

  test('renders "Introduction" heading', () => {
    render(<About isDarkMode={false} />);
    expect(screen.getByText(/Introduction/i)).toBeInTheDocument();
  });

  test('renders "About Me" heading', () => {
    render(<About isDarkMode={false} />);
    expect(screen.getByText(/About Me/i)).toBeInTheDocument();
  });

  test('renders user image', () => {
    render(<About isDarkMode={false} />);
    const userImage = screen.getByAltText('user');
    expect(userImage).toBeInTheDocument();
    // Check if the mocked user_image is used
    expect(userImage).toHaveAttribute('src', 'mocked-user-image.png');
  });

  test('renders info items with correct icons based on isDarkMode (false)', () => {
    render(<About isDarkMode={false} />);
    // Check for the title of the first mocked info item
    expect(screen.getByText('Mocked Info Title 1')).toBeInTheDocument();
    // Check if the light mode icon is used for the first item
    const infoIcon1 = screen.getByAltText('Mocked Info Title 1');
    expect(infoIcon1).toHaveAttribute('src', 'mocked-icon-light-1.png');

    // Check for the title of the second mocked info item
    expect(screen.getByText('Mocked Info Title 2')).toBeInTheDocument();
    // Check if the light mode icon is used for the second item
    const infoIcon2 = screen.getByAltText('Mocked Info Title 2');
    expect(infoIcon2).toHaveAttribute('src', 'mocked-icon-light-2.png');
  });

  test('renders info items with correct icons based on isDarkMode (true)', () => {
    render(<About isDarkMode={true} />);
    // Check for the title of the first mocked info item
    expect(screen.getByText('Mocked Info Title 1')).toBeInTheDocument();
    // Check if the dark mode icon is used for the first item
    const infoIcon1 = screen.getByAltText('Mocked Info Title 1');
    expect(infoIcon1).toHaveAttribute('src', 'mocked-icon-dark-1.png');

    // Check for the title of the second mocked info item
    expect(screen.getByText('Mocked Info Title 2')).toBeInTheDocument();
    // Check if the dark mode icon is used for the second item
    const infoIcon2 = screen.getByAltText('Mocked Info Title 2');
    expect(infoIcon2).toHaveAttribute('src', 'mocked-icon-dark-2.png');
  });

  test('renders the correct number of infoList items', () => {
    render(<About isDarkMode={false} />);
    // Assuming each info item's title is rendered and unique
    const infoItemTitles = screen.getAllByText(/Mocked Info Title \d/);
    expect(infoItemTitles.length).toBe(2); // Corresponds to the length of mocked infoList
  });

  test('renders tool icons and checks their sources', () => {
    render(<About isDarkMode={false} />);
    // Assuming tool icons have a generic alt text 'tool-icon' or specific ones if available
    // If the About component uses the URL as part of the alt text or a key:
    const toolIcon1 = screen.getByAltText('mocked-tool-icon-1.png');
    expect(toolIcon1).toBeInTheDocument();
    expect(toolIcon1).toHaveAttribute('src', 'mocked-tool-icon-1.png');

    const toolIcon2 = screen.getByAltText('mocked-tool-icon-2.png');
    expect(toolIcon2).toBeInTheDocument();
    expect(toolIcon2).toHaveAttribute('src', 'mocked-tool-icon-2.png');

    const toolIcon3 = screen.getByAltText('mocked-tool-icon-3.png');
    expect(toolIcon3).toBeInTheDocument();
    expect(toolIcon3).toHaveAttribute('src', 'mocked-tool-icon-3.png');
  });

  test('renders the correct number of toolData items', () => {
    render(<About isDarkMode={false} />);
    // Assuming the alt text for tool icons is based on their file names or a generic one
    // If alt text is specific, e.g., 'tool-icon-mocked-tool-icon-1.png'
    // This example assumes a more generic way or that the alt text is the filename itself
    const toolIcons = screen.getAllByAltText(/mocked-tool-icon-\d\.png/i);
    expect(toolIcons.length).toBe(3); // Corresponds to the length of mocked toolsData
  });

  test('renders the main motion.div container with id "about"', () => {
    const { container } = render(<About isDarkMode={false} />);
    // The About component itself is a motion.div. We look for its presence.
    // If the component's root element receives the id="about"
    const aboutSection = container.querySelector('#about');
    expect(aboutSection).toBeInTheDocument();
  });
});
