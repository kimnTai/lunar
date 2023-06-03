import { useParams } from "react-router";
import { useAppSelector } from "./";

export const useParamOrganization = () => {
  const { workSpaceId, boardId } = useParams();

  return useAppSelector((state) =>
    state.organization.organization.find(({ _id, board }) => {
      if (workSpaceId) {
        return _id === workSpaceId;
      }
      if (boardId) {
        return board.map(({ _id }) => _id).includes(boardId);
      }
    })
  );
};
