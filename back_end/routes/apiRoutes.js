'use strict';

module.exports = function(app) {
	console.log("calling routing");
	var controller = require('../controller/fileController');
	var benefitController = require('../controller/benefitController');

	app.route('/v1/patients')
		.post(controller.addPatient);

	app.route('/v1/elig')
		.post(benefitController.getEligibility);

	app.route('/v1/patients/:name')
		.get(controller.getPatient);
};
