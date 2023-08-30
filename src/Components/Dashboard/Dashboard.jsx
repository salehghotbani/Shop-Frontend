import { Box, Button, Divider, Grid, GridItem, Stack } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { ALL_ORDERS, CART_DASHBOARD, PENDING_ORDERS, PROFILE_DASHBOARD } from './DashboardSections';
import { Profile } from './DashboardSections/Profile';
import { backgroundBlue } from '../../Base/BaseAttributes';
import { setDashboardSection } from '../../store/features/dashboardSlice';
import { Cart } from './DashboardSections/Cart';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { logout } from '../../Base/BaseFunctions';
import { PendingOrders } from './DashboardSections/PendingOrders';
import { AllOrders } from './DashboardSections/AllOrders';

export const Dashboard = () => {
  const dispatch = useDispatch();
  const dashboard = useSelector(state => state.dashboard);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const navigate = useNavigate();

  const BodyDashboard = () => {
    switch (dashboard.dashboardSection) {
      case PROFILE_DASHBOARD:
        return <Profile />;
      case CART_DASHBOARD:
        return <Cart />;
      case PENDING_ORDERS:
        return <PendingOrders />;
      case ALL_ORDERS:
        return <AllOrders />;
      default:
        return <Profile />;
    }
  };

  const setDashboardSectionFromQueryParameter = () => {
    if (queryParams.get('dashboard_section') === null) {
      dispatch(setDashboardSection(PROFILE_DASHBOARD));
      setQueryParameter(PROFILE_DASHBOARD);
    } else {
      dispatch(setDashboardSection(queryParams.get('dashboard_section')));
    }
  };

  const setQueryParameter = (value) => {
    queryParams.set('dashboard_section', value.toString());
    navigate({ search: queryParams.toString() });
  };

  useEffect(() => {
    setDashboardSectionFromQueryParameter();
  }, []);

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
            <Box className={'box_shadow'} borderWidth={1} h={'89vh'} borderRadius={8} borderColor={'gray.500'} p={2}
                 px={4}>
              <Stack>
                <Button color={'white'}
                        backgroundColor={dashboard.dashboardSection === PROFILE_DASHBOARD ? 'blue.800' : backgroundBlue}
                        _hover={{ backgroundColor: 'blue.800' }}
                        onClick={() => {
                          dispatch(setDashboardSection(PROFILE_DASHBOARD));
                          if (queryParams.get('dashboard_section') !== PROFILE_DASHBOARD)
                            setQueryParameter(PROFILE_DASHBOARD);
                        }}>
                  پروفایل
                </Button>
                <Button color={'white'}
                        backgroundColor={dashboard.dashboardSection === CART_DASHBOARD ? 'green.800' : backgroundBlue}
                        _hover={{ backgroundColor: 'green.800' }}
                        onClick={() => {
                          dispatch(setDashboardSection(CART_DASHBOARD));
                          if (queryParams.get('dashboard_section') !== CART_DASHBOARD)
                            setQueryParameter(CART_DASHBOARD);
                        }}>
                  سبد خرید
                </Button>
                <Button color={'white'}
                        backgroundColor={dashboard.dashboardSection === PENDING_ORDERS ? 'yellow.800' : backgroundBlue}
                        _hover={{ backgroundColor: 'yellow.800' }}
                        onClick={() => {
                          dispatch(setDashboardSection(PENDING_ORDERS));
                          if (queryParams.get('dashboard_section') !== PENDING_ORDERS)
                            setQueryParameter(PENDING_ORDERS);
                        }}>
                  سفارش در انتظار
                </Button>
                <Button color={'white'}
                        backgroundColor={dashboard.dashboardSection === ALL_ORDERS ? 'cyan.800' : backgroundBlue}
                        _hover={{ backgroundColor: 'cyan.800' }}
                        onClick={() => {
                          dispatch(setDashboardSection(ALL_ORDERS));
                          if (queryParams.get('dashboard_section') !== ALL_ORDERS)
                            setQueryParameter(ALL_ORDERS);
                        }}>
                  سفارشات
                </Button>

                <Divider borderColor={'white'} />

                <Button color={'white'} backgroundColor={backgroundBlue} _hover={{ backgroundColor: 'red.800' }}
                        onClick={() => logout(navigate)}>
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
