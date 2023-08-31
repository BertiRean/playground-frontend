import Head from 'next/head';
import { subDays, subHours } from 'date-fns';
import { Box, Container, Unstable_Grid2 as Grid } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { OverviewBudget } from 'src/sections/overview/overview-budget';
import { OverviewLatestOrders } from 'src/sections/overview/overview-latest-orders';
import { OverviewLatestProducts } from 'src/sections/overview/overview-latest-products';
import { OverviewSales } from 'src/sections/overview/overview-sales';
import { OverviewTasksProgress } from 'src/sections/overview/overview-tasks-progress';
import { OverviewTotalCustomers } from 'src/sections/overview/overview-total-customers';
import { OverviewTotalProfit } from 'src/sections/overview/overview-total-profit';
import { OverviewTraffic } from 'src/sections/overview/overview-traffic';
import { OverviewSteps } from 'src/sections/overview/overview-steps';
import { useCookies } from 'react-cookie';
import { CharacterRepository } from 'src/lib/character/repositories/character.repositories';
import { WorldBuildingRepository } from 'src/lib/worldbuilding/worldbuilding.repositories';

const now = new Date();

export async function getServerSideProps(ctx) {
  const user = JSON.parse(ctx.req.cookies['user'])
  let text = null;
  let character = null;

  try {
    const worldbuilding = await WorldBuildingRepository.get(user._id)
    text = worldbuilding

    const response = await CharacterRepository.getChars(user._id);
    character = response.chars[0];

  } catch (error) {
    console.log(error);
  }

  return {
    props: {
      worldbuilding: text ? text : "",
      character : character ? character : null,
    }
  }
}

const Page = ({worldbuilding, character}) => {
  const [cookies, setCookies] = useCookies(['user'])
  const user = cookies['user']

  console.log("Char: ", character);
  console.log("WorldBuilding", worldbuilding);

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
              <OverviewSteps user={user} showWorldBuildingAlert={worldbuilding === ""} character={character}></OverviewSteps>
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
