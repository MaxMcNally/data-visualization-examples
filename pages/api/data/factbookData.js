const url = "https://raw.githubusercontent.com/iancoleman/cia_world_factbook_api/309f64684974bb82ed17337775c85e07b2dd6f51/data/2017-07-03_factbook.json"
import Cors from 'cors'
// Initializing the cors middleware
const cors = Cors({
	methods: ['GET', 'HEAD'],
  })

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(req, res, fn) {
	return new Promise((resolve, reject) => {
	  fn(req, res, (result) => {
		if (result instanceof Error) {
		  return reject(result)
		}
  
		return resolve(result)
	  })
	})
}

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import fetch from "cross-fetch"
export default async (req, res) => {
	await runMiddleware(req, res, cors)
	console.log("Fetching Data")
	const response = await fetch(url)
	console.log(response.body)
	res.statusCode = 200
	res.setHeader('Content-Type', 'application/json')
	res.json(response.body)
  }