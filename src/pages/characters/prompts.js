import Head from 'next/head';
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import {
  Box,
  Button,
  Container,
  Pagination,
  Stack,
  SvgIcon,
  Typography,
  Unstable_Grid2 as Grid
} from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { CharacterPrompt } from 'src/sections/characters/character-prompt';
import { CharacterRepository } from 'src/lib/character/repositories/character.repositories';

export async function getServerSideProps(ctx){

  const {id} = ctx.query
  const char = await CharacterRepository.getData(id);
  char._id = id;
  return {
    props : {
      character : char
    }
  }
}

const Page = ({character}) => {

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
              Dialogue Creation
            </Typography>
            <CharacterPrompt character={character} handleGenDialogue={CharacterRepository.getDialogue} />
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
