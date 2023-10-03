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
import PromptReply from 'src/components/prompt-reply';
import { useFormik } from 'formik';
import { getCookie } from 'cookies-next';
import { FormSchemas } from 'src/utils/form-schemas';
import CircularProgress from '@mui/material/CircularProgress';
import { v4 as uuidv4 } from 'uuid';


export const CharacterPrompt = (props) => {
  const { character, handleGenDialogue, voices, handleGenVoiceForLine } = props;

  const [lines, setLines] = useState([]);
  const [loadingLines, setLoadingLines] = useState(false);


  const formik = useFormik({
    initialValues: {
      model: 10,
      voice: voices.length > 0 ? voices[0].name : '',
      dialogues: 2,
      char_context : ""
    },
    validationSchema : FormSchemas.promptSchema,
    onSubmit: async (values, helpers) => {
      try {
        const token = getCookie('token');
        setLoadingLines(true);
        const model = models.find((itr) => {return itr.value == values.model});
        const response = await handleGenDialogue(token, character._id, model.api_name, values.dialogues, values.char_context);
        const new_lines = response.data.lines.map((item, idx) => {
          return { line: item, audio: '', actor : '' }
        });
        setLines(new_lines);
        setLoadingLines(false);

      } catch (err) {
        setLoadingLines(false);
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.response.data.detail });
        helpers.setSubmitting(false);
      }
    }
  })

  const models = [
    {
      value: 10,
      name: 'OpenAI',
      api_name : 'openai'
    },
    {
      value: 20,
      name: 'Llama',
      api_name: 'llama'
    }
  ];

  const saveAudio = (lineIdx, audioUrl, voiceActor) => {
    const new_lines = Array.from(lines);
    new_lines[lineIdx].audio = audioUrl;
    new_lines[lineIdx].actor = voiceActor;
    setLines(new_lines);
  }

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
                <Typography alignSelf={'center'} variant='h4'>
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
                <Typography variant='body1'>
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
                  label="Additional Context"
                  name="char_context"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  multiline
                  value={formik.values.char_context}
                >

                </TextField>
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
                  !loadingLines && 
                  lines.map((item, idx) => (
                    <PromptReply
                      voices={voices}
                      lineIdx={idx}
                      key={uuidv4()}
                      handleOnSaveAudio={saveAudio}
                      text={item.line}
                      audioUrl={item.audio}
                      actorForLine={item.actor}
                      voiceSelected={formik.values.voice}
                      handleGenVoiceForLine={handleGenVoiceForLine}></PromptReply>
                  ))
                }
                {
                  loadingLines && 
                  <>
                    <CircularProgress style={{alignSelf : 'center'}}></CircularProgress>
                  </>
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
  handleGenVoiceForLine: PropTypes.func,
};