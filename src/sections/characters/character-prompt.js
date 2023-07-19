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
  ListItem
} from '@mui/material';
import { Box } from '@mui/system';
import PropTypes from 'prop-types';


export const CharacterPrompt = (props) => {
  const { character } = props;

  const states = [
    {
      value: 'openai',
      label: 'OpenAI'
    },
    {
      value: 'llama',
      label: 'Llama'
    },
  ];

  const voices = [
    {
      value: 'diablo',
      label: 'Diablo'
    },
    {
      value: 'tyrael',
      label: 'Tyrael'
    },
  ];

  const [values, setValues] = useState({
    name : '',
    description : '',
    traits : [''],
    image : '',
  });

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

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader
          title="Write here information about your new character"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            sx={{ flex: '1 1 auto',
            backgroundColor : 'red'
            }}
          >
            <Stack spacing={3} direction={'column'}>
              <Avatar sx={{
                width: 328,
                height: 328,
                backgroundColor: 'green'
              }}>
                Character Avatar
              </Avatar>
              <Typography>Helloasdas</Typography>
              
            </Stack>
            <Stack spacing={3} maxWidth={1024}>
            
            <TextField
                  fullWidth
                  label="Select Model"
                  name="model"
                  onChange={handleChange}
                  required
                  select
                  SelectProps={{ native: true }}
                  value={values.state}
                >
                  {states.map((option) => (
                    <option
                      key={option.value}
                      value={option.value}
                    >
                      {option.label}
                    </option>
                  ))}
              </TextField>
              <TextField
                  fullWidth
                  label="Select Voice"
                  name="voice"
                  onChange={handleChange}
                  required
                  select
                  SelectProps={{ native: true }}
                  value={values.state}
                >
                  {voices.map((option) => (
                    <option
                      key={option.value}
                      value={option.value}
                    >
                      {option.label}
                    </option>
                  ))}
              </TextField>
              <Button variant="contained">
                Generate Dialogue
              </Button>
              <Box
                sx={{
                  mb: 2,
                  display: "flex",
                  flexDirection: "column",
                  height: 700,
                  width : 700,
                  overflow: "hidden",
                  overflowY: "scroll",
                  // justifyContent="flex-end" # DO NOT USE THIS WITH 'scroll'
                }}
              >
                <Typography>Dialogue Lines</Typography>
                <List sx={{row}}>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17].map((value) => (
                    <ListItem
                      key={value}
                      disableGutters
                    >
                      <ListItemText primary={`Line item Chat Message ${value}`} />
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Stack>
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
  character: PropTypes.object.isRequired
};