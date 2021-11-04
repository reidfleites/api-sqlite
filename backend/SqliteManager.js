import sqlite3 from 'sqlite3';
class SqliteManager {
	dbPathAndFileName;

	constructor(dbPathAndFileName) {
		this.dbPathAndFileName = dbPathAndFileName;
	}

	getRecordsWithSql(sql) {
		return new Promise((resolve, reject) => {
			const db = new sqlite3.Database(this.dbPathAndFileName);
			db.all(sql, function (err, records) {
				if (records === undefined) {
					reject(err);
				} else if (records.length === 0) {
					resolve([]);
				} else {
					resolve(records);
				}
			});
			db.close();
		});
	}
}

export default SqliteManager;
