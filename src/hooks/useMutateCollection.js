import { useMutation, useQueryClient } from "@tanstack/react-query";
import useApp from "antd/es/app/useApp";
import { pb } from "../utils/PB";

export function useMutateCollection() {
  const queryClient = useQueryClient();
  const { message } = useApp();
  //Добавить запись в коллекцию
  const { mutate: addToCollection, ...addToCollectionData } = useMutation({
    mutationFn: async ({ collectionName, data }) => {
      const record = await pb.collection(collectionName).create(data);
      return record;
    },
    onSuccess: () => {
      message.success("Заметка создана");
      queryClient.invalidateQueries({
        queryKey: ["collection"],
      });
    },
  });
  return { addToCollection, addToCollectionData };
}
