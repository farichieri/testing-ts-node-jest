<!-- https://www.udemy.com/course/unit-testing-typescript-nodejs/ -->

# Why we need automated tests?

## Peace of mind as a developer/tester

## Catch bugs early

- Spent 1 hour writing tests
- Win 3 hours of debugging

## Unit tests impose high code quality

- If a class is too difficult to test, the code quality should be improved.

## Prevent endless manual tests

## Think big: a TODO list doesn't need tests

# What is Jest?

## JavaScript/TypeScript testing framework developed by Facebook

## Test runner:

- Set of global functions: describe, test, expect

## Assertion library:

- Powerful set of matchers

## Advantages of Jest

- Most popular, most supported,
- All in one solution (test runner, assertions, matchers)
- TypeScript support

# Structure of a properly written unit test:

- AAA principles:
  -- Arrange
  -- Act
  -- Assert

  Arrange: We should put together whatever we need in order to test.
  Act: The result
  Assert: the real result

- Setup
- Teardown

## We should write meaningful tests

- Every test should independent

## Parametrized tests

-If the sut method is complex, and we want to test for multiple use cases. It reduces redundancy. We pass parameters.

# Intermediate testing topics

- F.I.R.S.T principles
- Jest hooks - how to structure tests-Test for errors
- Jest aliases
- Debugging
- Coverage

## F.I.R.S.t

- Principles, not rules that we may follow when writing tests:
  - **Fast**: Faster tests = faster feedback.
  - **independent/Isolated**: From one another, External Environment (No shared state with other tests and the order in which tests run doesn't matter.) Could take more time (Contradiction with Fast)
  - **Repeatable**: Same result = Same input. - Challenge: Random / Date values - often we will mock these. - Ex: test that writes to a database (It should always clean up). - Could take more time to setup and teardown operations (Contradiction with Fast)
  - **Self-Validating**: After the test completes, it's results are clear (Pass / Fail)
  - **Thorough**: Cover all the cases/paths/scenarios. Happy paths, bad paths, edge cases. Invalid input, Large values. 100% code coverage doesn't mean they are thorough

## Jest hooks - how to structure tests-Test for errors

- beforeEach, afterEach, beforeAll, afterAll...
- callback done on errors

## Jest aliases

- test properties:

  - only
  - skip
  - todo
  - concurrent

- test aliases:

  - it (and test are the same)
  - test
  - xit (and it.skip is the same)
  - fit (and it.only is the same)

  - watch mode
    ("scripts": "test": "jest --watch")

## Coverage:

-Maybe use it when you are done with your implementations.

# Test Driven Development with Jest

- Development driven by tests.
- Big projects: a detour

  - First achieve a basic working state, then write tests.

- TDD: great when extending an app or fixing bugs.

- TDD Cycle: Failing test (write test) => Passing test (Writing implementation) => Refactor (Change/add logic). So on until the app is ready.

- We should also test compilation errors

## Coding Katas - too cool to do exercises

- Exercise - the only way to get better at anything.
- Great idea for small software projects
- Great way to practice TDD

# Test doubles in Jest

- Stubs
- Fakes
- Mocks
- Spies
- Mock modules

## What are doubles?

- Pretend object used in place of a real object for testing purposes.
- Dummy: passed around but not used.
- Fake: simplified working implementation, take a shortcut. (Like a fake login service)
- Stubs: incomplete objects used as arguments.
- Spies: track information about how a unit is called.
- Mocks: pre-programed with expectations.
  (Mocks and spies have a lot in common)

- Why do we need test doubles?

* Some units aren't fast, or easily accessible (like a DB connection)

  - Replace them in tests

* Mocks - most used, most debated.

- The way we use them greatly influences the way we write tests.
- If need to use them too much, there is something wrong with our code
- Testing/Mocking styles: London/Chicago

* Spies vs mocks:

- Spies are not directly injected into SUT
- Original functionality is preserved with spies (with jest.fn() mock we apply to its own functionality)
- Spies usually track method calls.

## Test doubles in practice

- TDD styles/schools: London and Chicago (Detroit)
- Understand the difference in testing styles,
  - What is a unit?

### Chicago - Small focus on mocks:

- A unit: collection of pieces (it's not something very small but there are multiple small pieces working together)
- Test from a broader view
- Little use of mocks

### London - heavy mocks use:

- A unit: a class
- Mock all its dependencies

### Testing - a temperature approach:

- A unit: is a requirement.
