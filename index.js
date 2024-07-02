const { CosmosClient } = require("@azure/cosmos");

const endpoint = process.env.COSMOS_DB_ENDPOINT;
const key = process.env.COSMOS_DB_KEY;
const databaseId = "DebtCollectionDB";
const containerId = "DebtItems";

const client = new CosmosClient({ endpoint, key });

module.exports = async function (context, req) {
    try {
        const { database } = await client.databases.createIfNotExists({ id: databaseId });
        const { container } = await database.containers.createIfNotExists({ id: containerId });

        if (req.method === "POST") {
            const { id, description, amount } = req.body;
            const { resource: createdItem } = await container.items.create({ id, description, amount });
            context.res = {
                status: 201,
                body: createdItem
            };
        } else if (req.method === "GET") {
            const { resources: items } = await container.items.readAll().fetchAll();
            context.res = {
                status: 200,
                body: items
            };
        } else {
            context.res = {
                status: 405,
                body: "Method not allowed"
            };
        }
    } catch (error) {
        context.res = {
            status: 500,
            body: `Error: ${error.message}`
        };
    }
};
