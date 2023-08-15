import PropTypes from 'prop-types';
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
  IconButton
} from '@mui/material';
import { useFormik } from 'formik';
import { FormSchemas } from 'src/utils/form-schemas';
import { CHAR_TRAITS } from 'src/constants/character-traits';
import { CharacterRepository } from 'src/lib/character/repositories/character.repositories';
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/router';


export const CharacterCreate = (props) => {

  const { handleSubmit } = props;

  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      traits: [],
      image: null,
    },
    validationSchema: FormSchemas.characterSchema.creation,
    onSubmit: async (values, helpers) => {
      try {
        const cookies = getCookie('user');
        const user = JSON.parse(cookies);
        await CharacterRepository.create(values, user._id);
        router.push('/characters/')
      } catch (err) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.response.data.detail });
        helpers.setSubmitting(false);
      }
    }
  })

  const handleImgUpload = (event) => {
    console.log(event.target.files[0])
    formik.setFieldValue('image', event.target.files[0])
  }

  return (
    <form onSubmit={formik.handleSubmit}>
      <Card>
        <CardHeader
          title="Write here information about your new character"
        />
        <Divider />
        <CardContent>
          <Stack spacing={3}
            direction={'row'}>
            <input accept="image/*" id="upload-avatar-pic" type="file" hidden onChange={handleImgUpload}/>
            <label htmlFor="upload-avatar-pic">
              <IconButton component="span">
                <Avatar 
                  sx={{
                    width : 328,
                    height : 328
                  }}
                />
              </IconButton>
            </label>
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
                onChange={(event, values) => { formik.setFieldValue('traits', values) }}
              >
              </Autocomplete>
            </Stack>

          </Stack>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button variant="contained" type='submit'>
            Create
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};

CharacterCreate.propTypes = {
  handleSubmit: PropTypes.func,
}
