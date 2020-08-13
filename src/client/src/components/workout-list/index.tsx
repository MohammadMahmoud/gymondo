import React from 'react';
import Workout from '../workout-item';
import { Row, List } from 'antd';
import { Workout as WorkoutProps } from '../../types';
import { useHistory } from 'react-router-dom';

interface WorkoutListProps {
  data: WorkoutProps[];
}

/* workout list that loops thorugh workout item */

const WorkoutList: React.FC<WorkoutListProps> = ({
  data,
}: WorkoutListProps) => {
  const history = useHistory();
  return (
    <div style={{ margin: '17px' }}>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <List
          grid={{
            gutter: 32,
            xs: 1,
            sm: 1,
            md: 2,
            lg: 4,
            xl: 4,
            xxl: 4,
          }}
          style={{ width: '100%' }}
          dataSource={data}
          renderItem={(item) => (
            <List.Item onClick={() => history.push(`/workout/${item.id}`)}>
              <Workout
                description={item.description}
                category={item.category}
                startDate={item.startDate}
                image={item.image}
              />
            </List.Item>
          )}
        />
      </Row>
    </div>
  );
};

export default WorkoutList;
