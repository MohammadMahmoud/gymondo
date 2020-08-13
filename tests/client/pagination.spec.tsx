import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Pagination from '../../src/client/src/components/pagination';
import { Pagination as PaginationComponent } from 'antd';
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
    <Pagination
      totalPages={100}
      currentPage={1}
      handlePagenation={() => console.log()}
    />
  );
});

afterAll(() => {
  wrapper.unmount();
});
describe('testing Pagination component', () => {
  it('should find current page inside Pagination component ', () => {
    expect(wrapper.find(PaginationComponent).props().current).toEqual(1);
  });

  it('should find total page inside Pagination component ', () => {
    expect(wrapper.find(PaginationComponent).props().total).toEqual(100);
  });
});
