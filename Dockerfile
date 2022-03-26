FROM node:16-alpine

WORKDIR /usr/src/app

COPY package.json ./

ENV MONGODB_URI=mongodb+srv://Fahim:1310526968@cluster0.x2lkx.mongodb.net/next-amazona?retryWrites=true&w=majority
ENV JWT_SECRET=somethingsecret
ENV STRIPE_PRIVATE_KEY=sk_test_51KbJNXIz4lM6WZrx3ddP3fzJkjUBcBvSXBGRNK0niHmDJpmCLJlfvmk1lcoQW7feFXN8BaTbfV12x4tKtB7hoaQa00fj01pYOH


RUN npm install

COPY . .

RUN npm run build

CMD ["npm", "run","dev"]