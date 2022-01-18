import React from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import data from '../../utils/data';
import Layout from '../../components/Layout';
import useStyles from '../../utils/Styles';
import { Card, CardContent, Grid, Typography, List, ListItem } from '@material-ui/core';
export default function Productscreen() {
  const classes = useStyles();
  const route = useRouter();
  const { slug } = route.query;
  const product = data.products.find((e) => e.slug === slug);

  if (!product) {
    return <div>No Product Found</div>;
  }

  return(
    <Layout>
      <Grid container spacing={3} className={classes.image}>
        <Grid item md={4} xs={8}>
          <Image src={product.image} alternative={product.name} width="640" height= "640" layout="responsive"/>
        </Grid>
        <Grid item>
          <Card>
            <CardContent>
              <List>
                <ListItem><Typography variant='h6'>{product.name}</Typography></ListItem>
              <ListItem><Typography>Category: {product.category}</Typography></ListItem>
              <ListItem><Typography >Brand: {product.brand}</Typography></ListItem>
              <ListItem> <Typography>Rating: {product.rating} stars ({product.numReviews} reviews)</Typography></ListItem>
              <ListItem><Typography>Description: {product.description}</Typography></ListItem>
              </List>
              </CardContent>
          </Card>
        </Grid>
        <Grid item md={3} xs={12}>
          <List>
            <ListItem>
              <Grid conteainer>
                <Grid Item xs={6}>
                  <Typography>Price</Typography>
                </Grid>
                <Grid Item xs={6}>
                  <Typography>{product.price}</Typography>
                </Grid>
              </Grid>
            </ListItem>
          </List>
        </Grid>
      </Grid>
    </Layout>
  )
}
