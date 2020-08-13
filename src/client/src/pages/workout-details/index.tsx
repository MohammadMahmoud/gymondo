import React, { useEffect, useState } from 'react';
import { PageHeader, Result } from 'antd';
import { useHistory } from 'react-router-dom';
import { FireOutlined, CalendarOutlined } from '@ant-design/icons';
import {
  timeoutPromise,
  errorMessageModal,
  formatDateAndTime,
} from '../../helpers';
import { Workout } from '../../types';
import './style.css';

/* Workout details page where it shows the workout details when use click on one of the workouts */

const WorkoutDetails: React.FC = () => {
  /* State for current workout , it set by fetching from the api */
  const [workout, setWorkout] = useState<Workout>();
  /* React-Router histroy for the back button and also get id from URL */
  const history = useHistory();
  const id = history.location.pathname.split('/')[2];

  /* Once component init , it will fetch data from server by ID from URL and set Workout Data also handle any error occurs */
  useEffect(() => {
    timeoutPromise(
      fetch(`${process.env.REACT_APP_API_URL}/${id}`)
        .then((response) => response.json())
        .then((data) => {
          if (!data.message.image) {
            errorMessageModal(`Workout with ${id} not found`);
            return;
          }
          setWorkout(data.message);
        })
    ).catch((error) => errorMessageModal(error));
  }, []);

  return (
    <div className='container'>
      <PageHeader
        className='site-page-header'
        style={{ padding: 0 }}
        onBack={() => history.goBack()}
        title='Back'
      />
      {workout ? (
        <>
          <img
            className='workout-details-img'
            src={workout.image}
            alt='workout-image'
          />
          <div className='workout-details-caption'>
            <h1 className='workout-details-title'>{workout.name}</h1>
            <p className='workout-details-description'>
              {workout.description}
              <br />
              <span className='workout-details-start-date'>
                <CalendarOutlined />
                {formatDateAndTime(workout.startDate)}
              </span>
              <br />
              <span className='workout-details-category'>
                <FireOutlined /> {workout.category}
              </span>
            </p>
          </div>
        </>
      ) : (
        <Result
          status='warning'
          title='There is an error encountered go back home or try again later'
        />
      )}
    </div>
  );
};

export default WorkoutDetails;
