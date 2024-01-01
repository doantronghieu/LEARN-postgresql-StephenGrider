const { randomBytes } = require("crypto");
const format = require("pg-format");
const { default: migrate } = require("node-pg-migrate");
const pool = require("../pool");

const DEFAULT_OPTS = {
	host: "localhost",
	port: 5432,
	database: "socialnetwork-test",
	user: "postgres",
	password: "123456",
};

class Context {
	static async build() {
		// Randomly generating a role name to connect to PG as
		const roleName = "a" + randomBytes(4).toString("hex");

		await pool.connect(DEFAULT_OPTS);

		await pool.query(
			format(`CREATE ROLE %I WITH LOGIN PASSWORD %L`, roleName, roleName)
		);
		await pool.query(
			format(`CREATE SCHEMA $I AUTHORIZATION $I`, roleName, roleName)
		);
		await pool.close();

		// Run migration in the new schema
		await migrate({
			schema: roleName,
			direction: "up",
			log: () => {},
			noLock: true,
			dir: "migrations",
			databaseUrl: {
				host: "localhost",
				port: 5432,
				database: "socialnetwork-test",
				user: roleName,
				password: roleName,
			},
		});

		// Connect to PG as the newly created role
		await pool.connect({
			host: "localhost",
			port: 5432,
			database: "socialnetwork-test",
			user: roleName,
			password: roleName,
		});

		return new Context(roleName);
	}

	constructor(roleName) {
		this.roleName = roleName;
	}

  async reset() {
    return pool.query(`
      DELETE FROM users;
    `)
  }

	async close() {
		// Disconnect from PG
		await pool.close();

		// Reconnect as root
		await pool.connect(DEFAULT_OPTS);

		// Delete the role & schema created
		await pool.query(format("DROP SCHEMA %I CASCADE;", this.roleName));
		await pool.query(format("DROP ROLE %I;", this.roleName));

		// Disconnect
		await pool.close();
	}
}

module.exports = Context;
