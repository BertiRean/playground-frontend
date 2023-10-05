import Head from 'next/head';
import { Box, Container, Unstable_Grid2 as Grid } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { OverviewSteps } from 'src/sections/overview/overview-steps';
import { CharacterRepository } from 'src/lib/character/repositories/character.repositories';
import { WorldBuildingRepository } from 'src/lib/worldbuilding/worldbuilding.repositories';
import { getCookie } from 'cookies-next';

const now = new Date();

export async function getServerSideProps(ctx) {
  let text = null;
  let character = null;
  let voices = [];

  try {
    const user = JSON.parse(ctx.req.cookies['user'])
    const token = ctx.req.cookies['token'];
    const worldbuilding = await WorldBuildingRepository.get(user._id)
    text = worldbuilding

    const response = await CharacterRepository.getChars(user._id);
    character = response.chars[0];

    const resp = await CharacterRepository.getVoices(token);
    voices = resp;

  } catch (error) {
    console.error(error);
  }

  return {
    props: {
      worldbuilding: text || "",
      character : character || null,
      voices : voices
    }
  }
}

const Page = ({worldbuilding, character, voices}) => {
  const cookie = getCookie('user');
  const user = JSON.parse(cookie);

  return (
    <>
      <Head>
        <title>
          Overview | Playground
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
          <Grid
            container
            spacing={3}
          >
            <Grid
              xs={12}
              sm={12}
              lg={12}
            >
              <OverviewSteps 
              user={user} showWorldBuildingAlert={worldbuilding === ""} 
              character={character}
              voices={voices}
              ></OverviewSteps>
            </Grid>
          </Grid>
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
