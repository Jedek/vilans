var db = window.openDatabase("ZorgDB", "1.0", "Vilans DB", 1000000);

function createTable(tx) {
	 tx.executeSql('DROP TABLE IF EXISTS ondervoeding');
	    var sql = "CREATE TABLE IF NOT EXISTS ondervoeding ( " +
	        "id INTEGER PRIMARY KEY AUTOINCREMENT, " +
	        "vraag VARCHAR(50), " +
	        "antwoord INTEGER )";
	    tx.executeSql(sql, null,
	            function() {
	                console.log('Create table success');
	            },
	            function(tx, error) {
	                alert('Create table error: ' + error.message);
	            });
	            
	                    var vragen = [
	            {"vraag": "afvallen", "antwoord": 1},
	            {"vraag": "losser", "antwoord": 0},
	            {"vraag": "eetlust", "antwoord": 1},
	            {"vraag": "hulp", "antwoord": 0}
	        ];
	        
	var l = vragen.length;
	var sql = "INSERT OR REPLACE INTO ondervoeding " +
	    "(vraag, antwoord) " +
	    "VALUES (?, ?)";
	var e;
	for (var i = 0; i < l; i++) {
	    e = vragen[i];
	    tx.executeSql(sql, [e.vraag, e.antwoord],
	            function() {
	                console.log('INSERT success');
	            },
	            function(tx, error) {
	                alert('INSERT error: ' + error.message);
	            });
	}
}

function findVraag(vraag, callback) {
	this.db.transaction(function(tx) {
	    tx.executeSql("SELECT * FROM ondervoeding WHERE vraag = '"+vraag+"'", [], function(tx, results) {
	        callback(results.rows.length === 1 ? results.rows.item(0) : null);
	    });
	},
	function(error) {
	    alert("Transaction Error: " + error.message);
	    }
	);
}
