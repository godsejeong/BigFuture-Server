import { Router } from 'express';
import { Facebook, FacebookApiException } from 'fb';

import User from '../database/models/User';
import validator from '../tools/validator';

const router = Router();

router.get('/', async (req, res) => {

    const fb = new Facebook({ version: 'v2.4' });

    try {
        if (!req.accessToken) {
            throw new Error('ACCESS_TOKEN_NOT_EXIST');
        }
        fb.setAccessToken(req.accessToken);

        const me = await fb.api('/me');
        const friends = await fb.api('/me/friends?fields=name,id');
        friends.data.unshift(me);

        return res.status(200).send({
            status: { success: true, message: '성공!' },
            users: friends.data
        });

    } catch (err) {
        console.error(err.stack);
        return res.status(200).send({
            status: { success: false, message: err.message }
        });
    }
});

router.put('/', async (req, res) => {

    const fb = new Facebook({ version: 'v2.4' });

    try {
        if (!req.accessToken) {
            throw new Error('ACCESS_TOKEN_NOT_EXIST');
        }
        fb.setAccessToken(req.accessToken);

        const userData = validator.checkProperty(req.body, 'user', false);
        if (userData.message !== 'SUCCESS') {
            throw new Error(userData.message);
        }

        const fbUserData = await fb.api('/me');
        console.log(fbUserData);
        const updatedUser = await User.findOneAndUpdate({ userID: fbUserData.id }, userData.data, { new: true }).select('-__v').exec();

        return res.status(200).send({
            status: { success: true, message: '성공!' },
            user: updatedUser
        });
    } catch (err) {
        console.error(err.stack);
        return res.status(200).send({
            status: { success: false, message: err.message }
        });
    }
});

export default router;