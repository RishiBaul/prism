
import express from 'express';
import { Amplify } from 'aws-amplify';
import {signUp,signIn,signOut,fetchAuthSession } from 'aws-amplify/auth';
import bodyParser from 'body-parser';


const app = express();
const port = 3000;
app.use(bodyParser.json());



Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: 'us-east-1_FN20EA1Pd',
      userPoolClientId: '7dujkadmi9t6baq6gt4lk6a5k2',
      allowGuestAccess: true
    }
  }
});

const currentConfig = Amplify.getConfig();

app.post('/signup', async (req, res) => {
  const { username, password } = req.body;  
  // const reqdata={
  //   username,
  //   password,
  //   options: {
  //     userAttributes: {
  //       email,
  //       phone_number // E.164 number convention
  //     },
  //     // optional
  //     // or SignInOptions e.g { authFlowType: "USER_SRP_AUTH" }
  //   }}

  try{
  const data = await signUp({
    username,
    password,
    autoSignIn: true
  });
  res.status(201).send({message:"User Created",data})
}
catch(error){
  console.log(error)
  res.status(500).send({message:"Error Creating User!",error})
}
})
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  async function signInFunc({ username, password }) {
    console.log("IN SignIn:",username,password)
    try {
      const data = await signIn({ username, password });
      const { accessToken, idToken } = (await fetchAuthSession()).tokens ?? {};
    //   console.log("DATA HAI: ",isSignedIn)
    res.send({message:"Sign In Successfull ",accessToken:accessToken,idToken:idToken,otherData:data})
    } catch (error) {
      console.log('error signing in', error);
      if (error.name == "NotAuthorizedException")
      {
        res.status(500).send({"Error Signing In, Wrong Username/Password":error})
      }
      else
      res.status(500).send({"Error Signing In":error})
    }
  }
  const resp = signInFunc({username,password})

});

app.post('/logout', (req, res) => {
    const { username, password } = req.body;
async function handleSignOut() {
    console.log('Logout')
    try {
      const resp =await signOut();
      res.send(resp)
    } catch (error) {
      console.log('error signing out: ', error);
    }
  }
  handleSignOut();
})

app.listen(port, () => {
  console.log(`App running at http://localhost:${port}.`);
});