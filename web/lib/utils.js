export const zod_error = (error) => {
  return error.errors.reduce((acc, curr) => {
    acc[curr.path[0]] = curr.message;
    // console.log("acc", acc);
    return acc;
  }, {});
};
