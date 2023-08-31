import { format } from 'date-fns';

const DateToStr = (dateObj) => {
  const formattedDate = format(dateObj, 'MM/dd/yyyy');
  return formattedDate;
};

export default DateToStr;
