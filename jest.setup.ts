jest.mock('@react-native-community/async-storage', () => ({
  AsyncStorage: {
    getAllKeys: jest.fn(() => new Promise((resolve) => {
      resolve(['one', 'two', 'three']);
    })),
    getItem: jest.fn(() => new Promise((resolve, reject) => {
      resolve(JSON.stringify({}));
    })),
    multiGet: jest.fn(() => new Promise((resolve, reject) => {
      resolve({});
    })),
    multiSet: jest.fn(() => new Promise((resolve, reject) => {
      resolve(null);
    })),
    removeItem: jest.fn(() => new Promise((resolve, reject) => {
      resolve(null);
    })),
    setItem: jest.fn(() => new Promise((resolve, reject) => {
      resolve(null);
    }))
  }
}));
