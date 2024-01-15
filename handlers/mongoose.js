const config = require("../config/config.js");
const superDjs = require("super-djs")
const { MongoClient, ServerApiVersion} = require("mongodb")

module.exports = (client) => {
	/*console.log(superDjs.colourText('[DATABASE] Connecting to MongoDB...', 'yellow'));
	const mongo = process.env.MONGO || config.Handlers.MONGO;
	
	if (!mongo) {
		console.warn("[WARN] A Mongo URI/URL isn't provided! (Not required)");
	} else {
		superDjs.connectMongoDB(mongo, true, superDjs.colourText('[DATABASE] Connected to MongoDB!', 'green'));	
	};*/
	const db = new MongoClient(config.Handlers.MONGO, {
		serverApi: {
			version: ServerApiVersion.v1,
			strict: true,
			deprecationErrors: true,
		}
	});

	async function run() {
		try {
			console.log(superDjs.colourText('[DATABASE] Connecting to MongoDB...', 'yellow'));
			await db.connect();
			await db.db("admin").command({ ping: 1 });
			console.log(superDjs.colourText('[DATABASE] Connected to MongoDB!', 'green'))
		} finally {
			await db.close()
		}
	}
	run().catch(console.dir)
};
