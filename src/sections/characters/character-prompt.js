import PropTypes from 'prop-types';
import { useState } from 'react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Stack,
  TextField,
  Avatar,
  Typography,
  Slider
} from '@mui/material';
import { Box } from '@mui/system';

import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2

import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ReplayIcon from '@mui/icons-material/Replay';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { useFormik } from 'formik';

export const CharacterPrompt = (props) => {
  const { character, handleGenDialogue, voices, handlePlayDialogue} = props;

  const [lines, setLines] = useState([]);

  const formik = useFormik({
    initialValues : {
      model : 10,
      voice : 10,
      dialogues : 2,
    },
    onSubmit : async (values, helpers) => {
      try {
        const response = await handleGenDialogue(character._id, "openai", values.dialogues);
        const new_lines = response.data.lines.map((item, idx) => {
          return {line : item, audio : ''}
        });

        setLines(new_lines);

      } catch (err) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.response.data.detail });
        helpers.setSubmitting(false);
      }
    }
  })

  const models = [
    {
      value: 10,
      name: 'OpenAI'
    },
    {
      value: 20,
      name: 'Llama'
    }
  ];

  const saveAudio = (lineIdx, audioUrl) => {
    const new_lines = Array.from(lines);
    new_lines[lineIdx].audio = audioUrl;
    setLines(new_lines);
  }

  const Reply = ({ lineIdx, audioUrl="", text = "", voice_name = "", handlePlayDialogue, saveAudioFn = saveAudio, props }) => {

    const onPlay = async (event) => {
      const option = voices.find((itr) => itr.name === voice_name);
      if (option){
        try {
        const data = await handlePlayDialogue(option.id, text);
        saveAudioFn(lineIdx, data.url);
        } catch (error) {
          console.log(error);
        }
      }
    }

    return (
      <Box>
        <Stack direction={'row'}
          spacing={3}>
          <Typography>{text}</Typography>
          <ThumbUpIcon></ThumbUpIcon>
          <ThumbDownIcon></ThumbDownIcon>
          <ReplayIcon></ReplayIcon>
          <PlayArrowIcon onClick={onPlay}></PlayArrowIcon>
          <audio src={audioUrl} controls>
          </audio>
        </Stack>
      </Box>
    )
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <Card>
        <CardHeader
        />
        <Divider />
        <CardContent>
          <Grid container
            spacing={3}>
            <Grid item
              xs={6}>
              <Stack direction='column' spacing={3}>
                <Avatar
                  sx={{
                    alignSelf : 'center',
                    width: 328,
                    height: 328,
                  }}
                  src={character.image}
                >
                  Character Avatar
                </Avatar>
                <Box></Box>
                <Typography>
                  {character.description}
                </Typography>
              </Stack>
            </Grid>
            <Grid item
              xs={6}>
              <Stack direction={'column'}
                spacing={3}>
                <Button variant='contained' type='submit'>Generate Dialogue</Button>
                <TextField
                  fullWidth
                  label="Select AI Model"
                  name="model"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  required
                  select
                  SelectProps={{ native: true }}
                  value={formik.values.model}
                >
                  {models.map((option) => (
                    <option
                      key={option.value}
                      value={option.value}
                    >
                      {option.name}
                    </option>
                  ))}
                </TextField>
                <TextField
                  fullWidth
                  label="Select Voice Actor"
                  name="voice"
                  onChange={formik.handleChange}
                  required
                  select
                  SelectProps={{ native: true }}
                  value={formik.values.voice}
                >
                  {voices.map((option) => (
                    <option
                      key={option.id}
                      value={option.name}
                    >
                      {option.name}
                    </option>
                  ))}
                </TextField>
                <Typography id="input-slider"
                  gutterBottom>
                  Dialogue Lines: {formik.values.dialogues}
                </Typography>
                <Slider
                  defaultValue={formik.values.dialogues}
                  value={formik.values.dialogues}
                  max={5}
                  step={1}
                  min={2}
                  valueLabelDisplay='auto'
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name='dialogues'
                >
                </Slider>
                {
                  lines.map((item, idx) => (
                    <Reply
                      lineIdx={idx}
                      audioUrl={item.audio}
                      key={idx + 1}
                      text={item.line}
                      voice_name={formik.values.voice}
                      handlePlayDialogue={handlePlayDialogue}></Reply>
                  ))
                }
              </Stack>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
        </CardActions>
      </Card>
    </form>
  );
};


CharacterPrompt.propTypes = {
  character: PropTypes.object.isRequired,
  handleGenDialogue : PropTypes.func,
  voices : PropTypes.array,
  handlePlayDialogue : PropTypes.func,
};