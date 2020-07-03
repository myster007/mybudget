export const fetchAllCategories = () => {
  const promise = fetch(
    `${process.env.REACT_APP_API_URL}/categories/?_expand=ParentCategory`
  );

  return promise;
};
