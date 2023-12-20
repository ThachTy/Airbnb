import { http } from "./config";

export const vitriServices = {
  getVitriById: (vitriId) => {
    return http.get(`/vi-tri/${vitriId}`);
  },
};
