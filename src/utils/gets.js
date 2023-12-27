export function getData(url) {
  return this.$http.get(url)
    .then(response => response.data.payload)
    .catch(error => {
      console.error(error);
      throw error;
    });
}