import {
  Box,
  Button,
  Center,
  Divider,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  HStack,
  Image,
  Input,
  Stack,
  Switch,
  Text,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import { fetchWithAxios, showToast } from '../../../Base/BaseFunctions';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setAddress,
  setEmail,
  setFirstName,
  setGender,
  setIsSubmitted,
  setLastName,
  setPhoneNumber,
  setUsername,
} from '../../../store/features/profileSlice';
import man_avatar from '../../../assets/images/man_avatar.png';
import woman_avatar from '../../../assets/images/woman_avatar.jpg';

export const Profile = () => {
  const dispatch = useDispatch();
  const profile = useSelector(state => state.profile);

  const sendCustomerInfo = () => {
    fetchWithAxios.post(`/updatecustomer/`, {
      'username': profile.username,
      'address': profile.address,
      'first_name': profile.firstName,
      'last_name': profile.lastLame,
      'gender': profile.gender ? 'True' : 'False',
    }).then(() => {
      dispatch(setIsSubmitted(false));
    }).catch((e) => {
      showToast('خطا', e.message);
      dispatch(setIsSubmitted(false));
    });
  };

  const getCustomerInfo = () => {
    fetchWithAxios.get(`/getcustomerinfo`, {})
      .then(function(response) {
          const data = response.data;
          console.log(data);
          dispatch(setUsername(data.username));
          dispatch(setEmail(data.email));
          dispatch(setFirstName(data.first_name));
          dispatch(setLastName(data.last_name));
          dispatch(setGender(data.gender));
          dispatch(setPhoneNumber(data.phone_number));
          dispatch(setAddress(data.address));
        },
      ).catch((e) => {
      showToast('خطا', e.message);
    });
  };

  useEffect(() => {
    getCustomerInfo();
  }, []);

  return (
    <>
      <Grid minH={'89vh'} templateRows='repeat(2, 1fr)' templateColumns='repeat(2, 1fr)' gap={5} p={'30px'}>
        <GridItem borderRadius={'30px'} rowSpan={1} colSpan={1} className={'box_shadow'} dir={'rtl'}>
          <Stack mx={5} p={5} mt={'50px'}>
            <VStack spacing={1} mx={2}>
              <FormControl my={3} isRequired>
                <Grid templateColumns='repeat(5, 1fr)' gap={4}>
                  <GridItem colStart={1} colEnd={2} my={'auto'}>
                    <FormLabel><Text as={'b'}>ایمیل:</Text></FormLabel>
                  </GridItem>
                  <GridItem colStart={2} colEnd={6}>
                    <Input cursor={'default'} disabled={true} h={'57px'} dir={'ltr'} type='text' placeholder={'ایمیل'}
                           value={profile.email}
                           onChange={(event) => dispatch(setUsername(event.target.value))} />
                  </GridItem>
                </Grid>
              </FormControl>

              <FormControl my={3} isRequired>
                <Grid templateColumns='repeat(5, 1fr)' gap={4}>
                  <GridItem colStart={1} colEnd={2} my={'auto'}>
                    <FormLabel my={'auto'}><Text as={'b'}>جنسیت:</Text></FormLabel>
                  </GridItem>
                  <GridItem colStart={2} colEnd={6}>
                    <Center>
                      <HStack spacing={2}>
                        <Text>زن</Text>
                        <Switch isChecked={profile.gender} size={'md'} dir={'rtl'} colorScheme='red'
                                readOnly={profile.isSubmitted}
                                onChange={(event) => {
                                  console.log(event.target.checked);
                                  dispatch(setGender(event.target.checked));
                                }} />
                        <Text>مرد</Text>
                      </HStack>
                    </Center>
                  </GridItem>
                </Grid>
              </FormControl>

              <FormControl my={3} isRequired>
                <Grid templateColumns='repeat(5, 1fr)' gap={4}>
                  <GridItem colStart={1} colEnd={2} my={'auto'}>
                    <FormLabel my={'auto'}><Text as={'b'}>شماره موبایل:</Text></FormLabel>
                  </GridItem>
                  <GridItem colStart={2} colEnd={6}>
                    <Input cursor={'default'} disabled={true} h={'57px'} dir={'ltr'} type='text'
                           placeholder={'شماره موبایل'} value={profile.phoneNumber}
                           onChange={(event) => dispatch(setLastName(event.target.value))} />
                  </GridItem>
                </Grid>
              </FormControl>
            </VStack>
          </Stack>
        </GridItem>

        <GridItem borderRadius={'30px'} rowSpan={2} colSpan={1} className={'box_shadow'} dir={'rtl'}>
          <Stack mx={5}>
            <Center>
              <Image src={profile.gender ? man_avatar : woman_avatar} w={'400px'} h={'400px'} />
            </Center>

            <Box>
              <Divider borderWidth={2} borderRadius={8} borderColor={'black'} />
            </Box>

            <VStack spacing={1} mb={2} mt={3}>
              <FormControl my={3} isRequired>
                <Grid templateColumns='repeat(5, 1fr)' gap={4}>
                  <GridItem colStart={1} colEnd={2} my={'auto'}>
                    <FormLabel my={'auto'}><Text as={'b'}>نام کاربری:</Text></FormLabel>
                  </GridItem>
                  <GridItem colStart={2} colEnd={6}>
                    <Input h={'57px'} dir={'ltr'} type='text' placeholder={'نام کاربری'} value={profile.username}
                           onChange={(event) => dispatch(setUsername(event.target.value))}
                           readOnly={profile.isSubmitted} />
                  </GridItem>
                </Grid>
              </FormControl>

              <FormControl my={3} isRequired>
                <Grid templateColumns='repeat(5, 1fr)' gap={4}>
                  <GridItem colStart={1} colEnd={2} my={'auto'}>
                    <FormLabel my={'auto'}><Text as={'b'}>نام:</Text></FormLabel>
                  </GridItem>
                  <GridItem colStart={2} colEnd={6}>
                    <Input h={'57px'} dir={'rtl'} type='text' placeholder={'نام'} value={profile.firstName}
                           onChange={(event) => dispatch(setFirstName(event.target.value))}
                           readOnly={profile.isSubmitted} />
                  </GridItem>
                </Grid>
              </FormControl>

              <FormControl my={3} isRequired>
                <Grid templateColumns='repeat(5, 1fr)' gap={4}>
                  <GridItem colStart={1} colEnd={2} my={'auto'}>
                    <FormLabel my={'auto'}><Text as={'b'}>نام خانوادگی:</Text></FormLabel>
                  </GridItem>
                  <GridItem colStart={2} colEnd={6}>
                    <Input h={'57px'} dir={'rtl'} type='text' placeholder={'نام خانوادگی'} value={profile.lastName}
                           onChange={(event) => dispatch(setLastName(event.target.value))}
                           readOnly={profile.isSubmitted} />
                  </GridItem>
                </Grid>
              </FormControl>

              <Button mt={4} backgroundColor={'green.500'} _hover={{ backgroundColor: 'green.600' }} color={'white'}
                      w={'100%'} isLoading={profile.isSubmitted}
                      onClick={() => {
                        dispatch(setIsSubmitted(true));
                        sendCustomerInfo();
                      }}>
                ثبت تغییرات
              </Button>
            </VStack>
          </Stack>
        </GridItem>

        <GridItem borderRadius={'30px'} rowSpan={1} colSpan={1} className={'box_shadow'} px={9} dir={'rtl'}>
          <FormControl my={3} isRequired>
            <FormLabel mt={6} mb={3}><Text as={'b'}>آدرس:</Text></FormLabel>
            <Textarea minH={'290px'} maxH={'290px'} placeholder='آدرس' value={profile.address}
                      readOnly={profile.isSubmitted}
                      onChange={(event) => dispatch(setAddress(event.target.value))} />
          </FormControl>
        </GridItem>
      </Grid>
    </>
  );
};
