// request interceptors -> token 认证
export default async function fetch(options) {
	const {
		url,
		payload,
		method = 'GET'
	} = options
	// 1. 获取 token
	const token = uni.getStorageSync("token")
	// 2. 把 token 塞进 header 中
	const header = token ? {
		'token': token
	} : {}
	return uni.request({
			url,
			method,
			data: payload,
			header
		})
		// response interceptors -> 异常状态的统一处理
		.then(async (res) => {
			const {
				statusCode,
				data
			} = res[1]
			// 1. 状态码异常 reject
			if (statusCode != 200) {
				return Promise.reject(res.data)
			}
			return data
		})
		.catch((err) => {
			console.log(err)
			// 2. 请求异常 reject
			const defaultMsg = err.code === "600" ? '登录失效' : '请求异常'
			// code
			return Promise.reject({
				message: defaultMsg,
				...err
			})
		})
}
