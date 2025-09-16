import createRandomUser from "../services/user.service.js";

export default class UserController {

    getUsers(req, res) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const totalUsers = 500;
        const users = [];
        for (let i = 0; i < limit; i++) {
            users.push(createRandomUser());
        }
        res.json({
            page,
            limit,
            totalPages: Math.ceil(totalUsers / limit),
            totalUsers,
            users
        });
    }
}