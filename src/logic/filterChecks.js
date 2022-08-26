import {
  isWithinInterval, addHours, addDays, addMonths, subHours, subDays, subMonths,
} from 'date-fns';

const filterChecks = (data, constraint, bound) => {
  if (!bound || !constraint || bound.length === 0 || constraint.length === 0) {
    return true;
  }

  const dataArrayCheck = Array.isArray(data);
  const boundArrayCheck = Array.isArray(bound);

  if (dataArrayCheck && boundArrayCheck) {
    const checks = bound.map((item) => data.includes(item));
    return !checks.includes(false);
  }

  if (dataArrayCheck) {
    const checks = data.map((item) => (
      item === bound
    ));
    return checks.every((x) => x);
  }

  if (boundArrayCheck) {
    return bound.includes(data);
  }

  if (typeof constraint === 'object' && ('metric' in constraint) && ('interval' in constraint)) {
    const currentDateTime = new Date();
    let boundDateTime;
    if (constraint.metric === 'hours' && constraint.interval === 'in the last') {
      boundDateTime = subHours(currentDateTime, bound);
      return isWithinInterval(new Date(data), { start: boundDateTime, end: currentDateTime });
    } if (constraint.metric === 'days' && constraint.interval === 'in the last') {
      boundDateTime = subDays(currentDateTime, bound);
      return isWithinInterval(new Date(data), { start: boundDateTime, end: currentDateTime });
    } if (constraint.metric === 'months' && constraint.interval === 'in the last') {
      boundDateTime = subMonths(currentDateTime, bound);
      return isWithinInterval(new Date(data), { start: boundDateTime, end: currentDateTime });
    }
    if (constraint.metric === 'hours') {
      boundDateTime = addHours(currentDateTime, bound);
      return isWithinInterval(new Date(data), { start: currentDateTime, end: boundDateTime });
    } if (constraint.metric === 'days') {
      boundDateTime = addDays(currentDateTime, bound);
      return isWithinInterval(new Date(data), { start: currentDateTime, end: boundDateTime });
    } if (constraint.metric === 'months') {
      boundDateTime = addMonths(currentDateTime, bound);
      return isWithinInterval(new Date(data), { start: currentDateTime, end: boundDateTime });
    }
  }

  switch (constraint) {
    case ('Equality'):
      return data === bound;

    case ('is greater than'):
      return data > bound;

    case ('is less than'):
      return data < bound;

    case ('is'):
      return data.toLowerCase() === bound.toLowerCase();

    case ('is not'):
      return data.toLowerCase() !== bound.toLowerCase();

    case ('starts with'): {
      const check = new RegExp(`^${bound}.*`, 'i');
      return check.test(data);
    }

    case ('ends with'): {
      const check = new RegExp(`.*${bound}$`, 'i');
      return check.test(data);
    }

    case ('contains'):
      return data.toLowerCase().includes(bound.toLowerCase());

    case ('does not contain'):
      return !data.includes(bound);

    default:
      return true;
  }
};

export default filterChecks;
