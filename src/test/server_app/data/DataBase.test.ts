import { DataBase } from '../../../app/server_app/data/DataBase';
import * as IdGenerator from '../../../app/server_app/data/IdGenerator';

type SomeTypeWithId = {
  id: string;
  name: string;
  color: string;
};

describe('Database test suite', () => {
  let sut: DataBase<SomeTypeWithId>;

  const fakeId = '1234';

  const someObject = {
    id: '',
    name: 'some name',
    color: 'blue',
  };

  const someObjectTwo = {
    id: '',
    name: 'some other name',
    color: 'blue',
  };

  beforeEach(() => {
    sut = new DataBase<SomeTypeWithId>();
    jest.spyOn(IdGenerator, 'generateRandomId').mockReturnValue(fakeId);
  });

  // Test insert operation
  it('should insert a new element', async () => {
    const actual = await sut.insert({
      id: '',
    } as any);
    expect(actual).toBe(fakeId);
  });

  it('should get element after insert', async () => {
    const id = await sut.insert(someObject);
    const actual = await sut.getBy('id', id);
    expect(actual).toBe(someObject);
  });

  it('should find all elements with the same property', async () => {
    await sut.insert(someObject);
    await sut.insert(someObjectTwo);

    const expected = [someObject, someObjectTwo];

    const actual = await sut.findAllBy('color', 'blue');
    expect(actual).toEqual(expected);
  });

  it('should change color on object', async () => {
    const id = await sut.insert(someObject);
    const expectedColor = 'red';

    await sut.update(id, 'color', expectedColor);
    const object = await sut.getBy('id', id);
    const actualColor = object.color;

    expect(actualColor).toEqual(expectedColor);
  });

  it('should delete object', async () => {
    const id = await sut.insert(someObject);
    await sut.delete(id);

    const actual = await sut.getBy('id', id);

    expect(actual).toBeUndefined();
  });

  it('should get all elements', async () => {
    await sut.insert(someObject);
    await sut.insert(someObjectTwo);

    const expected = [someObject, someObjectTwo];

    const actual = await sut.getAllElements();

    expect(actual).toEqual(expected);
  });
});
