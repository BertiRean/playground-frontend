import { useRef, useState } from 'react';
import { Box } from '@mui/system';
import { Typography, Stack, CircularProgress } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import PropTypes from 'prop-types';

export const PromptReply = ({ lineIdx, audioUrl = "", text = "", voiceSelected = "",
handleGenVoiceForLine = async () => {}, handleOnSaveAudio = () => {},
voices = [], actorForLine = "",
onPositiveReviewClick = () => {},
onNegativeReviewClick = () => {},
onFavoriteLineClick = async () => {},
props }) => {

  const audioRef = useRef(null);
  const [showPlayer, setShowPlayer] = useState(audioUrl !== "");
  const [loadingAudios, setLoadingAudios] = useState(false);
  const [yesPressed, setYesPressed] = useState(false);
  const [noPressed, setNoPressed] = useState(false);
  const [favoritePressed, setFavoritePress] = useState(false);

  const onPlay = async (event) => {
    if (audioRef !== null && audioRef.current !== null && audioUrl !== "" &&
    actorForLine === voiceSelected) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
    else {
      setShowPlayer(false);
      const option = voices.find((itr) => itr.name === voiceSelected);
      if (option) {
        try {
          setLoadingAudios(true);
          const data = await handleGenVoiceForLine(option.id, text, voiceSelected);
          handleOnSaveAudio(lineIdx, data.url, voiceSelected);
          setLoadingAudios(false);
        } catch (error) {
          setLoadingAudios(false);
          console.warn(error);
        }
      }
    }
  }

  const onYesPressed = (event) => {
    if (noPressed)
      return

    onPositiveReviewClick()
    setYesPressed(true)
  }

  const onNoPressed = (event) => {
    if (yesPressed)
      return

    onNegativeReviewClick()
    setNoPressed(true)
  }

  const onFavoritePressed = (event) => {
    onFavoriteLineClick(!favoritePressed)
    setFavoritePress(!favoritePressed)
  }

  return (
    <Box>
      <Stack direction={'row'}
        spacing={3}>
        <Typography>{text}</Typography>
        <ThumbUpIcon color={yesPressed ? 'success' : 'inherit'} onClick={onYesPressed}></ThumbUpIcon>
        <ThumbDownIcon color={noPressed ? 'error' : 'inherit'} onClick={onNoPressed}></ThumbDownIcon>
        {favoritePressed && <FavoriteIcon onClick={onFavoritePressed}></FavoriteIcon>}
        {!favoritePressed && <FavoriteBorderIcon onClick={onFavoritePressed}></FavoriteBorderIcon>}
        <VolumeUpIcon onClick={onPlay}></VolumeUpIcon>
      </Stack>
      {
        loadingAudios && 
        <CircularProgress style={{alignSelf : 'center'}}></CircularProgress>
      }
      {
        showPlayer && 
        <audio src={audioUrl} ref={audioRef} controls>
        </audio>
      }
    </Box>
  )
};

PropTypes.PropTypes = {
  lineIdx : PropTypes.number,
  audioUrl : PropTypes.string,
  voiceSelected : PropTypes.string,
  handleGenVoiceForLine : PropTypes.func,
  handleOnSaveAudio : PropTypes.func,
  onPositiveReviewClick : PropTypes.func,
  onNegativeReviewClick : PropTypes.func,
  onFavoriteLineClick : PropTypes.func,
  voices : PropTypes.array,
  actorForLine : PropTypes.string
}

export default PromptReply;

