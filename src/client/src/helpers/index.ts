import { Modal } from 'antd';
import moment from 'moment';

// Promise item helper function in order to timeout the promise based on value in .env file
export const timeoutPromise = (promise: Promise<void>): Promise<unknown> => {
  return new Promise((resolve, reject) => {
    const timeoutId = setTimeout(() => {
      reject(new Error('promise timeout'));
    }, parseInt(process.env.REACT_APP_PROMISE_TIMEOUT_IN_MS as string));
    promise.then(
      (res) => {
        clearTimeout(timeoutId);
        resolve(res);
      },
      (err) => {
        clearTimeout(timeoutId);
        reject(err);
      }
    );
  });
};

// an error reporter for the user in order to inform them with error and also console log it
export const errorMessageModal = (error: Error | string): void => {
  console.error(`Error from server ${error}`);
  Modal.error({
    title: 'Error',
    content:
      'Sorry but we are unable to load data from server, please try again later',
  });
};

// get next twelve months for the startDate filter
export const getNextTwelveMonths = (): string[] => {
  const months = [];
  const monthsRequired = 12;

  for (let i = 0; i <= monthsRequired; i++) {
    months.push(moment().add(i, 'months').format('YYYY.MM.01'));
  }

  return months;
};

// central format for the date so maybe we could change it the future
export const formatDateAndTime = (dateTime: Date): string =>
  moment(dateTime).format('YYYY.MM.DD hh:mm');
