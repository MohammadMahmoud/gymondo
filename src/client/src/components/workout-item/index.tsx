import React from 'react';
import { Card } from 'antd';
import { Workout } from '../../types';
import { CalendarOutlined } from '@ant-design/icons';
import { formatDateAndTime } from '../../helpers';
import './style.css';

/* workout item that shows workout card */

const WorkoutItem: React.FC<Workout> = ({
  description,
  image,
  category,
  startDate,
}: Workout) => {
  return (
    <div>
      <Card hoverable cover={<img alt={description} src={image} />}>
        <Card.Meta title={category} description={description} />
        <p style={{ color: 'white' }}>
          <CalendarOutlined style={{ marginRight: '5px' }} />{' '}
          {formatDateAndTime(startDate)}
        </p>
      </Card>
    </div>
  );
};

export default WorkoutItem;
