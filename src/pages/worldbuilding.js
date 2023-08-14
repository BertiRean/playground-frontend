import Head from 'next/head';
import {
  Box,
  Container,
  Stack,
  Typography
} from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { WorldBuildingRegister } from 'src/sections/worldbuilding/worldbuilding-register';
import { WorldBuildingRepository } from 'src/lib/worldbuilding/worldbuilding.repositories';

export async function getServerSideProps(ctx) {
  const user = JSON.parse(ctx.req.cookies['user'])
  let data = null;

  await WorldBuildingRepository.get(user._id)
  .then(response => { data = response})
  .catch(error => {console.error(error)})

  return {
    props: {
      worldbuildingText: data
    }
  }
}

const Page = ({ worldbuildingText }) => 
{

  return(
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
              World Building
            </Typography>
            <WorldBuildingRegister worldbuildingText={worldbuildingText} />
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
