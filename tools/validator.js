export const CHECK_LIST = {
    auth: [
        { property: 'accessToken', reg: /.+/, message: '토큰이 왜 없죠?' }
    ],
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
