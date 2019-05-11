const express = require('express');
const router = express.Router();

const Questions = require('../models/questions');

router.post('/new',(req,res)=>{
	let data = new Questions(req.body);
	Questions.find({}).count()
	.then(
		count=>{
			data.Serial = count;
			return data; 
		},
		error=>{
			res.json("Error in counting").status(404);
		}
	)
	.then(
		data=>{
			return data.save();
		},
		error=>{
			res.json("Error count").status(404);
		}
	).then(
		res=>{
			res.json("Successfully added").status(200);
		},
		err=>{
			if(error.code === 11000){
				res.json("Questions should be unique").status(400);
			} else{
				res.json("Error occured").status(400);
			}
		}
	)
	.catch(err=>{
		res.send(err).status(404);
	})
});

router.get('/all',(req,res)=>{
	Questions.find({})
	.then((questions)=>{
		res.json(questions).status(200);
	})
	.catch( error=>{
		res.json(error).status(404);
		}
	);
})

router.put('/edit',(req,res)=>{
	Questions.findOneAndUpdate({Serial:req.body.qid},req.body)
	.then(
		success=>{res.json("Successfully updated").status(200)},
		error=>{res.json(error).status(404)}
	)
});

router.get('/getquestion',(req,res)=>{
	Questions.find({Serial:req.query.id})
	.then(
		(data)=>{
			res.json(data).status(200);
		}
	)
	.catch((err)=>{
		res.json(err);
	})
});

router.get('/next',(req,res)=>{
	let serial = req.query.serial;
	if(!serial){
		serial = 1;
	}
	Questions.find({})
	.estimatedDocumentCount()
	.then( count =>{
			return count;
		}
	)
	.then(count=>{
		let random = Math.floor((Math.random() * count));
		while(random === serial){
			random = Math.floor((Math.random() * count));
		}
		return random;
	})
	.then((val)=>{
			// console.log(val,"<><><><>")
			Questions.find({Serial:val})
			.then(
				que=>{
					res.json(que).status(200);
				},err=>{
					res.json(err).status(404);
				}
			)
		}
	)
	.catch(err=>{
		res.json(err).status(404);
	})
});

module.exports = router;