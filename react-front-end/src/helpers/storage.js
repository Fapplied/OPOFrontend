import stringify from "fast-stringify";
const setLS = (key, value) => {
  try {
    value = stringify(value);
    localStorage.setItem(key, value);
    return true;
  } catch (error) {
    return false;
  }
};

const getLS = (key) => {
  let value = localStorage.getItem(key);
  value = JSON.parse(value);
  return value ? value : false;
};

const removeLS = (key) => {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    return false;
  }
};

export { getLS, setLS, removeLS };
