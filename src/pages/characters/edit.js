import Head from 'next/head';
import {
  Box,
  Container,
  Stack,
  Typography} from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { CharacterEdit } from 'src/sections/characters/character-edit';
import { useRouter } from 'next/router';

const Page = (props) => 
{
  const router =  useRouter();
  const character = router.query;

  return (
    <>
    <Head>
      <title>
        Settings | Devias Kit
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
            Edit Character
          </Typography>
          <CharacterEdit character={character} />
        </Stack>
      </Container>
    </Box>
  </>
  );
}

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
