var HomeView = function(store) {

    this.initialize = function() {
		console.log('HomeView.js::initialze() start'); 
        // Define a div wrapper for the view. The div wrapper is used to attach events. der indsættes faktisk tom <div></div> element inde i body delen, this=HomwView objektet
        this.el = $('<div/>');
        this.el.on('keyup', '.search-key', this.findByName);
    };

    this.render = function() {
        this.el.html(HomeView.template());  
		// her injektes html-kode(genereret vha templaten i ovennævnte defineret tomme <div></div> element, result=html-string=<div>template_genereret_kode</div>
        return this;
    };

    this.findByName = function() {
        store.findByName($('.search-key').val(), function(employees) {
			console.log('HomeView.js::store.findByName()');
            $('.employee-list').html(HomeView.liTemplate(employees));
        });
    };

    this.initialize();

}

HomeView.template = Handlebars.compile($("#home-tpl").html());           // Detail-view-templaten
HomeView.liTemplate = Handlebars.compile($("#employee-li-tpl").html());