import Head from 'next/head';
import {
  Box,
  Container,
  Stack,
  Typography} from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { CharacterPrompt } from 'src/sections/characters/character-prompt';
import { CharacterRepository } from 'src/lib/character/repositories/character.repositories';

export async function getServerSideProps(ctx){

  const token = ctx.req.cookies['token'];
  const {id} = ctx.query
  const char = await CharacterRepository.getData(id);
  char._id = id;

  let voices = [];

  try {
    const resp = await CharacterRepository.getVoices(token);
    voices = resp;
  } catch (error) {
    
  }

  return {
    props : {
      character : char,
      voices : voices
    }
  }
}

const Page = ({character, voices}) => {

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
              Dialogue Creation
            </Typography>
            <CharacterPrompt 
              character={character} 
              handleGenDialogue={CharacterRepository.getDialogue} 
              voices={voices}
              handleGenVoiceForLine={CharacterRepository.genVoiceForLine}
              handleRefinateLine={CharacterRepository.refinateLine}
              handleFavoriteLine={CharacterRepository.markFavoriteLine}
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
