import _ from 'underscore';

export function isDefined(value) {
  return value !== undefined && value !== null && value !== '';
}

export function isValidEmail(value) {
  return isDefined(value) && /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value);
}

export function minLength(min) {
  return value => value.length >= min;
}

export function maxLength(max) {
  return value => value.length <= max;
}

export function exactLength(length) {
  return value => value.length === length;
}

export function isInteger(value) {
  return Number.isInteger(Number(value));
}

export function matches(target) {
  return value => value === target;
}

export function isValidPhoneNumber(value) {  // not currently functional
  return /^(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/gi.test(value);
}
