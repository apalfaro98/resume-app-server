import jwt from 'jsonwebtoken';

const generateJWT = (id: string) => {
	const payload = { id };

	return jwt.sign(payload, process.env.JWT_SECRET_KEY || '', {
		expiresIn: '2h',
	});
};

export default generateJWT;