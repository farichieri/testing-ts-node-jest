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

...

## We should write meaningful tests

- Every test should independent

## Parametrized tests
