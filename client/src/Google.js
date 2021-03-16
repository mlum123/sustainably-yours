// Google module using OAuth2.0 authentication
// send emails using Gmail API

const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;
const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
const DISCOVERY_DOCS = [
  "https://gmail.googleapis.com/$discovery/rest?version=v1",
];
const SCOPES = "https://www.googleapis.com/auth/gmail.modify";

let gapi = window.gapi;

const Google = {
  signedIn: false,

  // Sign in the user upon button click.
  handleAuthClick() {
    gapi.auth2.getAuthInstance().signIn();
  },

  // Sign out the user upon button click.
  handleSignoutClick() {
    gapi.auth2.getAuthInstance().signOut();
  },

  // On load, called to load the auth2 library and API client library.
  handleClientLoad() {
    gapi.load("client:auth2", this.initClient);
  },

  initClient() {
    gapi.client
      .init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES,
      })
      .then(function () {
        // Listen for sign-in state changes.

        gapi.auth2
          .getAuthInstance()
          .isSignedIn.listen(Google.updateSigninStatus);

        // Handle the initial sign-in state.
        Google.updateSigninStatus(
          gapi.auth2.getAuthInstance().isSignedIn.get()
        );
      });
  },

  // Called when the signed in status changes, to update the UI appropriately.
  // After a sign-in, the API is called.
  updateSigninStatus(isSignedIn) {
    if (isSignedIn) {
      Google.signedIn = true;
    } else {
      Google.signedIn = false;
    }
  },

  // Helper function to make email body for sending new email
  makeBody(from, to, subject, message) {
    let str = [
      'Content-Type: text/plain; charset="UTF-8"\n',
      "MIME-Version: 1.0\n",
      "Content-Transfer-Encoding: 7bit\n",
      "to: ",
      to,
      "\n",
      "from: ",
      from,
      "\n",
      "subject: ",
      subject,
      "\n\n",
      message,
    ].join("");

    let encodedMail = new Buffer(str)
      .toString("base64")
      .replace(/\+/g, "-")
      .replace(/\//g, "_");

    return encodedMail;
  },

  // TODO: this doesn't work - get "from" email from logged-in user's profile
  // actually somehow it does send it from the correct person when you log in as that person?
  getUserEmail() {
    return gapi.client.gmail.users
      .getProfile({
        userId: "me",
      })
      .then((res) => {
        console.log(res.result.emailAddress);
        return res.result.emailAddress;
      });
  },

  // Use Gmail API to send an email
  sendEmail(to, subject, message) {
    // TODO: get "from" email from logged-in user's profile
    // actually somehow it does send it from the correct person (instead of mlumtest) when you log in as that person?
    let from = "mlumtest@gmail.com";

    let raw = Google.makeBody(from, to, subject, message);

    gapi.client.gmail.users.messages
      .send({
        userId: "me",
        resource: {
          raw: raw,
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  },
};

export default Google;
