import PropTypes from 'prop-types';
import { useState, useRef } from 'react';
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
import { Box, fontWeight } from '@mui/system';

import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2

import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ReplayIcon from '@mui/icons-material/Replay';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import { useFormik } from 'formik';
import { getCookie } from 'cookies-next';
import { FormSchemas } from 'src/utils/form-schemas';

export const CharacterPrompt = (props) => {
  const { character, handleGenDialogue, voices, handlePlayDialogue } = props;

  const [lines, setLines] = useState([]);


  const formik = useFormik({
    initialValues: {
      model: 10,
      voice: voices.length > 0 ? voices[0].name : '',
      dialogues: 2,
    },
    validationSchema : FormSchemas.promptSchema,
    onSubmit: async (values, helpers) => {
      try {
        const token = getCookie('token');
        const response = await handleGenDialogue(token, character._id, "openai", values.dialogues);
        const new_lines = response.data.lines.map((item, idx) => {
          return { line: item, audio: '', actor : '' }
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

  const saveAudio = (lineIdx, audioUrl, voiceActor) => {
    const new_lines = Array.from(lines);
    new_lines[lineIdx].audio = audioUrl;
    new_lines[lineIdx].actor = voiceActor;
    setLines(new_lines);
  }

  const Reply = ({ lineIdx, audioUrl = "", text = "", voice_name = "", handlePlayDialogue, saveAudioFn = saveAudio, props }) => {

    const audioRef = useRef(null);
    let showPlayer = audioUrl !== "";

    const onPlay = async (event) => {
      const actor = lines[lineIdx].actor;
      if (audioRef !== null && audioRef.current !== null && audioUrl !== "" &&
      actor === voice_name) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        audioRef.current.play();
      }
      else {
        showPlayer = false;
        const option = voices.find((itr) => itr.name === voice_name);
        if (option) {
          try {
            const data = await handlePlayDialogue(option.id, text, voice_name);
            saveAudioFn(lineIdx, data.url, voice_name);
          } catch (error) {
            console.log(error);
          }
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
          <RecordVoiceOverIcon onClick={onPlay}></RecordVoiceOverIcon>
        </Stack>
        {
          showPlayer && 
          <audio src={audioUrl} ref={audioRef} controls>
          </audio>
        }
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
                <Typography alignSelf={'center'} style={{fontSize:30, fontWeight:600}}>
                  {character.name}
                </Typography>
                <Avatar
                  sx={{
                    alignSelf: 'center',
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
                  helperText={formik.touched.voice && formik.errors.voice}
                  label="Select Voice Actor"
                  name="voice"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  required
                  select
                  SelectProps={{ native: true }}
                  defaultValue={formik.values.voice}
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
  handleGenDialogue: PropTypes.func,
  voices: PropTypes.array.isRequired,
  handlePlayDialogue: PropTypes.func,
};