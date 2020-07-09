export const fetchAllCategories = async () => {
  const response = fetch(`${process.env.REACT_APP_API_URL}/categories/?_expand=ParentCategory`);
  const data = await (await response).json();
  return data;
};
