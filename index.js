require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const { Client } = require("linkedin-private-api");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(200).send("Hello World").end();
});

app.post("/api", async (req, res) => {

  const client = new Client();

  try {
    await client.login.userPass({
      username: "gpti.grupo11@gmail.com",
      password: "G1p1ti@@@",
    });
  } catch (e) {
    console.log(e);
  }

  //Search for profiles and send an invitation
  const peopleScroller = await client.search.searchPeople({
    keywords: req.body.person,
  });

  const [{ profile: person1 }] = await peopleScroller.scrollNext();

  const [{ profile: person2 }] = await peopleScroller.scrollNext();

  const [{ profile: person3 }] = await peopleScroller.scrollNext();

  const [{ profile: person4 }] = await peopleScroller.scrollNext();

  res.json({person1, person2, person3, person4});

  res.status(200).send().end();
});

app.post("/message", async (req, res) => {
  const client = new Client();

  try {
    await client.login.userPass({
      username: "gpti.grupo11@gmail.com",
      password: "G1p1ti@@@",
    });
  } catch (e) {
    console.log(e);
  }

  const { profileId, text } = req.body;

  await client.message.sendMessage({
    profileId: profileId,
    text: text,
  });

  res.status(200).send("ok").end();
});

app.post("/invitation", async (req, res) => {
  const client = new Client();

  try {
    await client.login.userPass({
      username: "gpti.grupo11@gmail.com",
      password: "G1p1ti@@@",
    });
  } catch (e) {
    console.log(e);
  }

  const { profileId, trackingId } = req.body;

  await client.invitation.sendInvitation({
    profileId: profileId,
    trackingId: trackingId,
  });

  res.status(200).send("ok").end();
});

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log("Press Ctrl+C to quit.");
});
