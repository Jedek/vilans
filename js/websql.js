var WebSqlStore = function(successCallback, errorCallback) {

    this.initializeDatabase = function(successCallback, errorCallback) {
        var self = this;
        this.db = window.openDatabase("ZorgDB", "1.0", "Vilans Demo DB", 200000);
        this.db.transaction(
                function(tx) {
                    self.createTable(tx);
                    self.addSampleData(tx);
                },
                function(error) {
                    console.log('Transaction error: ' + error);
                    if (errorCallback) errorCallback();
                },
                function() {
                    console.log('Transaction success');
                    if (successCallback) successCallback();
                }
        );
    };

    this.createTable = function(tx) {
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
    };

    this.addSampleData = function(tx, employees) {
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
    };
    
    this.findVraagByName = function(vraag, callback) {
        this.db.transaction(
            function(tx) {

				tx.executeSql('SELECT * FROM ondervoeding WHERE vraag = \'' + vraag + '\'', [], function (tx, results) {
				  callback(results.rows.item(0));
				});
            }
        );
    };

    this.initializeDatabase(successCallback, errorCallback);

};
