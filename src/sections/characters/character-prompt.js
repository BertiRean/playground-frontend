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
  Grid,
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
import PropTypes from 'prop-types';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';

import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ReplayIcon from '@mui/icons-material/Replay';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';

export const CharacterPrompt = (props) => {
  const { character } = props;

  const [values, setValues] = useState({
    model : '',
    voice : '',
    dialogues : 2,
  });

  const models = [
    {
      value : 10,
      name : 'OpenAI'
    },
    {
      value : 20,
      name : 'Llama'
    }
  ];

  const voices = [
    {
      value : 10,
      name : 'Jack Sparrow'
    },
    {
      value : 20,
      name : 'Christian Bale'
    },
    {
      value : 30,
      name : 'Emily Blunt'
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

  const Reply = ({text, props}) => {
    return (
      <Box>
        <Stack direction={'row'} spacing={3}>
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
          <Grid2 container spacing={3}>
            <Grid2 item xs={6}>
              <Stack direction='column'>
                <Avatar 
                sx={{
                  width: 328,
                  height: 328,
                }}
                src={character.logo}
                >
                  Character Avatar
                </Avatar>
                <Typography>
                  {character.description}
                </Typography>
              </Stack>
            </Grid2>
            <Grid2 item xs={6}>
              <Stack direction={'column'} spacing={3}>
                <Button variant='contained'>Generate Dialogue</Button>
                <TextField
                  fullWidth
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
                <Typography id="input-slider" gutterBottom>
                  Dialogue Lines: {values.dialogues}
                </Typography>
                <Slider
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
                {
                  Array(values.dialogues).map((value, index) => (
                    <Reply key={index} text={'Kill him and bring me his heart'}></Reply>
                  ))
                }
              </Stack>
            </Grid2>
          </Grid2>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
        </CardActions>
      </Card>
    </form>
  );
};


CharacterPrompt.propTypes = {
  character: PropTypes.object.isRequired
};