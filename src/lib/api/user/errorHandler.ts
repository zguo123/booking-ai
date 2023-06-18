/**
 * YAN HU HAIR
 *
 * Error Handler
 *
 * @author Zhaoyu Guo
 */

export const errorHandler = (
  error: string,
  code?: number,
  editing?: boolean
) => {
  let errors: any = {};

  if (!editing) {
    // Survey validation failed: title: Please add a title
    const allErrors = error.substring(error.indexOf(":") + 1).trim();
    const allErrorsSplit = allErrors.split(",").map((err) => err.trim());

    allErrorsSplit.forEach((error) => {
      const [key, value] = error.split(":").map((err) => err.trim());
      const newKey = key
        .split(/([0-9])./)
        .splice(-1)
        .join("");

      if (code !== 11000) {
        errors[newKey] = value;
      } else {
        const field = value.split("_")[0];

        errors[field] = `${
          field[0].toUpperCase() + field.slice(1)
        } already exists.`;
      }
    });
  } else {
    // error for the username -- duplicate
    if (error.includes("username") && code === 11000) {
      errors.username = "Username already exists";
    } else {
      const allErrors = error.substring(error.indexOf(":") + 1).trim();
      const allErrorsSplit = allErrors.split(",").map((err) => err.trim());

      allErrorsSplit.forEach((error) => {
        const [key, value] = error.split(":").map((err) => err.trim());
        if (code !== 11000) {
          errors[key] = value;
        }
      });
    }
  }
  return errors;
};
