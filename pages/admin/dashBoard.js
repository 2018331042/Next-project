import {
  Button,
  List,
  ListItem,
  TextField,
  Typography,
} from '@material-ui/core';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import Layout from '../../components/Layout';
import useStyles from '../../utils/Styles';

export default function DashBoard() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const classes = useStyles();
  const submitHandler = async ({
    productName,
    address,
    category,
    price,
    brand,
  }) => {
    try {
      const {
        data,
        data: { url },
      } = await axios.post('/api/payment/createPayment', {});

      console.log(data);
      router.push(url);
    } catch (err) {
      console.log({ err });
    }
    // router.push('/payment');
  };
  return (
    <Layout title="Shipping slug">
      <form onSubmit={handleSubmit(submitHandler)} className={classes.form}>
        <Typography component="h1" variant="h1">
          Create new Product
        </Typography>
        <List>
          <ListItem>
            <Controller
              name="name"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                minLength: 2,
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="fullName"
                  label="product Name"
                  error={Boolean(errors.productName)}
                  helperText={
                    errors.productName
                      ? errors.productName.type === 'minLength'
                        ? 'product name length is more than 1'
                        : 'product is required'
                      : ''
                  }
                  {...field}
                ></TextField>
              )}
            ></Controller>
          </ListItem>
          <ListItem>
            <Controller
              name="slug"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                minLength: 2,
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="address"
                  label="slug"
                  error={Boolean(errors.address)}
                  helperText={
                    errors.address
                      ? errors.address.type === 'minLength'
                        ? 'slug length is more than 1'
                        : 'slug is required'
                      : ''
                  }
                  {...field}
                ></TextField>
              )}
            ></Controller>
          </ListItem>
          <ListItem>
            <Controller
              name="category"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                minLength: 2,
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="category"
                  label="City"
                  error={Boolean(errors.category)}
                  helperText={
                    errors.category
                      ? errors.category.type === 'minLength'
                        ? 'category length is more than 1'
                        : 'category is required'
                      : ''
                  }
                  {...field}
                ></TextField>
              )}
            ></Controller>
          </ListItem>
          <ListItem>
            <Controller
              name="price"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                minLength: 2,
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="price"
                  label="Price"
                  error={Boolean(errors.price)}
                  helperText={
                    errors.price
                      ? errors.price.type === 'minLength'
                        ? 'Postal Code length is more than 1'
                        : 'Postal Code is required'
                      : ''
                  }
                  {...field}
                ></TextField>
              )}
            ></Controller>
          </ListItem>
          <ListItem>
            <Controller
              name="brand"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                minLength: 2,
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="brand"
                  label="brand"
                  error={Boolean(errors.brand)}
                  helperText={
                    errors.brand
                      ? errors.brand.type === 'minLength'
                        ? 'Country length is more than 1'
                        : 'Country is required'
                      : ''
                  }
                  {...field}
                ></TextField>
              )}
            ></Controller>
          </ListItem>
          <ListItem>
            <Button variant="contained" type="submit" fullWidth color="primary">
              Continue
            </Button>
          </ListItem>
        </List>
      </form>
    </Layout>
  );
}
