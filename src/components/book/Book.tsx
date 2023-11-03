import { useState, useEffect, useCallback } from "react";
import Image from "next/legacy/image";
import Tooltip from "@mui/material/Tooltip";
import { User, UserBooks, Books } from "@prisma/client";
import {
  StyledBookCard,
  ImageBox,
  SideOfImageBox,
  TopContainer,
  ContentContainer,
  TitleTypography,
  AuthorTypography,
} from "./bookStyles";
import { StarRating } from "./StarRating";
import { ButtonStack } from "./bookButtons/ButtonStack";
import { BigBook } from "./BigBook";

interface Book extends Books {
  books?: Book[];
  wishlist?: UserBooks[];
  owned?: UserBooks[];
}
interface BookProps {
  book: Book;
}
type Review = {
  User: User;
  review: string;
};

export const BookCard: React.FC<BookProps> = ({ book }) => {
  const [bigBookOpen, setBigBookOpen] = useState(false);
  const [reviews, setReviews] = useState<Review[]>([]);

  function truncateTitle(title: string, wordLimit: number) {
    const words = title.split(" ");
    if (words.length > wordLimit) {
      return `${words.slice(0, wordLimit).join(" ")} ...`;
    }
    return title;
  }

  const handleBookClick = () => {
    setBigBookOpen(true);
  };

  const handleCloseBigBook = () => {
    setBigBookOpen(false);
  };

  const getBookReviews = useCallback(async () => {
    if (!book?.id) return;
    try {
      const res = await fetch(`/api/bookDB/reviews/${book.id}`);
      const data: Review[] = (await res.json()) as Review[];
      setReviews(data);
    } catch (err) {
      console.error(err);
    }
  }, [book]);

  useEffect(() => {
    void getBookReviews();
  }, [getBookReviews]);
  return (
    <>
      {bigBookOpen && (
        <BigBook
          book={book}
          bigBookOpen={bigBookOpen}
          handleCloseBigBook={handleCloseBigBook}
          reviews={reviews}
          setReviews={setReviews}
        />
      )}
      <StyledBookCard elevation={3}>
        <div className='backgroundImage'>
          <Image
            src='/mountainBackgound.png' // Update with your image path
            alt='Background'
            layout='fill'
            objectFit='cover' // Adjust as needed
          />
        </div>
        <TopContainer>
          <ImageBox onClick={handleBookClick}>
            <Image
              src={book.image ? book.image : "https://i.imgur.com/XrUd1L2.jpg"}
              alt='Book Cover'
              fill
              sizes='(max-width: 140px) 80%, (max-height:280 px) 100%, 100px'
              quality={95}
            />
          </ImageBox>
          <SideOfImageBox>
            <StarRating book={book} />
            <ButtonStack book={book} />

            {book.author && (
              <AuthorTypography align='center' variant='body1'>
                Written By: <br />
                {book.author}
              </AuthorTypography>
            )}
          </SideOfImageBox>
        </TopContainer>
        <ContentContainer>
          <Tooltip title={book.title} placement='top' arrow>
            <TitleTypography>{truncateTitle(book.title, 10)}</TitleTypography>
          </Tooltip>
        </ContentContainer>
      </StyledBookCard>
    </>
  );
};
