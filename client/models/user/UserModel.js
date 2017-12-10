import api from "units/api"

class UserModel {
	static getUserList(params){
		return api.get('/user/list', params)
	}
	static updateUserByUid(u_id, data = {}){
		data['u_id'] = u_id
		return api.post('/user/update', data)
	}
}

export default UserModel
