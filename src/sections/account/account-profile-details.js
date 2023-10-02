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
  Unstable_Grid2 as Grid,
  Typography
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
      <Grid container>
        <Grid lg={4}>
          <Card>
            <CardHeader></CardHeader>
            <CardContent sx={{
              display : 'flex',
              flexDirection : 'column',
              alignItems : 'center',
              gap : 2
            }}>
              <input
                accept='image/*'
                id="upload-picture"
                type="file"
                hidden
                onChange={onImgChange}
                
              >
              </input>
              <label htmlFor='upload-picture' >
              <Avatar
                src={formik.values.image_url}
                sx={{
                  width: 200,
                  height: 200,
                }}
              >
              </Avatar>
              </label>
              <Typography variant='h5'>{formik.values.name}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid lg={8}>
          <Card>
          <CardHeader title="Profile Details" subheader='The information can be edited'></CardHeader>
            <CardContent sx={{
              display : 'flex',
              flexDirection : 'column',
              gap : 2
            }}>
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
          </CardContent>
          <Divider></Divider>
          <CardActions sx={{justifyContent : 'flex-end'}}>
          <Button variant='contained' type='submit'>
            Save Details
          </Button>
          </CardActions> 
          </Card>
        </Grid>
      </Grid>
    </form>
  );
};

AccountProfileDetails.propTypes =
{
  user: PropTypes.object,
};
