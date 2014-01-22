var db;

function populateDB(tx) {
	tableExists("vragen", function(data){
		if(data == false) {
			db.transaction(function(tx){
				tx.executeSql('CREATE TABLE IF NOT EXISTS vragen (id INTEGER PRIMARY KEY AUTOINCREMENT, vraag VARCHAR(50), antwoord INTEGER)');
				tx.executeSql('INSERT OR REPLACE INTO vragen (vraag, antwoord) VALUES ("afvallen", 0)');
				tx.executeSql('INSERT OR REPLACE INTO vragen (vraag, antwoord) VALUES ("losser", 0)');
				tx.executeSql('INSERT OR REPLACE INTO vragen (vraag, antwoord) VALUES ("eetlust", 0)');
				tx.executeSql('INSERT OR REPLACE INTO vragen (vraag, antwoord) VALUES ("hulp", 0)');
				tx.executeSql('INSERT OR REPLACE INTO vragen (vraag, antwoord) VALUES ("verdrietig", 0)');
				tx.executeSql('INSERT OR REPLACE INTO vragen (vraag, antwoord) VALUES ("boos", 0)');
				tx.executeSql('INSERT OR REPLACE INTO vragen (vraag, antwoord) VALUES ("interesse", 0)');
			});
		}
	});
}

function tableExists(table, callback) {
	console.log("checking table availability in DB");
	db.transaction(function(tx){
		tx.executeSql("SELECT name FROM sqlite_master WHERE type='table' AND name='"+table+"';",null, function(tx, results){
			callback(results.rows.length === 1 ? true : false);
		});
	});
}

// Wait for PhoneGap to load
//
document.addEventListener("deviceready", onDeviceReady, false);

// PhoneGap is ready
//
function onDeviceReady() {
	connect();
	db.transaction(populateDB);
}

function connect() {
	db = window.openDatabase("VilansDB", "1.0", "Zorg voor Beter DB", 200000);
}

function addVraag(vraag) {
	db.transaction(function(tx){tx.executeSql('INSERT OR REPLACE INTO vragen (vraag, antwoord) VALUES ("'+vraag+'", 0)');});
}

function findVraag(vraag, callback) {
	
	var sql = "SELECT * FROM vragen WHERE vraag = '"+vraag+"'";	

	db.transaction(function(tx) {
		    tx.executeSql(sql, [], function(tx, results) {
		        callback(results.rows.length === 1 ? results.rows.item(0) : null);
		    });
		},
		function(error) {
		    alert("Transaction Error: " + error.message);
		    }
		);
}

function updateVraag(vraag, antwoord) {
	this.db.transaction(function(tx) {
	    tx.executeSql("UPDATE vragen SET antwoord = "+antwoord+" WHERE vraag = '"+vraag+"'");
	},
	function(error) {
	    alert("Transaction Error: " + error.message);
	    }
	);
}
