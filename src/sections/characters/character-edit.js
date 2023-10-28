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
  Avatar
} from '@mui/material';
import { CHAR_TRAITS } from 'src/constants/character-traits';
import { useFormik } from 'formik';
import { FormSchemas } from 'src/utils/form-schemas';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

export const CharacterEdit = (props) => {

  const { character, handleUpdateBtn, handleDeleteBtn } = props;
  const router = useRouter();
  const toaster = toast;
  
  const formik = useFormik({
    initialValues : {
      name : character.name,
      description : character.description,
      traits : character.traits,
      image : character.image,
    },
    validationSchema : FormSchemas.characterSchema.creation,
    onSubmit : async (values, helpers) => {
      try {
        const response = await handleUpdateBtn(character._id, values);
        toaster.success('Character updated')
      } catch (err) {
        toaster.error('Oops something has gone wrong')
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.response.data.detail });
        helpers.setSubmitting(false);
      }
    }
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      <Card>
        <CardHeader
          title="From here you can update the details of your character"
        />
        <Divider />
        <CardContent>
          <Stack spacing={3}
            direction={'row'}>
            <Avatar sx={{
              width: 328,
              height: 328,
            }}
              src={character.image}
            >
              Character Avatar
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
                defaultChecked={formik.values.traits}
                defaultValue={formik.values.traits}
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
            Update
          </Button>
          <Button variant="contained">
            Delete
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};


CharacterEdit.propTypes = {
  character: PropTypes.object.isRequired,
  handleUpdateBtn : PropTypes.func,
  handleDeleteBtn : PropTypes.func,
}