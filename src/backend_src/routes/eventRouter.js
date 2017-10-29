var bodyParser = require ('body-parser');
var evt = require('../models/event_info.js');
var user = require('../models/user.js');
var evt_user = require('../models/event_expense.js');


module.exports = function loadEventRoutes(router){
	router.use(bodyParser.json());

	//create an event
	router.post('/event/createEvent', (req, res) => {
		var newEvent = new evt();
		newEvent.ownerID = req.body.ownerID;
		console.log("ownerID = " + newEvent.ownerID);
		newEvent.eventName = req.body.eventName;
		newEvent.eventType = req.body.eventType;
		newEvent.eventCategory = req.body.eventCategory;
		newEvent.eventLocation = req.body.eventLocation;
		newEvent.eventTime = req.body.eventTime;
		newEvent.splitType = req.body.splitType;
		newEvent.invitationList = req.body.invitationList;
		newEvent.eventStatus = 'in process';
		newEvent.totalAmount = 0;
		newEvent.memberAccount.push(req.body.ownerID);

		newEvent.save((error) => {
			if(error){
				console.log(error);
				res.status(500).send("Error: " + error);
				return;
			}
			res.json(newEvent);
			
		});

	});

	//an user creates an event, then the user becomes the event owner
	router.post('api/user/:userid/createEvent', (req, res) => {
		var newEvent = new evt();
		newEvent.ownerID = req.params.userid;
		console.log("ownerID = " + newEvent.ownerID);
		newEvent.eventName = req.body.eventName;
		newEvent.eventType = req.body.eventType;
		newEvent.eventCategory = req.body.eventCategory;
		newEvent.eventLocation = req.body.eventLocation;
		newEvent.eventTime = req.body.eventTime;
		newEvent.splitType = req.body.splitType;
		newEvent.invitationList = req.body.invitationList;
		newEvent.eventStatus = 'in process';
		newEvent.totalAmount = 0;
		newEvent.memberAccount.push(req.body.ownerID);

		newEvent.save((error) => {
			if(error){
				console.log(error);
				res.status(500).send("event save error");
				return;
			}
			res.json(200, newEvent);
			return;
		});
	});

	//edit detail of an existing event
	router.put('/editEvent/:eventID', (req, res) => {
		evt.findOne({'_id': req.params.eventID}, (error, evt) => {
			if(error){
				res.send('Error:' + error);
				return;
			}
			if(!evt){
				console.log('No such event found!');
				//res.json(null);
				res.status(404).send("No such event found!");
				return;
			}
			//check if user has authority to edit event
			if(req.body.userID != req.body.ownerID){
				res.send('you do not have the authority to edit this event');
				return;
			}
			evt.ownerID = req.body.ownerID;
			evt.eventName = req.body.eventName;
			evt.eventType = req.body.eventType;
			evt.eventCategory = req.body.eventCategory;
			evt.eventLocation = req.body.eventLocation;
			evt.eventTime = req.body.eventTime;
			evt.splitType = req.body.splitType;
			evt.invitationList = req.body.invitationList;
			//evt.eventStatus = req.body.eventStatus; //should not be allowed to edit event status
			evt.totalAmount = req.body.totalAmount;

			evt.save((error) => {
				if(error){
					console.log(error);
					//should return json of event before modification, need to be tested
					res.json(evt);
					return;
				}
				//return json of event after modification
				res.json(evt);
			});
		});
	})

	//delete an event from database
	router.post('/deleteEvent/:eventID', function(req, res){
		console.log(req.params.eventID);
		var toRemoved = evt.findOne({'_id':req.params.eventID}, (error, toRemoved) => {
			if(error){
				res.status(500).send('Error: ' + error);
				return;
			}
			if(!toRemoved){
				res.status(500).send('no such event found');
				return;
			}
			response = {
				message: "event successfully deleted",
				id: toRemoved._id
			};
			toRemoved.remove();
			res.status(200).send(response);
			return;
		});
	});


	//When a event is complete
	router.put('/completeEvent/:eventID', function(req, res){
		console.log("event id = " + req.params.eventID);
		evt.findOne({'_id':req.params.eventID},(error, evt) => {
			if(error){
				res.status(500).send('Find Error: '+ error);
				return;
			}
			evt.eventStatus = 'completed';
			evt.save((error) => {
				if(error){
					res.status.send('Save error: ' + error);
					console.log(error);
					return;
				}
				//return json of event after modification
				//res.json(evt);
				res.status(200).send("event " + req.params.eventID + " is complete!" );
				return;
			});

		});
	});


	//get the member list for a event
	router.get('/api/event/eventMember/:eventID', function(req, res){
		evt.findOne({'_id':req.params.eventID}, (error, evt) => {
			if(error){
				res.status(500).send('Error: ' + error);
				return;
			}
			res.json(evt.memberAccount);
			return;
		});
	});

	//get all event that a user owns
    router.get('/event/:userid', function(req, res){
        evt.find({'ownerID':req.params.userid}, (error, evt) => {
        	if(error){
        		res.status(500).end('Error: ' + error);
        		return;
        	}
        	res.json(200, evt);
        	return;
        });
    });


    //get one event by eventID
    router.get('/api/event/:eventID', function(req, res){
    	evt.findOne({'_id':req.params.eventID}, (error, evt) => {
    		if(error){
    			res.status(500).send('Error: ' + error);
    			return;
    		}
    		res.json(200, evt);
    		return;
    	});
    });
	//get all stored event
	router.get('/api/all_event', function(req, res){
		evt.find({'eventName': {$exists:true}}, function(err, data){
			if(err){
				console.log(err);
				return res.status(500).json({msg: 'internal server error'});
			}
			res.json(data);
		});
	});

	//add a user into an event
	router.put('/event/addMember/:eventID', function(req, res){
		var oldEvt = evt.findOne({'_id':req.params.eventID}, (error, oldEvt) => {
			if(error){
				res.status(500).send('Error: ' + error);
				return;
			}
			oldEvt.memberAccount.push(req.body.userID);
			oldEvt.save((error) => {
				if(error){
					console.log(error);
					//should return json of event before modification, need to be tested
					res.status(501).send('failed to add member');
					res.json(oldEvt);
					return;
				}
				//return json of event after modification
				res.json(oldEvt);
			});
		});
	});

	//owner update total amount of an event
	router.put('/event/updateTotal/:userID/:eventID', function(req, res){
		evt.findOne({'_id': req.params.eventID}, (error, evt) => {
			if(error){
				res.status(500).send("Update total error: " + error);
				return;
			}
			if(req.body.totalAmount === undefined || req.body.totalAmount === null || req.body.totalAmount <= 0){
				res.status(504).send('Error: invalid amount');
				return;
			}
			if(req.params.userID != evt.ownerID){
				res.status(501).send('Error: unauthorized');
				return;
			}
			evt.totalAmount = req.body.totalAmount;
			res.status(200).json(evt);
			return;

		});
	});

	/*check if total amount matches with sum of individual amount
	router.get('event/amountCheck/:eventID', function(req, res){
		evt.findOne({'_id': req.params.eventID}, (error, evt) => {
			if(error){
				res.status(500).send("findOne error: " + error);
				return;

			}
		})
	})*/

	//individual enters their own amount in an event
	router.post('/event/individualAmount/:eventID/:userID', function(req, res){
		var est = evt_user.findOne({'eventID':req.params.eventID, 'userID':req.params.userID}, (error, est) => {
			if(error){
				res.status(500).send("Error: " + error);
				return;
			}
			if(est != null){
				res.status(500).send("entry existed");
				return;
			}
		});
		evt.findOne({'_id': req.params.eventID, memberAccount: {"$in":[req.params.userID]}}, (error, evt) => {
			if(error){
				res.status(500).send("Error in findOne: " + error);
				return;
			}
			if(req.body.individualAmount === null || req.body.individualAmount <= 0 || req.body.individualAmount === undefined){
				res.status(500).send("invalid input amount");
				return;
			}
			var event_user = new evt_user();
			event_user.eventID = req.params.eventID;
			event_user.userID = req.params.userID;
			event_user.individualAmount = req.body.individualAmount;
			event_user.save((error) => {
				if(error){
					console.log("Error: " + error);
					res.status(500).send("Error: " + error);
					return;
				}
				res.status(200).json(event_user);
			});
		});
	});


}
