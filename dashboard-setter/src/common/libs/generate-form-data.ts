function generateFormData(data: any) {
  const formData = new FormData();

  function appendFormData(key: string, value: any) {
    if (value === null || value === undefined) {
      return; // skip null or undefined
    } else if (value instanceof Date) {
      formData.append(key, value.toISOString());
    } else if (value instanceof File || value instanceof Blob) {
      formData.append(key, value);
    } else if (Array.isArray(value)) {
      // Append arrays as repeated keys with []
      value.forEach((item, index) => {
        // If items are objects or arrays, you might want to recursively handle this too
        if (typeof item === "object" && !(item instanceof File || item instanceof Blob)) {
          appendFormData(`${key}[${index}]`, item);
        } else {
          formData.append(`${key}[]`, item);
        }
      });
    } else if (typeof value === "object") {
      // For nested objects, recursively append keys like key[subkey]
      for (const subKey in value) {
        if (value.hasOwnProperty(subKey)) {
          appendFormData(`${key}[${subKey}]`, value[subKey]);
        }
      }
    } else {
      formData.append(key, value);
    }
  }

  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      appendFormData(key, data[key]);
    }
  }

  return formData;
}

export default generateFormData;
