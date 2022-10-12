import React from 'react';
import {
  Text,
  Box,
  ScrollView,
  Stack,
  Divider,
  Input,
  Button,
  Image,
} from 'native-base';
import {useForm, Controller} from 'react-hook-form';
import {useDispatch} from 'react-redux';
import {setUser} from '../states/user';
import {useSelector} from 'react-redux';
import {Loading} from '../comonds/Loading';

const Login = () => {
  const userState = useSelector(state => state.user);
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();
  const dispatch = useDispatch();
  const onSubmit = async data => {
    await dispatch(setUser(data));
    console.log(userState.data);
  };
  return (
    <ScrollView w="90%">
      <Stack
        space={2.5}
        alignSelf="center"
        px="4"
        safeArea
        mt="4"
        w={{
          base: '100%',
          md: '25%',
        }}>
        <Box alignItems={'center'}>
          <Image
            source={require('../asset/logo.png')}
            alt="Alternate Text"
            size="2xl"
          />
          <Text bold fontSize="2xl" mb="4" color="cyan.50" marginBottom={10}>
            Login
          </Text>
          <Controller
            control={control}
            rules={{
              required: true,
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              },
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <Input
                type="number"
                variant="rounded"
                placeholder="E-mail"
                fontSize={17}
                color={'cyan.50'}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="email"
          />
          <Box minH={10}>
            {errors.email && (
              <Text color={'#FE0303'}>* Campo vacío o formato incorrecto.</Text>
            )}
          </Box>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <Input
                type="password"
                variant="rounded"
                placeholder="Contraseña"
                fontSize={17}
                color={'cyan.50'}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="pass"
          />
          <Box minH={10}>
            {errors.pass && (
              <Text color={'#FE0303'}>*Este campo es requerido</Text>
            )}
          </Box>
          <Divider />
          <Button
            variant="outline"
            borderRadius={20}
            w="60%"
            marginTop={5}
            onPress={handleSubmit(onSubmit)}>
            {!userState.loading ? (
              'Iniciar sesión'
            ) : (
              <Loading color="primary.500" text={true} />
            )}
          </Button>
        </Box>
      </Stack>
    </ScrollView>
  );
};

export default Login;
