import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

import jwt from 'jsonwebtoken';


const User = mongoose.model('User');
const RefreshToken = mongoose.model('RefreshToken');

async function register(req, res) {
    const username = req.body.username;
    const password = req.body.password;

    if (!(username && password)) {
        return res.sendStatus(400);
    }

    const userAlreadyExists = await User.exists({ username: username});
    if (userAlreadyExists) {
        return res.json({'err': 'User ' + username + ' already exists'});
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({username: username, password: hashedPassword});
    user.save((err, user) => {
        if (err) {
            return res.send(err);
        }
        res.sendStatus(201);
    });
}

async function login(req, res) {
    const username = req.body.username;
    const password = req.body.password;

    if (!(username && password)) {
        return res.sendStatus(400);
    }

    const usernameExists = await User.exists({ username: username })
    if (!usernameExists) {
        return res.sendStatus(400);
    }

    const user = await User.findOne({username: username});

    await bcrypt.compare(password, user.password, (err, same) => {
        if (same) {
            const accessToken = generateAccessToken(user.username);
            const refreshToken = generateRefreshToken(user.username);
            RefreshToken.create({refreshToken: refreshToken}, (err, result) => {
                return res.status(200).json({accessToken: accessToken, refreshToken: refreshToken});
            });
            
        } else {
            return res.sendStatus(403);
        }
    });
}

function logout(req, res) {
    let token = req.body.refreshToken;
    if (!token) return res.sendStatus(403);

    RefreshToken.remove({refreshToken: token}, (err) => {
        if (err) {
            return res.sendStatus(401);
        }
        return res.sendStatus(200);
    });
}


function generateAccessToken(username) {
    let token = jwt.sign({username: username}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "30m"});
    return token;
}


function generateRefreshToken(username) {
    let token = jwt.sign({username: username}, process.env.REFRESH_TOKEN_SECRET, {expiresIn: "14d"});
    return token;
}

function refreshAccessToken(req, res) {
    let token = req.body.refreshToken;
    if (!token) return res.sendStatus(403);

    RefreshToken.findOne({refreshToken: token}, (err, result) => {
        if (!result || err) return res.sendStatus(403);
    
        jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
            if (err) return res.sendStatus(401);

            const accessToken = generateAccessToken(user.username);
            return res.status(200).json({accessToken: accessToken});
        });
    });

}

export { register, login, logout, refreshAccessToken }