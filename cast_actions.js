
Cast.prototype.action = function(actionInfo) {
	if (actionInfo instanceof Array) {
		return new this.SUPPORTED_ACTIONS[actionInfo[0]](this,actionInfo[1]);
	} else if (typeof(actionInfo) == "string") {
		return new this.SUPPORTED_ACTIONS[actionInfo](this,null);
	} else if (actionInfo instanceof Object) {
		return new this.SUPPORTED_ACTIONS[actionInfo.action](this,actionInfo.action_opts);
	} else {
		alert("Unsupported action type: "+actionInfo);
	}
};

Cast.prototype.runAction = function(actionInfo) {
	this.action(actionInfo).run();
};

var Action = function() {};
Action.prototype.run = function() {
	this._run.apply(this,arguments);
};

var OpenSheet = function(cast, opts) {
	this.cast = cast;
	this.opts = opts;
};
OpenSheet.prototype = new Action();
OpenSheet.prototype._run = function() {
	this.cast.clearStack();
	this.cast.showSheet(this.opts.query,this.opts.stack);
};

var PushSheet = function(cast, opts) {
	this.cast = cast;
	this.opts = opts;
};
PushSheet.prototype = new Action();
PushSheet.prototype._run = function() {
	this.cast.showSheet(this.opts.query,this.opts.stack);
};

var PopSheet = function(cast, opts) {
	this.cast = cast;
	this.opts = opts;
};
PopSheet.prototype = new Action();
PopSheet.prototype._run = function() {
	this.cast.popStack(null,this.opts.count);
};

var PrefSave = function(cast, opts) {
	this.cast = cast;
	this.opts = opts;
};
PrefSave.prototype = new Action();
PrefSave.prototype._run = function() {
	this.cast.preference(this.opts.key,this.opts.value);
};

var PrefSaveInput = function(cast, opts) {
	this.cast = cast;
	this.opts = opts;
};
PrefSaveInput.prototype = new Action();
PrefSaveInput.prototype._run = function(domObject) {
	this.cast.preference(this.opts.key,domObject.value);
};

var LocalMethod = function(cast, opts) {
	this.cast = cast;
	this.opts = opts;
};
LocalMethod.prototype = new Action();
LocalMethod.prototype._run = function() {
	// execute local methods
};

Cast.prototype.SUPPORTED_ACTIONS = {
	"open": OpenSheet,
	"push": PushSheet,
	"pop": PopSheet,
	"pref": PrefSave,
	"pref_input": PrefSaveInput,
	"method": LocalMethod
};
