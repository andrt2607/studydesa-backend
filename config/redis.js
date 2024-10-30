const redis = require("redis");
const client = redis.createClient({
  url: "redis://127.0.0.1:6379",
});

client.on("connect", (err) => {
  if (err) {
    console.log("[redis] connect fail");
  }
  console.log("[redis] connect success");
});

client.on("end", () => {
  console.log("[redis] connection disconnected");
});

client.on("error", (err) => {
  console.log("[redis] connection error");
});

module.exports = {
  client,
};
