import { Books } from "@prisma/client";
import { useRef } from "react";
import Box from "@mui/material/Box";
import { ExploreBooks } from "./ExploreBooks";
import { useContainerQuery } from "./hooks/useContainerQuery";

type Breakpoint = {
  width: number;
  itemsPerPage: number;
}[];

interface ExploreBooksBoxProps {
  books: Books[];
  setBooks: React.Dispatch<React.SetStateAction<Books[]>>;
}
export default function ExploreBooksBox({
  books,
  setBooks,
}: ExploreBooksBoxProps) {
  const containerRef = useRef(null);
  const breakpoints: Breakpoint = [
    { width: 1000, itemsPerPage: 4 },
    { width: 600, itemsPerPage: 3 },
    { width: 300, itemsPerPage: 2 },
    { width: 0, itemsPerPage: 1 },
    // Add as many breakpoints as you need
  ];

  const { itemsPerPage: booksPerPage } = useContainerQuery(
    containerRef,
    breakpoints
  );

  return (
    <Box ref={containerRef} width='100%' minHeight='300px'>
      <ExploreBooks
        books={books}
        setBooks={setBooks}
        booksPerPage={booksPerPage}
      />
    </Box>
  );
}
