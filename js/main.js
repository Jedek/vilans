var app = {
	
	findVraagByName: function(vraag) {
        this.store.findVraagByName(vraag, function(vraag) {
            return vraag;
        });
    },


    initialize: function() {
        this.store = new WebSqlStore();
    }

};

app.initialize();