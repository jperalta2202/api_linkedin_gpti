require("dotenv").config();
const express = require("express");
const { Client } = require("linkedin-private-api");
const app = express();

app.get("/", (req, res) => {
  res.status(200).send("Hello World").end();
});

app.get("/api", async (req, res) => {
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
    keywords: "Jose Ignacio Peralta",
  });

  const [{ profile: billGates }] = await peopleScroller.scrollNext();

  console.log(billGates.firstName, billGates.lastName);

  const [{ profile: billGates2 }] = await peopleScroller.scrollNext();

  console.log(billGates2.firstName, billGates2.lastName);

  const [{ profile: billGates3 }] = await peopleScroller.scrollNext();

  console.log(billGates3.firstName, billGates3.lastName);

  const [{ profile: billGates4 }] = await peopleScroller.scrollNext();

  console.log(billGates4.firstName, billGates4.lastName);

  // const sentMessage = await client.message.sendMessage({
  //   profileId: billGates.profileId,
  //   text: "mensaje enviado desde mi api",
  // });

  // await client.invitation.sendInvitation({
  //   profileId: billGates.profileId,
  //   trackingId: billGates.trackingId,
  // });

  res.status(200).send("ok").end();
});

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log("Press Ctrl+C to quit.");
});
