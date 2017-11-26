const UserSchema = {
	u_username : {
		label : '用户名'
		,name : 'u_username'
		,rules : 'required'
		,default : 'bayken'
	}
	,password : {
		label : '密码'
		,name : 'password'
		,rules : 'required'
		,type: 'password'
		,default : 'philips'
	}
	,password_confirm : {
		label : '确认密码'
		,name : 'password_confirm'
		,rules : 'required|ksConfirmed:password'
		,type: 'password'
		,default: 'philips'
	}
	,u_email : {
		label : '邮箱'
		,name : 'u_email'
		,rules : 'required|email'
		,default: 'bayken@qq.com'
	}
	,u_auth_status : {
		label : '验证状态'
		,name : 'u_auth_status'
		,rules : 'required'
		,default : 'had_auth'
		,enums : {
			no_auth: '没有验证'
			,had_auth: '已经验证'
		}
	}
	,u_status : {
		label : '用户状态'
		,name : 'u_status'
		,rules : 'required'
		,default : 'active'
		,enums : {
			active: '激活状态'
			,not_auth: "未激活状态"
		}
	}
}
export default UserSchema
