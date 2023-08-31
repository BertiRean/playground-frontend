import PropTypes from 'prop-types';
import { useCallback, useState } from 'react';
import {
  Autocomplete,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Stack,
  TextField,
  Checkbox,
  Avatar,
  Typography,
  Paper,
  List,
  ListItemText,
  ListItem,
  Select,
  MenuItem,
  FormHelperText,
  InputLabel,
  Slider
} from '@mui/material';
import { Box, maxWidth } from '@mui/system';

import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2

import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ReplayIcon from '@mui/icons-material/Replay';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';

export const CharacterPromptDefault = (props) => {

  let {defaultChar} = props;

  if (defaultChar === undefined ||
    defaultChar === null){
    defaultChar = {
      image : '',
      description : 'Your character description',
      name : 'Your character name'
    }
  }

  const [values, setValues] = useState({
    model: 10,
    voice: 10,
    dialogues: 2,
  });

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

  const voices = [
    {
      value: 10,
      name: 'Jack Sparrow'
    },
    {
      value: 20,
      name: 'Christian Bale'
    },
    {
      value: 30,
      name: 'Emily Blunt'
    }
  ]

  const handleChange = useCallback(
    (event) => {
      setValues((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.value
      }));
    },
    []
  );

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
    },
    []
  );

  const Reply = ({ text, props }) => {
    return (
      <Box>
        <Stack direction={'row'}
          spacing={3}>
          <Typography>{text}</Typography>
          <ThumbUpIcon></ThumbUpIcon>
          <ThumbDownIcon></ThumbDownIcon>
          <ReplayIcon></ReplayIcon>
          <RecordVoiceOverIcon></RecordVoiceOverIcon>
        </Stack>
      </Box>
    )
  };

  return (
    <form onSubmit={handleSubmit}>
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
                <Typography alignSelf={'center'} style={{ fontSize: 30, fontWeight: 600 }}>
                  {defaultChar.name}
                </Typography>
                <Avatar
                  sx={{
                    alignSelf : 'center',
                    width: 328,
                    height: 328,
                  }}
                  src={defaultChar.image}
                >
                </Avatar>
                <Box sx={{height : '20%'}}></Box>
                <Typography alignSelf={'center'}>
                  {defaultChar.description}
                </Typography>
              </Stack>
            </Grid>
            <Grid item
              xs={6}>
              <Stack direction={'column'}
                spacing={3}>
                <Button variant='contained' disabled>Generate Dialogue</Button>
                <TextField
                  fullWidth
                  disabled
                  label="Select AI Model"
                  name="model"
                  onChange={handleChange}
                  required
                  select
                  SelectProps={{ native: true }}
                  value={values.model}
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
                  disabled
                  fullWidth
                  label="Select Voice Actor"
                  name="voice"
                  onChange={handleChange}
                  required
                  select
                  SelectProps={{ native: true }}
                  value={values.voice}
                >
                  {voices.map((option) => (
                    <option
                      key={option.value}
                      value={option.value}
                    >
                      {option.name}
                    </option>
                  ))}
                </TextField>
                <Typography 
                  id="input-slider"
                  gutterBottom
                >
                  Dialogue Lines: {values.dialogues}
                </Typography>
                <Slider
                  disabled
                  defaultValue={values.dialogues}
                  value={values.dialogues}
                  max={5}
                  step={1}
                  min={2}
                  valueLabelDisplay='auto'
                  onChange={handleChange}
                  name='dialogues'
                >
                </Slider>
                <Typography>Results: </Typography>
                {
                  [...Array(values.dialogues).keys()].map((item, idx) => (
                    <Reply key={item + 1}
                      text="Kill them by the glory of the queen"></Reply>
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

CharacterPromptDefault.propTypes = {
  defaultChar : PropTypes.object,
};