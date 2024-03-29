import { Request, Response, NextFunction, RequestHandler } from 'express';
import bcrypt from 'bcrypt';
import User from '../models/user.model';
import logging from '../lib/logging';

const NAMESPACE = 'Auth Controller';

export const register: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    if (!('username' in req.body)) return res.status(400).json({ message: 'Missing username' });
    if (!('password' in req.body)) return res.status(400).json({ message: 'Missing password' });

    const username = req.body.username;
    const password = req.body.password;

    const existingUser = await User.findOne({ username: username });
    if (existingUser) return res.status(409).json({ message: `Username '${username}' already exists` });

    const saltRounds = 10;
    bcrypt.hash(password, saltRounds, (err: Error | undefined, hash: string) => {
        if (err) {
            logging.error(NAMESPACE, 'Failed to hash password when registering new user', err);
            return res.status(500).json({ message: err });
        }

        new User({
            username: username,
            password: hash
        }).save();

        return res.status(201).json({ message: `Created new user '${username}'` });
    });
};

export const login: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    if (!('username' in req.body)) return res.status(400).json({ message: 'Missing username' });
    if (!('password' in req.body)) return res.status(400).json({ message: 'Missing password' });

    const username = req.body.username;
    const password = req.body.password;

    const userLogin = await User.findOne({ username: username });

    if (!userLogin) return res.status(401).json({ message: `User '${username}' does not exist` });

    // Checking if the hashed passwords match
    bcrypt.compare(password, userLogin.get('password'), (err: Error | undefined, same: boolean) => {
        if (err) {
            logging.error(NAMESPACE, 'Unable to authenticate password', err);
            return res.status(500).json({ message: err });
        }

        if (!same) return res.status(401).json({ message: 'Incorrect password' });

        // Saving the session
        req.session.username = username;
        return res.status(200).json({ message: `Successfully logged in as '${req.session.username}'` });
    });
};

export const logout: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
    req.session.destroy();
    return res.status(200).json({ message: 'Successfully logged out' });
};
