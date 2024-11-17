const axios = require('axios');

module.exports = (fastify) => {
	fastify.addHook("preHandler", async (req, res) => {
		if (req.url != "/api/login" && req.url != "/api/customer/submit") {
			await req.jwtVerify()
				.then((data) => {
					req.userData = data;
					console.log("this is your userData: ",req.userData,"!!!!!!!!!!")
				})
				.catch(() => {
					return res.code(401).send({ message: "Unauthorized" });
				});
		}
	});

	fastify.addHook("preValidation", async (req, res) => {
		if (req.url === "/api/login" || req.url === "/api/customer/submit") {
			const {'arcaptcha-token':captcha_token} = req.body
			const captcha_api = process.env.CAPTCHA_API;
			try {
				const result = await axios.post(captcha_api, {
					challenge_id: captcha_token,
					site_key: process.env.SITE_KEY,
					secret_key: process.env.SECRET_KEY,
				})
				if(result.data.success){
					console.log('captcha Solved Correctly')
				}
				else{
					return res.code(401).send({ message: "Verify you are a Human!" });
				}
			} catch (error) {
				return res.send(error)
			}
		}
	});
};
