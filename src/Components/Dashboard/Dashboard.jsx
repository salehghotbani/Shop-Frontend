import { Box, Button, Divider, Grid, GridItem, Stack } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { PROFILE_DASHBOARD } from './DashboardSections';
import { Profile } from './Profile';
import { backgroundBlue } from '../../Base/BaseAttributes';
import { setDashboardSection } from '../../store/features/dashboardSlice';

export const Dashboard = () => {
  const dispatch = useDispatch();
  const dashboard = useSelector(state => state.dashboard);

  const BodyDashboard = () => {
    switch (dashboard.dashboardSection) {
      case PROFILE_DASHBOARD:
        return <Profile />;
    }
  };

  return (
    <>
      <Grid templateColumns='repeat(7, 1fr)' gap={1}>
        <GridItem colStart={1} colEnd={7} m={5}>
          <Box className={'box_shadow'} borderRadius={'30px'}>
            <BodyDashboard />
          </Box>
        </GridItem>

        <GridItem colStart={7} colEnd={8}>
          <Box h={'93.2vh'} className={'box_shadow'} p={5} backgroundColor={backgroundBlue}>
            <Box className={'box_shadow'} borderWidth={1} h={'89vh'} borderRadius={8} borderColor={'gray.500'} p={2} px={4}>
              <Stack>
                <Button color={'white'} backgroundColor={backgroundBlue} _hover={{ backgroundColor: 'blue.800' }}
                        onClick={() => dispatch(setDashboardSection(PROFILE_DASHBOARD))}>
                  پروفایل
                </Button>
                <Button color={'white'} backgroundColor={backgroundBlue} _hover={{ backgroundColor: 'green.800' }}>
                  سبد خرید
                </Button>

                <Divider borderColor={'white'} />

                <Button color={'white'} backgroundColor={backgroundBlue} _hover={{ backgroundColor: 'red.800' }}>
                  خروج
                </Button>
              </Stack>
            </Box>
          </Box>
        </GridItem>
      </Grid>
    </>
  );
};
