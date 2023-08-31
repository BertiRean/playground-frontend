import Head from 'next/head';
import {
  Box,
  Container,
  Stack,
  Typography} from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { CharacterEdit } from 'src/sections/characters/character-edit';
import { useRouter } from 'next/router';
import { CharacterRepository } from 'src/lib/character/repositories/character.repositories';
import { CHARACTERS_DEFAULT } from 'src/constants/characters-default';

export async function getServerSideProps({params}){

  const {id} = params;
  const char = await CharacterRepository.getData(id);
  char._id = id;
  return {
    props : {
      character : char
    }
  }
}

const Page = ({character}) => 
{
  const router =  useRouter();

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
            Edit Character
          </Typography>
          <CharacterEdit character={character}
          handleUpdateBtn={CharacterRepository.update}
          />
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
