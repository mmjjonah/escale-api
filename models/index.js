let models = {
	Client: require('./Client'),
	Command: require('./Command'),
	Gateau: require('./Gateau'),
	Param_general: require('./Param_general'),
	User: require('./User')
}

Object.keys(models).forEach(modelName => {
	if ('associate' in models[modelName]) {
		models[modelName].associate(models);
	}
})

module.exports = models
