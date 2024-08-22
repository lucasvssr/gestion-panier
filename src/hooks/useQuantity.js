import { useEffect, useState } from "react";
import { useArticlesContext, useArticlesDispatch } from "./useArticlesContext";

export function useQuantity(article, quantityCart) {
  const [quantity, setQuantity] = useState();
  const dispatch = useArticlesDispatch();
  const cart = useArticlesContext().state.cart;

  useEffect(() => {
    setQuantity(() => quantityCart);
  }, [dispatch, quantityCart, cart]);

  const increment = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);

    if (quantity === 0) {
      dispatch({
        type: "ADD_TO_CART",
        payload: {
          id: article.id,
          price: article.price,
          quantity: newQuantity,
        },
      });
    } else {
      dispatch({
        type: "UPDATE_QUANTITY",
        payload: { id: article.id, quantity: newQuantity },
      });
    }
  };

  const decrement = () => {
    const newQuantity = Math.max(0, quantity - 1);
    setQuantity(newQuantity);

    if (newQuantity === 0) {
      dispatch({ type: "REMOVE_FROM_CART", payload: article.id });
    } else {
      dispatch({
        type: "UPDATE_QUANTITY",
        payload: { id: article.id, quantity: newQuantity },
      });
    }
  };

  const price = article.price * quantity;

  return { quantity, increment, decrement, price };
}
