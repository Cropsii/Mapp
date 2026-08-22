import { useMutation, useQueryClient } from "@tanstack/react-query";
import useApp from "antd/es/app/useApp";
import { pb } from "../utils/PB";

export function useDelete() {
  const queryClient = useQueryClient();
  const { message } = useApp();

  const { mutate, ...query } = useMutation({
    mutationFn: ({ collectionName, recordId }) => {
      return pb.collection(collectionName).delete(recordId);
    },
    
    onSuccess: () => {
      message.success("Заметка успешно удалена");
      queryClient.invalidateQueries(["collection"]);
    },
    onError: (e) => console.log(e),
    
  });

  const deleteData = (collectionName, recordId) => {
    mutate({ collectionName, recordId });
  };
  return { deleteData, query };
}
