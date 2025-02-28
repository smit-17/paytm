import { instanceWithAuth, instanceWitouthAuth } from "../utils/instances";

const getWithInstances = (url) => {
  return instanceWithAuth
    .get(url)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      throw error;
    });
};
const getWithoutInstances = (url) => {
  return instanceWitouthAuth
    .get(url)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      throw error;
    });
};
const postWithInstances = (url, body) => {
  return instanceWithAuth
    .post(url, body)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      throw error;
    });
};
const postWithoutInstances = (url, body) => {
  return instanceWitouthAuth
    .post(url,body)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      throw error;
    });
};
export default {
  getWithInstances,
  getWithoutInstances,
  postWithInstances,
  postWithoutInstances,
};
