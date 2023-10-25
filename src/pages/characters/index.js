import Head from 'next/head';
import DownloadIcon from '@mui/icons-material/Download';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import {
  Box,
  Button,
  Container,
  Pagination,
  Stack,
  SvgIcon,
  Typography,
  Unstable_Grid2 as Grid,
  Snackbar
} from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { CharacterCard } from 'src/sections/characters/character-card';
import { CharactersSearch } from 'src/sections/characters/characters-search';
import { useRouter } from 'next/router';
import { prefixSearch } from 'src/utils/prefix-search';
import { useState } from 'react';
import { CharacterRepository } from 'src/lib/character/repositories/character.repositories';
import exportFromJSON from 'export-from-json';

export async function getServerSideProps(ctx) {

  const user = JSON.parse(ctx.req.cookies['user'])
  let data = [];

  await CharacterRepository.getChars(user._id)
  .then(response => { data = response.chars})
  .catch(error => {console.error(error)})

  return {
    props: {
      characters: data,
      userId : user._id
    }
  }
}

const Page = ({characters, userId}) => {

  const router = useRouter();
  const [searchText, setSearchText] = useState('');

  const onCreatePress = () => {
    router.push('/characters/create')
  }

  const onExportPress = async (e) => {
    try {
      const data = await CharacterRepository.getFavoriteDialogues(userId);
      if (Object.keys(data.lines).length > 0){
        exportFromJSON({
          data : data.lines,
          fileName : 'dialogue',
          exportType : exportFromJSON.types.json
        });
      }
      else{

      }
    } catch (error) {
      console.error(error);
    }
  }

  const onSearchChange = (event) => {
    setSearchText(event.target.value);
  }

  const filteredChars = characters.filter((item) => {
    return prefixSearch(item.name, searchText);
  })

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
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack
              direction="row"
              spacing={4}
              justifyContent={'space-between'}
            >
              <Stack spacing={1}>
                <Typography variant="h4">
                  Characters
                </Typography>
              </Stack>
              <Stack direction={'row'} spacing={2}>
              <Button
                startIcon={(
                  <SvgIcon fontSize="small">
                    <PlusIcon />
                  </SvgIcon>
                )}
                onClick={onCreatePress}
                variant="contained"
              >
                Add
              </Button>
              <Button onClick={onExportPress} variant='contained' startIcon={(
                <SvgIcon fontSize='small'>
                  <DownloadIcon></DownloadIcon>
                </SvgIcon>
              )}>Export Dialogues</Button>
              </Stack>
            </Stack>
            <CharactersSearch onTextChange={onSearchChange} />
            <Grid
              container
              spacing={3}
            >
              {filteredChars.map((character) => (
                <Grid
                  xs={12}
                  md={6}
                  lg={4}
                  key={character._id}
                >
                  <CharacterCard character={character} handleCharDeleteAccept={CharacterRepository.delete} />
                </Grid>
              ))}
            </Grid>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center'
              }}
            >
              <Pagination
                count={3}
                size="small"
              />
            </Box>
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
