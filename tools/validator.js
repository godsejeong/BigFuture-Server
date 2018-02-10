export const CHECK_LIST = {
    capsule: [
        { property: 'receiverID', reg: /.+/, message: 'RECEIVER_ID_NOT_EXIST' },
        { property: 'senderID', reg: /.+/, message: 'SENDER_ID_NOT_EXIST' },
        { property: 'content', reg: /.+/, message: 'CONTENT_NOT_EXIST' },
        { property: 'tag', reg: /.+/, message: 'TAG_NOT_EXIST' }
    ],
    user: [
        { property: 'graduationDate', reg: /^([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))$/, message: 'INVALID_DATE' }
    ]
};

export default {
    checkProperty(data, service, strict) {
        let result = {};
        for (const item of CHECK_LIST[service]) {
            if (data[item.property] && item.reg.exec(data[item.property])) {
                result[item.property] = data[item.property];
            } else {
                if (!strict && !data[item.property]) continue;
                return { message: item.message, data: null };
            }
        }
        return { message: 'SUCCESS', data: result };
    }
};
