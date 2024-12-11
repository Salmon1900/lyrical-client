import React, { MouseEvent, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  styled,
  Popover,
} from "@mui/material";
import { Song } from "../../types/Song";
import { AnalyzedSong, SongInfoItem } from "../../types/Analysis";

const SongCard = styled(Card)(({ theme }) => ({
  //   maxWidth: 400,
  width: 400,
  margin: "20px 20px 10px 10px",
  borderRadius: "12px",
  boxShadow: theme.shadows[3],
  backgroundColor: theme.palette.background.paper,
}));

const StatBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.action.hover,
  marginBottom: theme.spacing(1),
}));

interface ISongInfoCard {
  songName: string;
  artist: string;
  infoItems: SongInfoItem[];
}

const SongInfoCard = ({ songName, artist, infoItems }: ISongInfoCard) => {
  const [popoverAnchor, setPopoverAnchor] = useState<HTMLElement | null>(null);
  const [popoverContent, setPopoverContent] = useState<JSX.Element>(<div></div>);

  const handlePopoverOpen = (
    event: MouseEvent<HTMLElement>,
    content: JSX.Element
  ) => {
    setPopoverAnchor(event.currentTarget);
    setPopoverContent(content);
  };

  const handlePopoverClose = () => {
    setPopoverAnchor(null);
    setPopoverContent(<div></div>);
  };

  const isPopoverOpen = Boolean(popoverAnchor);

  return (
    <SongCard>
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          {songName}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          by {artist}
        </Typography>

        {infoItems.map((i) => (
          <StatBox
            {...(i.popover ? {
              onMouseEnter: (e) =>
                handlePopoverOpen(e, i.popoverContent || <div></div>),
              onMouseLeave: handlePopoverClose
              
            } : {})}
            aria-owns={isPopoverOpen ? "details-popover" : undefined}
            aria-haspopup="true"
          >
            <Typography variant="body1" color="text.secondary">
              {i.description}
            </Typography>
            <Typography variant="h6">

              {i.type === "avrage" ? Math.round(i.value as number * 100) / 100 : i.value}
            </Typography>
          </StatBox>
        ))}

        <Popover
          id="details-popover"
          disableRestoreFocus
          sx={{ pointerEvents: "none" }}
          open={isPopoverOpen}
          anchorEl={popoverAnchor}
          onClose={handlePopoverClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
        >
          <Box p={2} maxWidth={200}>
            <Typography variant="body2" color="text.secondary">
              {popoverContent}
            </Typography>
          </Box>
        </Popover>
      </CardContent>
    </SongCard>
  );
};

export default SongInfoCard;
