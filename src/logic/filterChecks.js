import { isWithinInterval } from 'date-fns';

const filterChecks = (data, constraint, bound) => {
  switch (constraint) {
    case ('Equality'):
      return data === bound;

    case ('isWithinInterval'):
      return isWithinInterval(data, bound);

    case ('isGreaterThan'):
      return data > bound;

    case ('isLessThan'):
      return data < bound;

    case ('IsNot'):
      return data !== bound;

    case ('StartsWith'): {
      const check = new RegExp(`^${bound}.*`, 'i');
      return check.test(data);
    }

    case ('EndsWith'): {
      const check = new RegExp(`.*$${bound}`, 'i');
      return check.test(data);
    }

    case ('Contains'):
      return data.includes(bound);

    case ('DoesNotContain'):
      return !data.includes(bound);

    default:
      return false;
  }
};

export default filterChecks;
