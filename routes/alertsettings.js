var data = require('../data.json');

exports.view = function(req, res){
	data['viewNEW'] = true;
	data['viewOLD'] = false;
  res.render('alertsettings', data);
};

exports.viewOLD = function(req, res){
	data['viewNEW'] = false;
	data['viewOLD'] = true;
  res.render('alertsettings', data);
};