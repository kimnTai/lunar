import { deleteAttachment, newAttachment } from "@/api/attachment";
import { updateCardApi } from "@/api/cards";
import { newImageFileUrl } from "@/api/upload";
import { UpdateCardProps } from "@/interfaces/cards";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "./store";

export const updateCardAction = createAsyncThunk(
  "card/updateCard",
  async (data: UpdateCardProps) => await updateCardApi(data)
);

export const newAttachmentAction = createAsyncThunk(
  "card/newAttachment",
  async (data: { file: Blob; cardId: string; filename: string }) => {
    const { result } = await newImageFileUrl(data.file);
    return await newAttachment({
      cardId: data.cardId,
      filename: data.filename,
      dirname: result.link,
    });
  }
);

export const deleteAttachmentAction = createAsyncThunk(
  "card/deleteAttachment",
  async (data: { cardId: string; attachmentId: string }) =>
    await deleteAttachment(data)
);

export const selectCardById = (cardId?: string) => (state: RootState) =>
  state.board.board.list
    .flatMap(({ card }) => card)
    .find(({ _id }) => _id === cardId);
