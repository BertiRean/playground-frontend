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

export const WorldBuildingRegister = () => {
  const [values, setValues] = useState({
    world_context : '',
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
              fullWidth
              label="World Context"
              name="world_context"
              onChange={handleChange}
              multiline={true}
              value={values.world_context}
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
