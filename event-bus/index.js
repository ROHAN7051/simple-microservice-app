const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const app = express();
app.use(bodyParser.json());

const events = [];

app.post("/events", async (req, res) => {
  const event = req.body;

  events.push(event);

  try {
    await Promise.all([
      axios.post("http://localhost:4000/events", event),
      axios.post("http://localhost:4001/events", event),
      axios.post("http://localhost:4002/events", event),
      axios.post("http://localhost:4003/events", event),
    ]);
    res.status(200).send({ status: "OK" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error occurred while processing the event");
  }
});

app.get("/events", (req, res) => {
  res.send(events);
});

app.listen(4005, () => {
  console.log("Event bus listening on port 4005");
});
