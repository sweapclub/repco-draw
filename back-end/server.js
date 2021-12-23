const express = require("express");
const app = express();
const path = require("path");
const port = process.env.PORT || 3000;
var cors = require("cors");

app.use(express.json()); //Used to parse JSON bodies
app.use(express.urlencoded({ extended: true }));

// var allowlist = ['http://localhost:8080', 'http://example2.com']
// var corsOptionsDelegate = function (req, callback) {
//   var corsOptions;
//   if (allowlist.indexOf(req.header('Origin')) !== -1) {
//     corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
//   } else {
//     corsOptions = { origin: false } // disable CORS for this request
//   }
//   callback(null, corsOptions) // callback expects two parameters: error and options
// }
// app.options('*', cors(corsOptionsDelegate)) // include before other routes
if (process.env.NODE_ENV !== "production") {
  app.use(cors());
}

var knex = require("knex")({
  client: "mssql",
  connection: {
    server: "repco-db-pas.database.windows.net",
    user: "sysadmin",
    password: "Pa$$w0rd@7791",
    options: {
      port: 1433,
      database: "repco-pas-hr",
      encrypt: true, // mandatory for microsoft azure sql server
    },
  },
});

app.get("/api/employee/", async (req, res) => {
  res.send(
    await knex.select().table("repco_employee").where("isActive", false)
  );
});

app.post("/api/employee", (req, res) => {
  // res.send(req.body);
  knex("repco_employee")
    .where("employeeId", req.body.id)
    .update({
      isActive: true,
    })
    .then(() => {
      res.send("success ?");
    })
    .catch(() => {
      res.send("error !");
    });
});

app.get("/api/lucky", async (req, res) => {
  res.send(
    await knex
      .select()
      .table("repco_employee")
      .where("isActive", true)
      .orderBy("employeeName", "asc")
  );
});

app.get("/api/reset", (req, res) => {
  knex("repco_employee")
    .update({
      isActive: false,
    })
    .then(() => {
      res.send("Reset success !!");
    })
    .catch(() => {
      res.send("error !");
    });
});

app.use(express.static(path.join(__dirname, "dist")));

// // Handle React routing, return all requests to React app
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
