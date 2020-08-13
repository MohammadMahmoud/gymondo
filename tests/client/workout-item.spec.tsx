import React from 'react';
import Enzyme, { mount } from 'enzyme';
import WorkoutItem from '../../src/client/src/components/workout-item';
import Adapter from 'enzyme-adapter-react-16';
import { formatDateAndTime } from '../../src/client/src/helpers';
import 'jsdom-global/register';
import { Card } from 'antd';

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
    <WorkoutItem
      description={'30 min Get in Shape workout'}
      image={
        'https://cdn4.service.prod.gymondo.io/frontend-pre-login/587/static/551eac486b5ba477c6a7e38c72f0c1f4/e1738/webapp-titleimage-2x.jpg'
      }
      category={'c1'}
    />
  );
});

afterAll(() => {
  wrapper.unmount();
});

describe('testing WorkoutItem component', () => {
  it('should find card inside WorkoutItem component', () => {
    expect(wrapper.find(Card).length).toEqual(1);
  });

  it('should find img inside WorkoutItem component', () => {
    expect(wrapper.find('img').props().src).toEqual(
      'https://cdn4.service.prod.gymondo.io/frontend-pre-login/587/static/551eac486b5ba477c6a7e38c72f0c1f4/e1738/webapp-titleimage-2x.jpg'
    );
  });
  it('should find title inside WorkoutItem component ', () => {
    expect(wrapper.find('.ant-card-meta-title').text()).toEqual('c1');
  });
  it('should find title inside WorkoutItem component', () => {
    expect(wrapper.find('.ant-card-meta-description').text()).toEqual(
      '30 min Get in Shape workout'
    );
  });
  it('should find date inside WorkoutItem component', () => {
    expect(wrapper.find('p').text()).toEqual(
      ` ${formatDateAndTime(new Date())}`
    );
  });
});
