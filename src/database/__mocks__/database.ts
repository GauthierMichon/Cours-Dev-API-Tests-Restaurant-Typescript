export const initDB = async () => ({
  all: jest.fn(), // Mock pour `all`
  get: jest.fn(), // Mock pour `get`
  run: jest.fn(), // Mock pour `run`
  close: jest.fn(), // Mock pour `close`
});
