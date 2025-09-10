/**
 * EmailJS配置和发送工具
 * 使用前请先在 https://www.emailjs.com/ 注册账户并获取必要的配置信息
 */

// 配置参数
const emailjsConfig = {
    // 用户提供的Service ID
    serviceID: 'service_xc0gf8c',
    // 用户提供的Template ID
    templateID: 'template_88dmaip'
};

/**
 * 初始化EmailJS
 * @param {string} userID - 您的EmailJS User ID
 * @param {Object} config - 可选配置参数
 */
function initEmailJS(userID, config = {}) {
    // 合并配置
    Object.assign(emailjsConfig, config);

    // 检查必要参数
    if (!userID) {
        console.error('W2z0hxuF4OECMJ83E');
        return;
    }

    // 加载EmailJS库
    if (!window.emailjs) {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/emailjs-com@3/dist/email.min.js';
        script.onload = () => {
            emailjs.init(userID);
            console.log('EmailJS初始化成功');
        };
        script.onerror = () => {
            console.error('加载EmailJS库失败，请检查网络连接');
        };
        document.head.appendChild(script);
    } else {
        // 已经加载过，直接初始化
        emailjs.init(userID);
        console.log('EmailJS重新初始化成功');
    }
}

/**
 * 发送邮件函数
 * @param {string} name - 发送者姓名
 * @param {string} email - 发送者邮箱
 * @param {string} subject - 邮件主题
 * @param {string} message - 邮件内容
 * @returns {Promise} - 返回发送结果的Promise
 */
function sendEmail(name, email, subject, message) {
    return new Promise((resolve, reject) => {
        // 检查EmailJS是否已初始化
        if (!window.emailjs) {
            reject('EmailJS未初始化，请先调用initEmailJS函数');
            return;
        }

        // 检查配置是否完整
        if (!emailjsConfig.serviceID || !emailjsConfig.templateID) {
            reject('EmailJS配置不完整，请提供Service ID和Template ID');
            return;
        }

        // 验证输入
        if (!name || !email || !subject || !message) {
            reject('表单数据不完整，请填写所有必填字段');
            return;
        }

        // 构建邮件参数
        const templateParams = {
            from_name: name,
            from_email: email,
            subject: subject,
            message: message,
            // 可以添加更多自定义参数，根据您的模板需求
            timestamp: new Date().toLocaleString()
        };

        // 发送邮件
        emailjs.send(emailjsConfig.serviceID, emailjsConfig.templateID, templateParams)
            .then(response => {
                console.log('邮件发送成功:', response);
                resolve(response);
            })
            .catch(error => {
                console.error('邮件发送失败:', error);
                // 增强错误信息
                let errorMessage = '发送邮件失败: ';
                if (error.status === 400) {
                    errorMessage += '请求参数错误，请检查配置';
                } else if (error.status === 401) {
                    errorMessage += '未授权，请检查User ID和Service ID';
                } else if (error.status === 403) {
                    errorMessage += '权限不足，请检查模板配置';
                } else if (error.status === 404) {
                    errorMessage += '未找到服务或模板，请检查Service ID和Template ID';
                } else if (error.status === 500) {
                    errorMessage += '服务器错误，请稍后再试';
                } else {
                    errorMessage += error.message || '未知错误';
                }
                reject(errorMessage);
            });
    });
}

// 导出函数
window.initEmailJS = initEmailJS;
window.sendEmail = sendEmail;
window.emailjsConfig = emailjsConfig;

/**
 * 使用指南:
 * 1. 访问 https://www.emailjs.com/ 注册免费账户
 * 2. 验证您的邮箱地址
 * 3. 创建一个新的Email Service (获取Service ID)
 * 4. 创建一个新的Email Template (获取Template ID)
 * 5. 在模板中添加以下变量: {{from_name}}, {{from_email}}, {{subject}}, {{message}}
 * 6. 在index.html中替换YOUR_USER_ID, YOUR_SERVICE_ID和YOUR_TEMPLATE_ID
 * 7. 部署并测试您的表单
 */