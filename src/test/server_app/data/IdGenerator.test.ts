import { generateRandomId } from '../../../app/server_app/data/IdGenerator';

describe('IdGenerator test suite', () => {
  it('should return a random string', () => {
    const random = generateRandomId();

    expect(random.length).toBe(20);
  });
});
