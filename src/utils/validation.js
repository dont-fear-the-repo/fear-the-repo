import _ from 'underscore';

export function isDefined(value) {
  if (value !== undefined && value !== null && value !== '') {
    return true;
  } else {
    return false;
  }
}

export function isValidEmail(value) {
  if (isDefined(value) && /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    return true;
  } else {
    return false;
  }
}

export function minLength(min) {
  return value => {
    if (value.length >= min) {
      return true;
    } else {
      return false;
    }
  };
}

export function maxLength(max) {
  return value => {
    if (value.length <= max) {
      return true;
    } else {
      return false;
    }
  };
}

export function exactLength(length) {
  return value => {
    if (value.length === length) {
      return true;
    } else {
      return false;
    }
  };
}

export function isInteger(value) {
  if (Number.isInteger(Number(value))) {
    return true;
  } else {
    return false;
  }
}

export function matches(target) {
  return value => {
    if (value === target) {
      return true;
    } else {
      return false;
    }
  };
}

export function isValidPhoneNumber(value) {  // not currently functional
  if (value.length < 7) {
    return false;
  }
  const valueArray = value.split('');
  return _.every(valueArray, digit =>
    /^(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/gi.test(value));
}

// TODO: simplify these
