import {
  favItemsAddType,
  favItemsRemoveType,
} from "../actions/favItemsTypes";

const initialState = {
  favItems: [],
};

export const favItemsReducer = (
  state: any = initialState,
  action: { type: string; payload: any }
) => {
  switch (action.type) {
    // this action get a title and generate a new id for that and push it to the last states
    case favItemsAddType:
      if (state.favItems.findIndex((item: any) => item.path === action.payload.path) >= 0) return state;
      return {
        ...state,
        favItems: state.favItems.concat(action.payload),
      };

    // this action remove an item based on the id
    case favItemsRemoveType:
      return {
        ...state,
        favItems: state.favItems.filter((item: any) => item.path !== action.payload),
      };
  }
  return state;
};
