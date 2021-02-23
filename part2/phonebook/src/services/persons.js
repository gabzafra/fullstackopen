import axios from "axios";
const baseUrl = "http://localhost:3001/api/persons";

const getAll = () => {
  return axios.get(baseUrl).then((response) => response.data);
};

const create = (newObject) => {
  return axios
    .post(baseUrl, newObject)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });
};

const remove = (id) => {
  return axios
    .delete(`${baseUrl}/${id}`)
    .then((response) => response.status)
    .catch((error) => ({ message: "error" }));
};

const update = (id, newObject) => {
  return axios
    .put(`${baseUrl}/${id}`, newObject)
    .then((response) => {
      console.log("response", response);
      return response.data;
    })
    .catch((error) => {
      console.log("fk error", error);
      return {
        message: `Information of ${newObject.name} has already been removed from server`,
      };
    });
};

export default { getAll, create, remove, update };
