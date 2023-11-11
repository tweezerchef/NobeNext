import { FC, useState } from "react";
import Typography from "@mui/material/Typography";
import Popover from "@mui/material/Popover";
import { ReviewBox, ReviewPopOver, ReviewTypography } from "./cardStyles";

type ReviewProps = {
  description: string;
};

export const Review: FC<ReviewProps> = ({ description }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <ReviewBox>
      <Typography
        variant='body2'
        onClick={handleClick}
        sx={{ cursor: "pointer", overflow: "hidden" }}
      >
        {description.substring(0, 100)}... {/* Adjust length as needed */}
      </Typography>
      <ReviewPopOver
        id={id}
        open={open}
        onClose={handleClose}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <ReviewTypography variant='body2'>{description}</ReviewTypography>
      </ReviewPopOver>
    </ReviewBox>
  );
};
