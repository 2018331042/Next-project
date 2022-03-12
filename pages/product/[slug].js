import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import data from '../../utils/data';
import Layout from '../../components/Layout';
import useStyles from '../../utils/Styles';
import Comment from '../../models/Comment';
import {
  Card,
  CardContent,
  Grid,
  Typography,
  List,
  ListItem,
  Button,
  Modal,
  Box,
  TextareaAutosize,
} from '@material-ui/core';
import db from '../../utils/db';
import Product from '../../models/Product';
import { Store } from '../../utils/Store';
import axios from 'axios';
import useSWR from 'swr';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

// const fetcher = async (url, params) => await axios.get(url, params);

export default function Productscreen(props) {
  const { dispatch } = useContext(Store);
  const { product } = props;
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [comments, setComments] = React.useState(props.comments);
  const [comment, setComment] = useState();
  const { state } = useContext(Store);
  const { userInfo } = state;
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const classes = useStyles();
  // const { data } = useSWR(
  //   '/api/comments/getComments',
  //   fetcher({ productId: product._id })
  // );
  console.log(data);
  if (open == true) console.log('OK');
  if (open == false) console.log('close');

  if (!product) {
    return <div>No Product Found</div>;
  }
  const addtoCartHandler = async () => {
    const { data } = await axios.get(`/api/Products/${product._id}`);
    if (data.countInStock <= 0) {
      window.alert('sorry, product is not available');
      return;
    }
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity: 1 } });
    router.push('/Cart');
  };

  const commentPostHandler = async () => {
    try {
      const { data } = await axios.post('/api/comments/comment', {
        name: userInfo.name,
        productId: product._id,
        comment,
      });
      console.log(comment);
      setComments((comments) => [...comments, data.comment]);
      console.log({ data });
      setComment('');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Layout>
      <Grid xs={12} container spacing={1} className={classes.image}>
        <Grid item xs={4}>
          <Image
            src={product.image}
            alt={product.name}
            width="640"
            height="640"
            layout="responsive"
            onClick={handleOpen}
          />
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Image
                src={product.image}
                alt={product.name}
                width="640"
                height="640"
                layout="responsive"
              />
            </Box>
          </Modal>
        </Grid>
        <Grid item xs={4}>
          <Card>
            <CardContent>
              <List>
                <ListItem>
                  <Typography variant="h6">{product.name}</Typography>
                </ListItem>
                <ListItem>
                  <Typography>Category: {product.category}</Typography>
                </ListItem>
                <ListItem>
                  <Typography>Brand: {product.brand}</Typography>
                </ListItem>
                <ListItem>
                  {' '}
                  <Typography>
                    Rating: {product.rating} stars ({product.numReviews}{' '}
                    reviews)
                  </Typography>
                </ListItem>
                <ListItem>
                  <Typography>Description: {product.description}</Typography>
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>
        <Grid item md={3} xs={12}>
          <Card>
            <List>
              <ListItem>
                <Grid container>
                  <Grid Item xs={6}>
                    <Typography>Price</Typography>
                  </Grid>
                  <Grid Item xs={6}>
                    <Typography>${product.price}</Typography>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Grid container>
                  <Grid Item xs={6}>
                    <Typography>Status</Typography>
                  </Grid>
                  <Grid Item xs={6}>
                    <Typography>
                      {product.countInStock > 0 ? 'In stock' : 'Unavailable'}
                    </Typography>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Button
                  onClick={addtoCartHandler}
                  fullWidth
                  variant="contained"
                  color="primary"
                >
                  ADD to Cart
                </Button>
              </ListItem>
            </List>
          </Card>
        </Grid>
        {comments.length > 0 ? (
          comments.map((comment) => (
            <>
              <Grid item xs={12}>
                <p>{comment.name}</p>
                <p>{comment.comment}</p>
              </Grid>
            </>
          ))
        ) : (
          <p>No reviews yet</p>
        )}
        {userInfo ? (
          <>
            <Grid item xs={12}>
              <TextareaAutosize
                maxRows={10}
                minRows={5}
                aria-label="maximum height"
                placeholder="Write your review"
                style={{ width: 300 }}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></TextareaAutosize>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                onClick={commentPostHandler}
              >
                Post
              </Button>
            </Grid>
          </>
        ) : (
          <div>
            <p>Please login first to post your review</p>
          </div>
        )}
      </Grid>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;
  const { slug } = params;
  console.log(slug);
  await db.connect();
  const product = await Product.findOne({ slug }).lean();
  const comments = await Comment.find({ productId: product._id }).lean();
  // console.log(comments);
  db.disconnect();

  return {
    props: {
      product: db.convertDocToObj(product),
      comments: comments.map(db.convertDocToObj),
    },
  };
}
