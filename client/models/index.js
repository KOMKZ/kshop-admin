class Schema {
	static export(schema = {}, fields = [], map = {}){
		let newSchema = {}
		fields.forEach((fieldName) => {
			if(schema[fieldName]){
				newSchema[fieldName] = schema[fieldName]
			}
			if(Object.keys(map).length > 0){
				Object.entries(map).forEach(([oldName, newName]) => {
					if(newSchema[fieldName].hasOwnProperty(oldName)){
						newSchema[fieldName][newName] = newSchema[fieldName][oldName]
					}
				})
			}
		})
		return newSchema
	}

	static exportAsArray(schema = {}, fields = [], map = {}){
		let newSchema = []
		fields.forEach((fieldName, index) => {
			if(schema[fieldName]){
				newSchema[index] = schema[fieldName]
			}
			if(Object.keys(map).length > 0){
				Object.entries(map).forEach(([oldName, newName]) => {
					if(newSchema[index].hasOwnProperty(oldName)){
						newSchema[index][newName] = newSchema[index][oldName]
					}
				})
			}
		})
		return newSchema
	}
}

export {
	Schema
}
