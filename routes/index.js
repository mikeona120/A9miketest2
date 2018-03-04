var data = require('../data.json');

exports.view = function(req, res){
  
  	var newUser = 
		{
			name: req.query.name
		};
	data.users.push(newUser);
  data['viewNEW'] = true;
  data['viewOLD'] = false;
  console.log(newUser);
  res.render('index',data);
  console.log(data.users);

};

exports.viewOLD = function(req, res){
  
  	var newUser = 
		{
			name: req.query.name
		};
	data.users.push(newUser);
  data['viewNEW'] = false;
 	data['viewOLD'] = true;
  console.log(newUser);
  res.render('index',data);
  console.log(data.users);

};