const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const app = express();

app.use(express.json());
app.use(cors());

const PORT = 1234;
app.listen(PORT, () => {
   console.log(`[API] Running on port '${PORT}'`);
});

app.post('/create-account', async (req, res) => {
   const { username, password } = req.body;

   const foundUser = await prisma.user.findUnique({
      where: { username },
   });

   if (foundUser)
      return res.send({
         error: `User with username '${username}' already exists.`,
      });

   await prisma.user.create({
      data: {
         username,
         password,
         role: 'USER',
      },
   });

   return res.send({
      sucess: 'The account has been created.',
   });
});
