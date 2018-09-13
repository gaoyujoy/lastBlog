export default class { 
	constructor(mongoose) {
		this.Blog = new (require('./blog.js').default)(mongoose);
		this.User = new (require('./user.js').default)(mongoose);
		this.Tag = new (require('./tag.js').default)(mongoose);
		this.Aboutme = new (require('./aboutme.js').default)(mongoose);
	}
}
