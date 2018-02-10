import { Router } from 'express';
import { Facebook, FacebookApiException } from 'fb';

import User from '../database/models/User';
import Capsule from '../database/models/Capsule';

const router = Router();

router.post('/', async (req, res) => {
    try {

    } catch (err) {
        console.error(err.stack);
        return res.status(200).send({
            status: { success: false, message: err.message }
        });
    }
});

export default router;