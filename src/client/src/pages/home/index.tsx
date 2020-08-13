import React, { useState, useEffect } from 'react';
import WorkoutList from '../../components/workout-list';
import FiltersBar from '../../components/filters-bar';
import Pagination from '../../components/pagination';
import { timeoutPromise, errorMessageModal } from '../../helpers/';
import { Workout } from '../../types';
import { Result, Spin } from 'antd';
import './style.css';

/* Home Page where it control/show the workout list */

const Home: React.FC = () => {
  //State for Workouts
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  //State for total pages in order to send it to pagination component
  const [totalPages, setTotalPages] = useState<number>(1);
  //State for current page in order to later reset when filters changes
  const [currentPage, setCurrentPage] = useState<number>(1);
  //State for date filters to send to API later and also trigger on change to reterive the new data
  const [dateFilter, setDateFilter] = useState<string>('');
  //State for category filters to send to API later and also trigger on change to reterive the new data
  const [categoryFilter, setCategoryFilter] = useState<string>('');
  //If something goes wrong it will show Result component that shows error to the user / instead of checking workout.length because it has bounce issue
  const [hasError, setHasError] = useState<boolean>(false);
  //To control spinning visibility while loading the data
  const [loading, setLoading] = useState<boolean>(false);
  //To control Pagination visibility while docs under 20
  const [showPagination, setShowPagination] = useState<boolean>(false);

  // When ever changes happen to the filters it trigger this function in order to load data from the server
  useEffect(() => {
    setLoading(true);
    timeoutPromise(
      fetch(getDynamicUrl(1))
        .then((response) => response.json())
        .then((data) => {
          if (!data.message.docs) {
            errorMessageModal(data.message.error);
            setHasError(true);
            setLoading(false);
            return;
          }
          data.message.docs.length < 20
            ? setShowPagination(false)
            : setShowPagination(true);
          setLoading(false);
          setCurrentPage(1);
          setWorkouts(data.message.docs);
          setTotalPages(data.message.totalPages * 10);
        })
    ).catch((error) => {
      setShowPagination(false);
      setLoading(false);
      errorMessageModal(error);
      setHasError(true);
    });
  }, [dateFilter, categoryFilter]);

  // to get dynamic URL based on filters and page number

  const getDynamicUrl = (page: number) => {
    const apiUrl = `${process.env.REACT_APP_API_URL}?page=${page}${process.env.REACT_APP_PAGE_LIMIT}`;

    if (categoryFilter && dateFilter) {
      return `${apiUrl}&category=${categoryFilter}&startDate=${dateFilter}`;
    }

    if (dateFilter) {
      return `${apiUrl}&startDate=${dateFilter}`;
    }
    if (categoryFilter) {
      return `${apiUrl}&category=${categoryFilter}`;
    }

    return apiUrl;
  };

  // handle paging change by fetching the new data from server based on page number that coming from the component

  const handlePagenation = (page: number) => {
    setCurrentPage(page);
    setShowPagination(true);
    timeoutPromise(
      fetch(getDynamicUrl(page))
        .then((response) => response.json())
        .then((data) => {
          if (!data.message.docs) {
            errorMessageModal(data.message.error);
            return;
          }
          setWorkouts(data.message.docs);
        })
    ).catch((error) => errorMessageModal(error));
  };

  // handle date filter change that coming from child component

  const handleDateFilter = (date: string) => {
    setDateFilter(date);
  };

  // handle category filter change that coming from child component

  const handleCategoryFilter = (categories: string[]) => {
    setCategoryFilter(categories.join());
  };

  return (
    <div className='container'>
      <Spin spinning={loading} size={'large'} tip='Loading...'>
        {workouts.length > 0 && (
          <>
            <FiltersBar
              handleDateFilter={handleDateFilter}
              handleCategoryFilter={handleCategoryFilter}
            />
            <WorkoutList data={workouts} />
            {showPagination && (
              <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                handlePagenation={handlePagenation}
              />
            )}
          </>
        )}
      </Spin>
      {hasError && (
        <Result
          status='warning'
          title='There is an error encountered while fetching the data please try again later'
        />
      )}
    </div>
  );
};

export default Home;
