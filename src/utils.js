import ResponseError from "./errors";

export function objectDataToQueryBind({
  data,
  allValues,
  separator
}) {
  let query = "";
  Object.keys(data).forEach((key, i) => {
    if (i === Object.keys(data).length - 1) {
      query += ` ${key}=${allValues ? allValues : `'${data[key]}'`}`;
      return;
    }
    query += `${key}=${allValues ? allValues : `'${data[key]}'`} ${separator || ","} `;
  });
  return query;
}

export function printString(str, count, separator = "?") {
  let tmp = "";
  for (let x = 1; x <= count; x++) {
    tmp += `${str} ${x === count ? '' : separator} `
  }
  return tmp;
}

export const validate = (schema, request) => {
  const result = schema.validate(request, {
    abortEarly: false,
    allowUnknown: false
  });
  if (result.error) {
    throw new ResponseError(400, result.error.message);
  }

  return result.value;
}
