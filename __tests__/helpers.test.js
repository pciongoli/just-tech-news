// make sure to include new tests that get added up here
const { format_date, format_plural, format_url } = require('../utils/helpers');

// test to ensure format_date() takes DAte() objects and returns dates in the MM/DD/YYYY
test('format_date() returns a date string', () => {
  const date = new Date('2020-03-20 16:12:03');

  expect(format_date(date)).toBe('3/20/2020');
});

// test to check that format_pliral() correctly pluralizes words
// ex passing "Tiger", 2 should return "tigers"
test('format_plural() returns a pluralized word', () => {
  const word1 = format_plural('tiger', 1);
  const word2 = format_plural('lion', 2);

  expect(word1).toBe('tiger');
  expect(word2).toBe('lions');
});

// URL shortener test to remove visual unpleasant url strings
test('format_url() returns a simplified url string', () => {
  const url1 = format_url('http://test.com/page/1');
  const url2 = format_url('https://www.coolstuff.com/abcdefg/');
  const url3 = format_url('https://www.google.com?q=hello');

  expect(url1).toBe('test.com');
  expect(url2).toBe('coolstuff.com');
  expect(url3).toBe('google.com');
});
