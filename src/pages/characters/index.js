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

const characters = [
  {
    id: '2569ce0d517a7f06d3ea1f24',
    createdAt: '27/03/2019',
    description: 'A member of the House of Auditore, Ezio remained unaware of his Assassin heritage until the age of 17, when he witnessed the hanging of his father and two brothers, Federico and Petruccio.',
    logo: 'https://pbs.twimg.com/profile_images/632551318767296513/RG29aTVV_400x400.png',
    title: 'Ezio Auditore',
  },
  {
    id: 'ed2b900870ceba72d203ec15',
    createdAt: '31/03/2019',
    description: 'In payment for his blunders at the Undercity, Varimathras has been tortured by the Coven of Shivarra. The vindictive sisters stripped away both flesh and sanity, leaving only a singular desire to inflict suffering upon the mortals who cost him everything.',
    logo: 'https://wow.zamimg.com/uploads/screenshots/normal/661599-battle-net-avatars.jpg',
    title: 'Varimathras',
  },
  {
    id: 'a033e38768c82fca90df3db7',
    createdAt: '03/04/2019',
    description: 'Iridikron the Stonescaled is one of the four Primal Incarnates. Along with his brethren, he rejected the gift of the titans and turned to the elements instead, becoming an incarnation of the earth itself.',
    logo: 'https://wow.zamimg.com/uploads/screenshots/normal/661596-battle-net-avatars.jpg',
    title: 'Iridikron',
  },
  {
    id: '1efecb2bf6a51def9869ab0f',
    createdAt: '04/04/2019',
    description: ' the leader of the infinite dragonflight, and a future counterpart of the Aspect of Time, Nozdormu. In some future, Nozdormu is corrupted by the Old Gods and creates the infinite dragonflight.',
    logo: 'https://wow.zamimg.com/uploads/screenshots/normal/661532-battle-net-avatars.jpg',
    title: 'Murozond',
  },
  {
    id: '1ed68149f65fbc6089b5fd07',
    createdAt: '04/04/2019',
    description: 'Responsible for many horrors suffered by Azeroth. In an attempt to escape its prison, the Old God corrupted the titan-forged keeper Loken and turned him against his own brethren',
    logo: 'https://wow.zamimg.com/uploads/screenshots/normal/661531-battle-net-avatars.jpg',
    title: 'Yogg Saron',
  },
  {
    id: '5dab321376eff6177407e887',
    createdAt: '04/04/2019',
    description: 'Geralt of Rivia first met Yennefer 20 years before the events of The Witcher 3. Their first adventure involved the "impossible" task of capturing a genie and Geralt\'s subsequent wish that led their fates to be intertwined forever.',
    logo: 'https://avatarfiles.alphacoders.com/178/178254.jpg',
    title: 'Yennefer of Vengerberg',
  }
];

const Page = () => {

  const router = useRouter();

  const onCreatePress = () => {
    router.push('/characters/create')
  }

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
            <CharactersSearch />
            <Grid
              container
              spacing={3}
            >
              {characters.map((character) => (
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

export default Page;
