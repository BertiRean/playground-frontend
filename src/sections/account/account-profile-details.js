import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  Avatar,
  Unstable_Grid2 as Grid
} from '@mui/material';

import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import { FormSchemas } from 'src/utils/form-schemas';
import { UserRepository } from 'src/lib/user/repositories/user.repositories';
import { getCookie, setCookie } from 'cookies-next';
import { useAuth } from 'src/hooks/use-auth';

const states = [
  {
    value: 'alabama',
    label: 'Alabama'
  },
  {
    value: 'new-york',
    label: 'New York'
  },
  {
    value: 'san-francisco',
    label: 'San Francisco'
  },
  {
    value: 'los-angeles',
    label: 'Los Angeles'
  }
];

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
        const cookies = getCookie('user');
        const user_cookie = JSON.parse(cookies);
        const user = {
          name : values.name,
          photo : values.image_path,
          id : user_cookie._id,
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
              lg={12}
              justifyContent={'center'}
              direction={'column'}
            >
              <Grid alignSelf={'center'}>
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
                      width: 120,
                      height: 120,
                    }}
                  >
                  </Avatar>
                </label>
              </Grid>
              <Grid>
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
              </Grid>
              <Grid>
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
