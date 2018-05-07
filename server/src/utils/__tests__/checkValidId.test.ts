import { checkValidId } from '../checkValidId';

test('throw Must be a valid id if id is not valid', () => {
  function call() {
    checkValidId('123');
  }
  expect(call).toThrowError('Must be a valid id');
});
