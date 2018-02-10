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
        const fbUserData = await fb.api('/me?fields=education,name,id');
        const userData = await User.findOne({ userID: fbUserData.id }).select('-__v').exec();

        if (userData && userData.graduationDate) {
            return res.status(200).send({
                status: { success: true, message: '로그인 성공!' },
                user: userData,
                exist: true
            });
        } else {
            if (!userData) {
                await User.create({
                    userID: fbUserData.id,
                    userName: fbUserData.name,
                    schoolID: fbUserData.education[fbUserData.education.length - 1].school.id,
                    schoolName: fbUserData.education[fbUserData.education.length - 1].school.name,
                });
            }
            return res.status(200).send({
                status: { success: true, message: '졸업날짜를 입력해주세요.' },
                user: userData,
                exist: false
            });
        }

    } catch (err) {
        console.error(err.stack);
        return res.status(200).send({
            status: { success: false, message: err.message }
        });
    }
});

export default router;