import { useEffect, useState } from "react";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { useUserDispatch, useUserState } from "../../../context/context";
import {
  SET_LENDING_LIBRARY,
  SET_LENDING_LIBRARY_IDS,
} from "../../../context/actions";
import { mutate } from "swr";

type CustomColor = "success" | "danger";

interface LendingLibraryButtonProps {
  book: Book;
}

export const LendingLibraryButton: React.FC<LendingLibraryButtonProps> = ({
  book,
}) => {
  const state = useUserState();
  const dispatch = useUserDispatch();

  const [color, setColor] = useState<CustomColor>("danger");
  const [toolTip, setToolTip] = useState<NonNullable<React.ReactNode>>(
    "Add to Lending Library"
  );
  const { lendingLibraryIDs } = state;
  const { user } = state;
  const userID = user?.id;
  const bookID = book?.id;

  const isInLendingLibrary = lendingLibraryIDs?.includes(bookID);

  useEffect(() => {
    if (isInLendingLibrary) {
      setColor("success" as CustomColor);
      setToolTip("Remove from Lending Library");
    } else {
      setColor("error" as CustomColor);
      setToolTip("Add to Lending Library");
    }
  }, [isInLendingLibrary]);

  const lendingLibraryAction = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.stopPropagation();
    const currentColor = color;
    if (color === "success") {
      setColor("error" as CustomColor);
      setToolTip("Add to Lending Library");
      dispatch({
        type: SET_LENDING_LIBRARY_IDS,
        payload: state.lendingLibraryIDs.filter((b) => b !== bookID),
      });
      dispatch({
        type: SET_LENDING_LIBRARY,
        payload: state.lendingLibrary.filter((b) => b.id !== bookID),
      });
    } else {
      setColor("success" as CustomColor);
      setToolTip("Remove from LendingLibrary");
      //there might be an issue here when the book is directly from google books potentially fix
      //on server side call
      dispatch({
        type: SET_LENDING_LIBRARY_IDS,
        payload: [...state.lendingLibraryIDs, bookID],
      });
      dispatch({
        type: SET_LENDING_LIBRARY,
        payload: [...state.lendingLibrary, book],
      });
    }
    try {
      await fetch(`/api/user/lendingLibrary/${bookID}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          color: currentColor,
          book: book,
          userId: userID,
        }),
      });
      mutate(`/api/user/lendingLibrary/${userID}`);
    } catch (error) {
      // If the server request fails, revert the local state
      if (color === "success") {
        setColor("error" as CustomColor);
        setToolTip("Remove from Lending Library");
        dispatch({
          type: SET_LENDING_LIBRARY_IDS,
          payload: [...state.lendingLibraryIDs, book.id],
        });
      } else {
        setColor("success" as CustomColor);
        setToolTip("Add to Lending Library");
        dispatch({
          type: SET_LENDING_LIBRARY_IDS,
          payload: state.lendingLibraryIDs.filter((b) => b !== bookID),
        });
      }
    }
  };

  return (
    <Tooltip title={toolTip} placement='top-end'>
      <IconButton
        aria-label='Lending Library'
        size='small'
        color={color === "danger" ? "error" : color}
        onClick={lendingLibraryAction}
      >
        <LibraryBooksIcon />
      </IconButton>
    </Tooltip>
  );
};

export default LendingLibraryButton;
