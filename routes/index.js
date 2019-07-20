var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.post('/', function(req, res, next) {
  res.render('result', prepareData(req));
});

function prepareData(req){
	const firstRes = Number(req.body.first);
	const secondRes = Number(req.body.second);
	var actionRes = '';
	switch(req.body.action) {
	  case 'plus':
	  actionRes = '+';
	  resultRes = firstRes + secondRes;
	    break;
	  case 'minus':
	  actionRes = '-';
	  resultRes = firstRes - secondRes;
	    break;
	  case 'mul':
	  actionRes = '*';
	  resultRes = firstRes * secondRes;
	  	break;
	  case 'div':
	  actionRes = '/';
	  resultRes = firstRes / secondRes;
	  	break;
	  default:
	    // code block
	}

	return { first: firstRes,
  	action: actionRes,
  	second: secondRes,
  	result: resultRes
  	}
}

module.exports = router;

