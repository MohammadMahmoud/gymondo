import React from 'react';
import { Menu, Select } from 'antd';
import { categories } from '../../enum';
import { getNextTwelveMonths } from '../../helpers';
import './style.css';

interface FiltersBarProps {
  handleDateFilter: (date: string) => void;
  handleCategoryFilter: (categories: string[]) => void;
}

/* top filter component in order to filter the workouts */

const FiltersBar: React.FC<FiltersBarProps> = ({
  handleDateFilter,
  handleCategoryFilter,
}: FiltersBarProps) => {
  const months = getNextTwelveMonths();

  return (
    <Menu mode='horizontal' style={{ textAlign: 'center' }}>
      <Menu.Item>
        Filter By Start Date :{' '}
        <Select
          defaultValue={months[0]}
          onChange={(value) => handleDateFilter(value as string)}
          style={{ width: 200 }}
        >
          {months.map((value, index) => (
            <Select.Option value={value} key={index}>
              {value}
            </Select.Option>
          ))}
        </Select>
      </Menu.Item>

      <Menu.Item>
        Filter By Category :{' '}
        <Select
          mode='multiple'
          style={{ width: '500px' }}
          placeholder='Please select'
          onChange={(value) => handleCategoryFilter(value as string[])}
        >
          {categories.map((value, index) => (
            <Select.Option value={value} key={index}>
              {value}
            </Select.Option>
          ))}
        </Select>
      </Menu.Item>
    </Menu>
  );
};

export default FiltersBar;
