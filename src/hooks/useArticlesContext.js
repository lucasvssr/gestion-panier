import { useReducer, useEffect, useContext } from "react";
import { StoreContext, StoreDispatchContext } from "../../store";
import { emptyCart, fetchInitialData, postToCart, removeFromCart, updateCart } from "../service/api";

const initialState = {
  articles: [],
  cart: [],
};

function articlesReducer(state, action) {
  switch (action.type) {
    case "SET_ARTICLES":
      return { ...state, articles: action.payload };
    case "SET_CART":
      return { ...state, cart: action.payload };
    case "ADD_TO_CART":
      postToCart(action.payload).catch((response) => console.log(response));
      return { ...state, cart: [...state.cart, action.payload] };
    case "REMOVE_FROM_CART":
      removeFromCart(action.payload).catch((response) => console.log(response));
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload),
      };
    case "EMPTY_CART":
      emptyCart(state.cart.map((item) => item.id)).catch((response) => console.log(response));
      return { ...state, cart: [] };
    case "UPDATE_QUANTITY":
      updateCart(action.payload.id, action.payload).catch((response) => console.log(response));
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item,
        ),
      };
    case "RETURN_CART":
      return { ...state, cart: action.payload };
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
}

export function ArticlesProvider({ children }) {
  const [state, dispatch] = useReducer(articlesReducer, initialState);

  useEffect(() => {
    fetchInitialData().then(({ dataArticles, dataCart }) => {
      dispatch({ type: "SET_ARTICLES", payload: dataArticles });
      dispatch({ type: "SET_CART", payload: dataCart });
    }).catch((response) => console.log(response));
  }, []);

  const value = { state, dispatch };

  return (
    <StoreContext.Provider value={value}>
      <StoreDispatchContext.Provider value={dispatch}>
        {children}
      </StoreDispatchContext.Provider>
    </StoreContext.Provider>
  );
}

export function useArticlesContext() {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error(
      "useArticlesContext must be used within a ArticlesProvider",
    );
  }
  return context;
}

export function useArticlesDispatch() {
  const context = useContext(StoreDispatchContext);
  if (context === undefined) {
    throw new Error(
      "useArticlesDispatch must be used within a ArticlesProvider",
    );
  }
  return context;
}
