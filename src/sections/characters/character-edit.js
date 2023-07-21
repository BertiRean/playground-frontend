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
  Avatar
} from '@mui/material';

export const CharacterEdit = (props) => {

  const {character} = props;

  const char_traits = [
    'Brave',
    'Intelligent',
    'Agile',
    'Thinker',
    'Protector'
  ]

  const [values, setValues] = useState({
    name: character.title,
    description: character.description,
    traits: [],
    image: character.logo,
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
          title="From here you can update the details of your character"
        />
        <Divider />
        <CardContent>
          <Stack spacing={3}
            direction={'row'}>
            <Stack
              spacing={3}
              sx={{ maxWidth: 512 }}
            >
              <TextField
                fullWidth
                label="Name"
                name="name"
                onChange={handleChange}
                value={values.name}
              />
              <TextField
                fullWidth
                label="Description"
                name="description"
                onChange={handleChange}
                value={values.description}
                multiline
              />
              <Autocomplete
                multiple
                id="checkboxes-tags-demo"
                options={char_traits}
                disableCloseOnSelect
                renderOption={(props, option, { selected }) => (
                  <li {...props}>
                    <Checkbox
                      style={{ marginRight: 8 }}
                      checked={selected}
                    />
                    {option}
                  </li>
                )}
                style={{ width: 500 }}
                renderInput={(params) => (
                  <TextField {...params}
                    label="Traits"
                    placeholder="" />
                )}
              >
              </Autocomplete>
            </Stack>
            <Avatar sx={{
              width: 328,
              height: 328,
            }}
            src={character.logo}
            >
              Character Avatar
            </Avatar>
          </Stack>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button variant="contained">
            Update
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};


CharacterEdit.propTypes = { 
  character : PropTypes.object.isRequired
}