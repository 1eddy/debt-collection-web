
const { CosmosClient } = require("@azure/cosmos");

const endpoint = process.env.COSMOS_DB_ENDPOINT;
const key = process.env.COSMOS_DB_KEY;
const databaseId = "DebtCollectionDB";
const containerId = "DebtItems";
const client = new CosmosClient({ endpoint, key });

module.exports = async function (context, req) {
  context.log('JavaScript HTTP trigger function processed a request.');

  if (req.method === "GET") {
    const { resources: items } = await client
      .database(databaseId)
      .container(containerId)
      .items.query("SELECT * from c")
      .fetchAll();

    context.res = {
      status: 200,
      body: items
    };
  } else if (req.method === "POST") {
    const { id, description, amount } = req.body;
    const { resource: createdItem } = await client
      .database(databaseId)
      .container(containerId)
      .items.create({ id, description, amount });

    context.res = {
      status: 201,
      body: createdItem
    };
  } else {
    context.res = {
      status: 405,
      body: "Method Not Allowed"
    };
  }
};
