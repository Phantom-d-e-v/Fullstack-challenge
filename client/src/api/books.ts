import { useQuery } from "@tanstack/react-query";
import { Book } from "../types";
import { appConfig } from "../utils/config";

export const useBooks = () => {
  return useQuery(["books"], async (): Promise<Book[]> => {
    return fetch(`${appConfig.apiBaseUrl}/books`).then((res) => res.json());
  });
};
