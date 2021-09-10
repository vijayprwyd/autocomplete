import express from "express";
import Fuse from "fuse.js";
import cors from "cors";

import { countries } from "./countries";

const app = express();
app.use(cors());
const port = 3001;

const options = {
  includeScore: true,
  keys: ["name"],
};

const fuse = new Fuse(countries, options);

app.get("/", (req, res) => {
  // `q` query param
  const rawQuery = req.query.q;
  const query = typeof rawQuery === "string" ? rawQuery : null;

  // `pageSize` query param
  const rawPageSize = parseInt(req.query.pageSize?.toString() || "");
  const pageSize = Number.isFinite(rawPageSize) ? rawPageSize : 10;

  // `page` query param
  const rawPage = parseInt(req.query.page?.toString() || "");
  const page = Number.isFinite(rawPage) ? rawPage : 1;

  // `latency` query param
  const rawLatency = parseInt(req.query.latency?.toString() || "");
  const latency = Number.isFinite(rawLatency) ? rawLatency : 0;

  if (page < 1) {
    res.status(422);
    return res.json({ error: "`page` must be greater than 0" });
  }

  if (pageSize < 1) {
    res.status(422);
    return res.json({ error: "`pageSize` must be greater than 0" });
  }

  function getPage<T>(arr: T[]) {
    return arr.slice((page - 1) * pageSize, pageSize * page);
  }

  // Monkey testing
  if (typeof req.query.monkey === "string" && Math.random() > 0.5) {
    res.status(500);
    return res.json({ error: "oh no! 😆" });
  }

  if (typeof query === "string") {
    const result = fuse.search(query);
    setTimeout(() => {
      res.status(200);
      res.json({ data: getPage(result.map(i => i.item)) });
    }, latency);
  } else {
    res.status(200);
    res.json({ data: getPage(countries) });
  }
});

app.listen(port, () => {
  console.log(`Dummy server is listening at http://localhost:${port}`);
});
