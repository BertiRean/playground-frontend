import Head from 'next/head';
import {
  Box,
  Container,
  Stack,
  Typography} from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { CharacterCreate } from 'src/sections/characters/character-create';

import { CharacterRepository } from 'src/lib/character/repositories/character.repositories';

const Page = (props) => {

  return (
    <>
      <Head>
        <title>
          Characters | Playground
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="lg">
          <Stack spacing={3}>
            <Typography variant="h4">
              Create Character
            </Typography>
            <CharacterCreate handleSubmit={CharacterRepository.create}/>
          </Stack>
        </Container>
      </Box>
    </>
  )
}

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
