import { useCallback, useState } from 'react';
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

export const WorldBuildingRegister = () => {

  const formik = useFormik({
    initialValues: {
      description: '',
    },

    validationSchema: FormSchemas.worldBuildingSchema,
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
          <Button variant="contained">
            Create
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};
