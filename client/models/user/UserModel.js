import api from "units/api"

class UserModel {
	static getUserList(params){
		return api.get('/user/list', params)
	}
}

export default UserModel
