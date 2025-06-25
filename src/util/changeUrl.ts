const changeUrl = (file: File) => {
  const blobUrl = URL.createObjectURL(file);
  return blobUrl;
};

export default changeUrl;
