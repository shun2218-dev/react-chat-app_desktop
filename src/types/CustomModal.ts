import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import { Dispatch, SetStateAction } from "react";

export type CustomModal = {
  open: boolean;
  modalToggle: (target: string) => void;
  inviteUsers?: QueryDocumentSnapshot<DocumentData>[];
  inviteIds?: string[];
  setInviteIds?: Dispatch<SetStateAction<string[]>>;
  cancelId?: string;
  setCancelId?: Dispatch<SetStateAction<string>>;
};
