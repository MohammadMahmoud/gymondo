import React from 'react';
import Enzyme, { mount } from 'enzyme';
import FilterBar from '../../src/client/src/components/filters-bar';
import { Select } from 'antd';
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
  wrapper = mount(
    <FilterBar
      handleCategoryFilter={() => console.log()}
      handleDateFilter={() => console.log()}
    />
  );
});

describe('testing FilterBar component', () => {
  it('should find the two select component inside filterBar', () => {
    expect(wrapper.find(Select).length).toEqual(2);
  });
});
