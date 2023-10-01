import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  Stack,
  Avatar,
  Unstable_Grid2 as Grid
} from '@mui/material';

import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import { FormSchemas } from 'src/utils/form-schemas';
import { UserRepository } from 'src/lib/user/repositories/user.repositories';
import { getCookie, setCookie } from 'cookies-next';
import { useAuth } from 'src/hooks/use-auth';

export const AccountProfileDetails = (props) => {
  const { user } = props;

  const auth = useAuth();

  const formik = useFormik({
    initialValues: {
      name : user.name,
      email : user.email,
      image_url: user.photo,
      image_path : '',
    },
    validationSchema: FormSchemas.userSchema.update,
    onSubmit: async (values, helpers) => {
      try {
        const user = {
          name : values.name,
          photo : values.image_path,
          id : auth.user.id,
        }
        const data = await UserRepository.update(user)
        console.log(data);
        setCookie('user', data.user, {
          path : '/'
        })
        auth.signIn(data.user)
      } catch (err) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.response.data.detail });
        helpers.setSubmitting(false);
      }
    }
  })

  const onImgChange = (event) => {
    formik.setFieldValue('image_path', event.target.files[0])
    formik.setFieldValue('image_url', URL.createObjectURL(event.target.files[0]))
  }

  return (
    <form
      autoComplete="off"
      noValidate
      onSubmit={formik.handleSubmit}
    >
      <Card>
        <CardHeader
          subheader="The information can be edited"
          title="Profile"
        />
        <CardContent sx={{ pt: 0 }}>
          <Box sx={{ m: -1.5 }}>
            <Grid
              container
              spacing={3}
              direction={'row'}
              justifyContent={'center'}
            >
              <Grid lg={6}>
                <input
                    accept='image/*'
                    id="upload-picture"
                    type="file"
                    hidden
                    onChange={onImgChange}
                  >
                  </input>
                  <label htmlFor='upload-picture'>
                    <Avatar
                      src={formik.values.image_url}
                      sx={{
                        width: 200,
                        height: 200,
                      }}
                    >
                    </Avatar>
                  </label>
              </Grid>
              <Grid lg={6}>
                  <TextField
                    fullWidth
                    helperText="Please specify your name"
                    label="Name"
                    name="name"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    required
                    value={formik.values.name}
                  />

                  <TextField
                    fullWidth
                    label="Email Address"
                    name="email"
                    disabled
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    required
                    value={formik.values.email}
                  />
                </Grid>
            </Grid>
          </Box>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button variant="contained" type='submit'>
            Save details
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};

AccountProfileDetails.propTypes =
{
  user: PropTypes.object,
};
