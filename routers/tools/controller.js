import * as api from './api.js';
var _ = require("underscore");
 
export default class {

  constructor(router, DBModule, app){
	  this.router = router;
	  this.DBModule = DBModule;
	  this.api = api;
	  this.app = app;
	  this._ = _;
  }

  init(){
    this.renders();
    this.actions();
  }

  renders(){
  }

  actions(){
    
  }
}
