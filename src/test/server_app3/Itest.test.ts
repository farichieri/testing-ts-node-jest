import * as generated from '../../app/server_app/data/IdGenerator';
import { Account } from '../../app/server_app/model/AuthModel';
import { Reservation } from '../../app/server_app/model/ReservationModel';
import {
  HTTP_CODES,
  HTTP_METHODS,
} from '../../app/server_app/model/ServerModel';
import { Server } from '../../app/server_app/server/Server';
import { makeAwesomeRequest } from './utils/http-client';

xdescribe('Server app integration tests', () => {
  let server: Server;

  beforeAll(() => {
    server = new Server();
    server.startServer();
  });

  afterAll(() => {
    server.stopServer();
  });

  const someUser: Account = {
    id: '',
    userName: 'someUser',
    password: 'somePassword',
  };

  const someReservation: Reservation = {
    id: '',
    endDate: 'someEndDate',
    startDate: 'someStartDate',
    room: 'someRoom',
    user: 'someUser',
  };

  it('should register new user', async () => {
    const result = await fetch('http://localhost:8080/register', {
      method: 'POST',
      body: JSON.stringify(someUser),
    });
    const resultBody = await result.json();

    expect(result.status).toBe(HTTP_CODES.CREATED);
    expect(resultBody.userId).toBeDefined();
    console.log(`connecting to address: ${process.env.HOST}`);
  });

  it('should register new user with awesomeRequest', async () => {
    const result = await makeAwesomeRequest(
      {
        host: 'localhost',
        port: 8080,
        path: '/register',
        method: HTTP_METHODS.POST,
      },
      someUser
    );

    expect(result.statusCode).toBe(HTTP_CODES.CREATED);
    expect(result.body.userId).toBeDefined();
  });

  let token: string;
  it('should login a registered user', async () => {
    const result = await fetch('http://localhost:8080/login', {
      method: HTTP_METHODS.POST,
      body: JSON.stringify(someUser),
    });
    const resultBody = await result.json();

    expect(result.status).toBe(HTTP_CODES.CREATED);
    expect(resultBody.token).toBeDefined();
    token = resultBody.token;
  });

  let createdReservationId: string;
  it('should create reservation if authorized', async () => {
    const result = await fetch('http://localhost:8080/reservation', {
      method: HTTP_METHODS.POST,
      body: JSON.stringify(someReservation),
      headers: {
        Authorization: token,
      },
    });
    const resultBody = await result.json();

    expect(result.status).toBe(HTTP_CODES.CREATED);
    expect(resultBody.reservationId).toBeDefined();
    createdReservationId = resultBody.reservationId;
  });

  it('should get reservation if authorized', async () => {
    const result = await fetch(
      `http://localhost:8080/reservation/${createdReservationId}`,
      {
        method: HTTP_METHODS.GET,
        headers: {
          Authorization: token,
        },
      }
    );
    const resultBody = await result.json();

    const expectedReservation = structuredClone(someReservation);
    expectedReservation.id = createdReservationId;

    expect(result.status).toBe(HTTP_CODES.OK);
    expect(resultBody).toEqual(expectedReservation);
  });

  it('should create and retrieve multiple reservations', async () => {
    await fetch('http://localhost:8080/reservation', {
      method: HTTP_METHODS.POST,
      body: JSON.stringify(someReservation),
      headers: {
        Authorization: token,
      },
    });
    await fetch('http://localhost:8080/reservation', {
      method: HTTP_METHODS.POST,
      body: JSON.stringify(someReservation),
      headers: {
        Authorization: token,
      },
    });
    await fetch('http://localhost:8080/reservation', {
      method: HTTP_METHODS.POST,
      body: JSON.stringify(someReservation),
      headers: {
        Authorization: token,
      },
    });

    const getAllResult = await fetch(`http://localhost:8080/reservation/all`, {
      method: HTTP_METHODS.GET,
      headers: {
        Authorization: token,
      },
    });

    const resultBody = await getAllResult.json();
    expect(getAllResult.status).toBe(HTTP_CODES.OK);
    expect(resultBody).toHaveLength(4);
  });

  it('should update reservation if authorized', async () => {
    const updatedResult = await fetch(
      `http://localhost:8080/reservation/${createdReservationId}`,
      {
        method: HTTP_METHODS.PUT,
        body: JSON.stringify({ startDate: 'otherStateDate' }),
        headers: {
          Authorization: token,
        },
      }
    );

    expect(updatedResult.status).toBe(HTTP_CODES.OK);

    const result = await fetch(
      `http://localhost:8080/reservation/${createdReservationId}`,
      {
        method: HTTP_METHODS.GET,
        headers: {
          Authorization: token,
        },
      }
    );
    const getResultBody: Reservation = await result.json();
    expect(getResultBody.startDate).toBe('otherStateDate');
  });

  it('should delete reservation if authorized', async () => {
    const deletedResult = await fetch(
      `http://localhost:8080/reservation/${createdReservationId}`,
      {
        method: HTTP_METHODS.DELETE,
        headers: {
          Authorization: token,
        },
      }
    );

    expect(deletedResult.status).toBe(HTTP_CODES.OK);

    const getResult = await fetch(
      `http://localhost:8080/reservation/${createdReservationId}`,
      {
        method: HTTP_METHODS.GET,
        headers: {
          Authorization: token,
        },
      }
    );
    expect(getResult.status).toBe(HTTP_CODES.NOT_fOUND);
  });

  it('snapshot demo', async () => {
    jest.spyOn(generated, 'generateRandomId').mockReturnValueOnce('1234');

    await fetch('http://localhost:8080/reservation', {
      method: HTTP_METHODS.POST,
      body: JSON.stringify(someReservation),
      headers: {
        Authorization: token,
      },
    });

    const getResult = await fetch(`http://localhost:8080/reservation/1234`, {
      method: HTTP_METHODS.GET,
      headers: {
        Authorization: token,
      },
    });
    const getResultBody: Reservation = await getResult.json();

    expect(getResultBody).toMatchSnapshot();
    expect(getResultBody).toMatchSnapshot();
  });
});
