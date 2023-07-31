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
import { useFormik } from 'formik';
import { FormSchemas } from 'src/utils/form-schemas';
import { CHAR_TRAITS } from 'src/constants/character-traits';

export const CharacterCreate = () => {

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      traits: [],
      image: '',
    },
    validationSchema: FormSchemas.characterSchema.creation,
    onSubmit: null,
  })

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
          <Stack spacing={3}
            direction={'row'}>
            <Avatar sx={{
              width: 328,
              height: 328,
            }}>
            </Avatar>
            <Stack
              spacing={3}
              sx={{ maxWidth: 512 }}
            >
              <TextField
                error={!!(formik.touched.name && formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
                fullWidth
                label="Name"
                name="name"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.name}
              />
              <TextField
                error={!!(formik.touched.description && formik.errors.description)}
                helperText={formik.touched.description && formik.errors.description}
                fullWidth
                label="Description"
                name="description"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.description}
                multiline
              />
              <Autocomplete
                multiple
                id="checkboxes-tags-demo"
                options={CHAR_TRAITS}
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

          </Stack>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button variant="contained">
            Create
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};
