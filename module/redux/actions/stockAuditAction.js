export const GET_DELETE = "GET_DELETE";

export const deleteAuditTask = (payload) => {
  return {
    type: GET_DELETE,
    payload,
  };
};
