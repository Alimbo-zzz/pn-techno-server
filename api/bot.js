const { sendBotMessage } = require("../bot/index.js");

const sendMessage = async (req, res) => {
    try {
        const { title, text } = req.body;
        let content = ``;
        let isKey = false;
        let actionKeys = ['title', 'text', 'keys', 'list'];

        const keys = {
            title: () => { content += `<b>#${title.toUpperCase()}</b>\n\n`; },
            text: () => { content += `\n${text}`; },
            keys: () => {
                for (const key in req.body.keys) {
                    let value = req.body.keys[key];
                    if (!actionKeys.includes(key)) content += `${key}: <code>${value}</code>;\n`;
                }
            },
            list: () => {
                content += '___________Список_____________\n\n';
                for (let key in req.body.list) {
                    let obj = req.body.list[key];
                    if (!actionKeys.includes(key)) {
                        let str = `<b>-- ${key} --</b>\n`;
                        
                        if (typeof obj == 'object') {
                            for (let key in obj) {
                                let value = obj[key];
                                str += `${key}: <code>${value}</code>;\n`;
                            }
                        }
                        content += `${str}\n\n`;
                    }
                }
            }
        };

        for (const key in req.body) {
            if (keys[key]) {
                isKey = true;
                keys?.[key]?.();
            }
        }

        if (!isKey) {
            for (const key in req.body) {
                let value = req.body[key];
                content += `${key}: <code>${value}</code>;\n\n`;
            }
        }

        sendBotMessage(content);
        return res.status(200).json({ status: 1 });
    } catch (error) {
        return res.status(500).json({ status: 0, error: error.message });
    }
};

module.exports = { sendMessage };
