import moment from 'moment';
import {
  getNextTwelveMonths,
  formatDateAndTime,
} from '../../src/client/src/helpers';

describe('helper test suits', () => {
  it('should get next twelve months from now', () => {
    const result = getNextTwelveMonths();
    const months = [];
    const monthsRequired = 12;

    for (let i = 0; i <= monthsRequired; i++) {
      months.push(moment().add(i, 'months').format('YYYY.MM.01'));
    }
    expect(months).toEqual(result);
  });

  it('should format dateTime with this format YYYY.MM.DD hh:mm', () => {
    const newDate = new Date();
    const result = formatDateAndTime(newDate);
    const newFormat = moment(newDate).format('YYYY.MM.DD hh:mm');
    expect(newFormat).toEqual(result);
  });
});
