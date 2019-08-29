import helpers from '../../../lib/helpers';

export default function getValidCoordinatesOnly(data) {
  return data.filter(
    row => helpers.isFloaty(parseFloat(row.x))
      && helpers.isFloaty(parseFloat(row.y))
      && parseFloat(row.x) >= 0
      && parseFloat(row.y) >= 0,
  );
}