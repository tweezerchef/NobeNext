import Stack from "@mui/material/Stack";
import Image from "next/image";
import { FC } from "react";
import Typography from "@mui/material/Typography";
import { Activity, User, Books } from "@prisma/client";

interface ExtendedActivity extends Omit<Activity, "createdAt"> {
  createdAt: string; // Now expecting a string instead of a Date
  Books: Books;
  user: User;
}

interface SideCarBookProps {
  activity: ExtendedActivity;
}

export const SideCarBook: FC<SideCarBookProps> = ({ activity }) => (
  <Stack>
    <Image
      src={activity.Books.image}
      alt={activity.Books.title}
      width={80}
      height={110}
    />
  </Stack>
);