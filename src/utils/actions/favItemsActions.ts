import {
  favItemsAddType,
  favItemsRemoveType,
} from "./favItemsTypes";

export const favItemsAdd = (path: string, title: string, type: string) => ({
  type: favItemsAddType,
  payload: { path, title, type }
});

export const favItemsRemove = (path: string) => ({
  type: favItemsRemoveType,
  payload: path
});
