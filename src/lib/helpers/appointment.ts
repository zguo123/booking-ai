export const formatPrice = (price: number) => {
  return price.toLocaleString("en-CA", {
    style: "currency",
    currency: "cad",
  });
};
