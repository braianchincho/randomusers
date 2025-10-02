import randomUserService from "../services/user.service.js";

export default class UserController {
    constructor() {
        this.service = randomUserService;
    }
    getUsers(req, res) {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const gender = req.query.gender;
        const minAge = parseInt(req.query.minAge) || 17;
        const maxAge = parseInt(req.query.maxAge) || 49;
        const totalUsers = 500;
        const totalPages = Math.ceil(totalUsers / limit)
        let users = [];
        if (page >= 1 && page <= totalPages) {
            users = this.service.getUsers({ limit, gender, minAge, maxAge });
        }
        
        res.json({
            page,
            limit,
            totalPages,
            totalUsers,
            users
        });
    }
}