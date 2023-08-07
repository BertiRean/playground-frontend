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
import { CharacterCard } from 'src/sections/characters/character-card';
import { CharactersSearch } from 'src/sections/characters/characters-search';
import { useRouter } from 'next/router';
import { prefixSearch } from 'src/utils/prefix-search';
import { useState } from 'react';
import { CHARACTERS_DEFAULT } from 'src/constants/characters-default';

const Page = (props) => {

  const {characters} = props;
  const router = useRouter();
  const [searchText, setSearchText] = useState('');

  const onCreatePress = () => {
    router.push('/characters/create')
  }

  const onSearchChange = (event) => {
    setSearchText(event.target.value);
  }

  const filteredChars = characters.filter((item) => {
    return prefixSearch(item.title, searchText);
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
              justifyContent="space-between"
              spacing={4}
            >
              <Stack spacing={1}>
                <Typography variant="h4">
                  Characters
                </Typography>
              </Stack>
              <div>
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
              </div>
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
                  key={character.id}
                >
                  <CharacterCard character={character} />
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

export async function getServerSideProps(){
  return {
    props : {
      characters : CHARACTERS_DEFAULT,
    }
  }
}

export default Page;
