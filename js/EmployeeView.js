var EmployeeView = function(employee) {
	var employee=employee;
    this.initialize = function() {
        this.el = $('<div/>');
		console.log('EmployeeView::initialize, this.el:'+this.el);
		print(employee,0);
        this.el.on('click', '.add-location-btn', this.addLocation);
		this.el.on('click', '.add-contact-btn', this.addToContacts);
		this.el.on('click', '.change-pic-btn', this.changePicture);
 
    };

    this.render = function() {
        this.el.html(EmployeeView.template(employee));
        return this;
    };

    this.addLocation = function(event) {
        event.preventDefault();
        console.log('addLocation');
        navigator.geolocation.getCurrentPosition(
            function(position) {
                $('.location', this.el).html(position.coords.latitude + ',' +position.coords.longitude);
            },
            function() {
                alert('Error getting location');
            });
        return false;
    };

	this.addToContacts = function(event) {
        event.preventDefault();
        console.log('addToContacts');
		var contact=new Object();
		print(employee,0);
        if (!navigator.contacts) {
            app.showAlert("Contacts API not supported", "Error");
            return;
			
        }
		else 
			contact = navigator.contacts.create();
        contact.name = {givenName: employee.firstName, familyName:  employee.lastName};
        var phoneNumbers = [];
		print(contact,0);
        phoneNumbers[0] = new ContactField('work', employee.officePhone, false);   // kræver navigator.contacts findes
        phoneNumbers[1] = new ContactField('mobile', employee.cellPhone, true); // preferred number
        contact.phoneNumbers = phoneNumbers;
		console.log('contact:'+contact);
		contact.save();
        return false;
    };

	 this.changePicture = function(event) {
        event.preventDefault();
        console.log('changePicture');
        if (!navigator.camera) {
            app.showAlert("Camera API not supported", "Error");
            return;
        }
        var options =   {   quality: 50,
                            destinationType: Camera.DestinationType.DATA_URL,
                            sourceType: 1,      // 0:Photo Library, 1=Camera, 2=Saved Photo Album
                            encodingType: 0     // 0=JPG 1=PNG
                        };
		// fabrikér billede med options, med success og fejl callback funktioner
        navigator.camera.getPicture(
            function(imageData) {
                $('#image').attr('src', "data:image/jpeg;base64," + imageData);
				// tilføjer class-element employee-image med billede til dette div-element, Detail-viewet
            },
            function() {
                alert('Error taking picture');
            },
            options);

        return false;
    };


    this.initialize();

}

EmployeeView.template = Handlebars.compile($("#employee-tpl").html());  
// et aktivt html-element, fct af employee: employee obj injektes i template, som det ses i kaldet  this.el.html(EmployeeView.template(employee));