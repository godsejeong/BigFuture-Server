import { Router } from 'express';
import { Facebook, FacebookApiException } from 'fb';

import User from '../database/models/User';
import Capsule from '../database/models/Capsule';
import validator from '../tools/validator';

const router = Router();

router.post('/', async (req, res) => {
    const fb = new Facebook({ version: 'v2.4' });

    try {
        if (!req.accessToken) {
            throw new Error('ACCESS_TOKEN_NOT_EXIST');
        }
        fb.setAccessToken(req.accessToken);

        const data = validator.checkProperty(req.body, 'capsule', true);
        if (data.message !== 'SUCCESS') {
            throw new Error(data.message);
        }
        const senderData = await fb.api('/' + data.data.senderID);
        const receiverData = await fb.api('/' + data.data.receiverID);

        data.data.senderName = senderData.name;
        data.data.receiverName = receiverData.name;

        await Capsule.create(data.data);

        return res.status(200).send({
            status: { success: true, message: '성공!' }
        });

    } catch (err) {
        console.error(err.stack);
        return res.status(200).send({
            status: { success: false, message: err.message }
        });
    }
});

router.get('/', async (req, res) => {
    const fb = new Facebook({ version: 'v2.4' });
    try {
        if (!req.accessToken) {
            throw new Error('ACCESS_TOKEN_NOT_EXIST');
        }
        fb.setAccessToken(req.accessToken);

        const fbUserData = await fb.api('/me');
        const user = await User.findOne({ userID: fbUserData.id }).select('-__v').exec();
        if (!user.graduationDate) {
            throw new Error('졸업날짜를 입력해주세요!');
        }
        if ((Date.now() - user.graduationDate) < 0) {
            throw new Error('아직 졸업하지 않았자나요!');
        }
        const capsules = await Capsule.find({ $and: [{ $or: [{ senderID: user.userID }, { receiverID: user.userID }] }, { tag: req.query.tag || /.+/ }] }).select('-__v').sort({ createdDate: 1 }).exec();
        return res.status(200).send({
            status: { success: true, message: '성공!' },
            capsules: capsules
        });
    } catch (err) {
        console.error(err.stack);
        return res.status(200).send({
            status: { success: false, message: err.message }
        });
    }
})

export default router;