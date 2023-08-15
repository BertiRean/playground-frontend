import { useCallback } from 'react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Stack,
  TextField
} from '@mui/material';
import { useFormik } from 'formik';
import { FormSchemas } from 'src/utils/form-schemas';
import PropTypes from 'prop-types';
import { WorldBuildingRepository } from 'src/lib/worldbuilding/worldbuilding.repositories';
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/router';

export const WorldBuildingRegister = (props) => {

  const {worldbuildingText, handleUpdateWorldBulding} = props;
  const isEmpty = worldbuildingText === "";
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      description: worldbuildingText,
    },
    validationSchema: FormSchemas.worldBuildingSchema,
    onSubmit : async (values, helpers) => {
      try {
        const cookie = getCookie('user');
        const user = JSON.parse(cookie);
        await handleUpdateWorldBulding(user._id, values.description);
        router.push('/worldbuilding')
      } catch (error) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: error.response.data.detail });
        helpers.setSubmitting(false);
      }
    }
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      <Card>
        <CardHeader
          subheader='Fill this with the world context for the world your characters interact with, the more detailed the better the generated dialogue will be'
          title="Create World building"
        />
        <Divider />
        <CardContent>
          <Stack
            spacing={3}
            sx={{ maxWidth: 1024 }}
          >
            <TextField
              error={!!(formik.touched.description && formik.errors.description)}
              helperText={formik.touched.description && formik.errors.description}
              fullWidth
              label="World Context"
              name="description"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              multiline={true}
              value={formik.values.description}
            />
          </Stack>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button variant="contained" type="submit">
            {isEmpty ? "Create" : "Update"}
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};

WorldBuildingRegister.propTypes = {
  worldbuildingText : PropTypes.string.isRequired,
  handleUpdateWorldBulding : PropTypes.func
}