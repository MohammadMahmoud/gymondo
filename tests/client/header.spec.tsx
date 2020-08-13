import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Header from '../../src/client/src/components/header';
import Adapter from 'enzyme-adapter-react-16';
import 'jsdom-global/register';

Enzyme.configure({ adapter: new Adapter() });

let wrapper;

beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // deprecated
      removeListener: jest.fn(), // deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
  wrapper = mount(<Header />);
});

afterAll(() => {
  wrapper.unmount();
});

describe('testing Header component', () => {
  it('should find the logo inside the header', () => {
    expect(wrapper.find('svg').length).toEqual(1);
  });
});
