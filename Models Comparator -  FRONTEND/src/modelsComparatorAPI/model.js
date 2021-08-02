import { getAxInstanceWithHeaders as axInstance} from "./config"

export const getModels = (idUser, token) => {
  return axInstance(token).get("/api/models/".concat(idUser));
};

export const addModel = async (model, token) => {
  return await axInstance(token).post("/api/models/add", model);

};

export const deleteModel = (id, token) => {
  return axInstance(token).delete("/api/models/".concat(id));
};