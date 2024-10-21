module.exports = (fastify) => {
	fastify.addHook("preHandler", async (req, res) => {
		if (req.url != "/login" && req.url != "/upload") {
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
};
