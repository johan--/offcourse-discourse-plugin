define("offcourse/adapters/application",["exports"],function(e){"use strict";e["default"]=EmberPouch.Adapter.extend({db:new PouchDB("offcoursedb")})}),define("offcourse/app",["ember","ember/resolver","ember/load-initializers","offcourse/config/environment","exports"],function(e,t,s,n,o){"use strict";var a=e["default"],r=t["default"],i=s["default"],u=n["default"];a.MODEL_FACTORY_INJECTIONS=!0;var c=a.Application.extend({modulePrefix:u.modulePrefix,podModulePrefix:u.podModulePrefix,Resolver:r});i(c,u.modulePrefix),o["default"]=c}),define("offcourse/components/multiselect-checkbox-option",["ember-multiselect-checkboxes/components/multiselect-checkbox-option","exports"],function(e,t){"use strict";var s=e["default"];t["default"]=s}),define("offcourse/components/multiselect-checkboxes",["ember-multiselect-checkboxes/components/multiselect-checkboxes","exports"],function(e,t){"use strict";var s=e["default"];t["default"]=s}),define("offcourse/controllers/application",["ember","exports"],function(e,t){"use strict";var s=e["default"];t["default"]=s.Controller.extend({isOnline:!0,init:function(){},updateNetworkStatus:function(){var e=this;return navigator.onLine?void s.$.get("http://happensesame.com").done(function(){e.set("isOnline",!0)}).fail(function(){e.set("isOnline",!1)}).always(function(){s.run.later(e,"updateNetworkStatus",6e4)}):void this.set("isOnline",!1)}})}),define("offcourse/initializers/export-application-global",["ember","offcourse/config/environment","exports"],function(e,t,s){"use strict";function n(e,t){var s=o.String.classify(a.modulePrefix);a.exportApplicationGlobal&&(window[s]=t)}var o=e["default"],a=t["default"];s.initialize=n,s["default"]={name:"export-application-global",initialize:n}}),define("offcourse/models/category",["ember-data","exports"],function(e,t){"use strict";var s=e["default"];t["default"]=s.Model.extend({})}),define("offcourse/models/site",["ember-data","exports"],function(e,t){"use strict";var s=e["default"];t["default"]=s.Model.extend({title:s.attr("string"),url:s.attr("string"),isActive:s.attr("boolean"),rev:s.attr("string")})}),define("offcourse/models/topic",["ember-data","exports"],function(e,t){"use strict";var s=e["default"];t["default"]=s.Model.extend({title:s.attr("string"),post_stream:s.attr("raw"),rev:s.attr("string")})}),define("offcourse/router",["ember","offcourse/config/environment","exports"],function(e,t,s){"use strict";var n=e["default"],o=t["default"],a=n.Router.extend({location:o.locationType});a.map(function(){this.resource("sites",function(){}),this.resource("categories",{path:"/online/categories"},function(){this.route("default",{path:"/"}),this.resource("categories.category",{path:"/:slug"},function(){this.route("default",{path:"/"}),this.resource("categories.category.topic",{path:"/:id"},function(){this.route("default",{path:"/"})})})}),this.route("categories/category"),this.resource("topics",function(){this.resource("topics.topic",{path:"/:id"},function(){this.route("default",{path:"/"})})})}),s["default"]=a}),define("offcourse/routes/categories",["ember","exports"],function(e,t){"use strict";var s=e["default"];t["default"]=s.Route.extend({model:function(){var e="/categories.json",t=$.getJSON(e).then(function(e){return e});return t},setupController:function(e,t){e.set("model",t)}})}),define("offcourse/routes/categories/category",["ember","exports"],function(e,t){"use strict";var s=e["default"];t["default"]=s.Route.extend({actions:{saveTopicsOffline:function(){var e=this.controller.get("selectedTopics");e.forEach(function(e){{var t="/t/"+e.id+".json",s=this;$.getJSON(t).then(function(){var t=s.store.createRecord("topic",{title:e.title,post_stream:e.post_stream,id:e.id});t.save()})}}.bind(this))}},model:function(e){var t="/c/"+e.slug+".json",s=$.getJSON(t).then(function(t){return t.category_slug=e.slug,t});return s},setupController:function(e,t){e.set("model",t),e.set("selectedTopics",[])}})}),define("offcourse/routes/categories/category/topic",["ember","exports"],function(e,t){"use strict";var s=e["default"];t["default"]=s.Route.extend({actions:{saveOffline:function(){var e=this.store,t=this.controller.get("model"),s=e.createRecord("topic",{title:t.title,post_stream:t.post_stream,id:t.id});s.save()},retrieveFromPouchDb:function(){var e=this.controller.get("model.id"),t=this.store.find("topic",e);t.then(function(){});var s=this.store.find("topic");s.then(function(){})}},model:function(e){var t="/t/"+e.id+".json",s=$.getJSON(t).then(function(e){return e});return s},setupController:function(e,t){e.set("model",t);var s=this.controllerFor("categories.category");s.set("isTopicView",!0),e.set("category_slug",s.get("model.category_slug"))},deactivate:function(){var e=this.controllerFor("categories.category");e.set("isTopicView",!1)}})}),define("offcourse/routes/index",["ember","exports"],function(e,t){"use strict";var s=e["default"];t["default"]=s.Route.extend({beforeModel:function(){this.transitionTo("categories")}})}),define("offcourse/routes/sites",["ember","exports"],function(e,t){"use strict";var s=e["default"];t["default"]=s.Route.extend({model:function(){return this.store.find("site")}})}),define("offcourse/routes/topics",["ember","exports"],function(e,t){"use strict";var s=e["default"];t["default"]=s.Route.extend({});var s=e["default"];t["default"]=s.Route.extend({actions:{},model:function(){var e=this.store.find("topic");return e.then(function(){}),e},setupController:function(e,t){e.set("model",t)}})}),define("offcourse/routes/topics/topic",["ember","exports"],function(e,t){"use strict";var s=e["default"];t["default"]=s.Route.extend({actions:{},model:function(e){var t="/t/"+e.id+".json",s=$.getJSON(t).then(function(e){return e});return s},setupController:function(e,t){e.set("model",t)}})}),define("offcourse/templates/application",["ember","exports"],function(e,t){"use strict";var s=e["default"];t["default"]=s.Handlebars.template(function(e,t,n,o,a){function r(e,t){t.buffer.push(" Offcourse ")}function i(e,t){t.buffer.push(" Online")}function u(e,t){t.buffer.push(" Offline ")}this.compilerInfo=[4,">= 1.0.0"],n=this.merge(n,s.Handlebars.helpers),a=a||{};var c,l,f,h="",p=this,d=n.helperMissing;return a.buffer.push('<nav class="navbar navbar-default navbar-fixed-top" role="navigation">\n  <div class="container">\n    <div class="navbar-header">\n      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">\n        <span class="sr-only">Toggle navigation</span>\n        <span class="icon-bar"></span>\n        <span class="icon-bar"></span>\n        <span class="icon-bar"></span>\n      </button>\n\n      <div class="navbar-brand" id=\'title\'>\n        '),l=n["link-to"]||t&&t["link-to"],f={hash:{},hashTypes:{},hashContexts:{},inverse:p.noop,fn:p.program(1,r,a),contexts:[t],types:["STRING"],data:a},c=l?l.call(t,"index",f):d.call(t,"link-to","index",f),(c||0===c)&&a.buffer.push(c),a.buffer.push('\n\n        <small>View discourse topics offline\n        </small>\n\n      </div>\n\n    </div>\n\n\n\n\n    <!-- Collect the nav links, forms, and other content for toggling -->\n    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">\n\n      <ul class="nav navbar-nav navbar-right">\n        <li>'),l=n["link-to"]||t&&t["link-to"],f={hash:{},hashTypes:{},hashContexts:{},inverse:p.noop,fn:p.program(3,i,a),contexts:[t],types:["STRING"],data:a},c=l?l.call(t,"index",f):d.call(t,"link-to","index",f),(c||0===c)&&a.buffer.push(c),a.buffer.push("</li>\n        <li>"),l=n["link-to"]||t&&t["link-to"],f={hash:{},hashTypes:{},hashContexts:{},inverse:p.noop,fn:p.program(5,u,a),contexts:[t],types:["STRING"],data:a},c=l?l.call(t,"topics",f):d.call(t,"link-to","topics",f),(c||0===c)&&a.buffer.push(c),a.buffer.push('</li>\n      </ul>\n    </div>\n  </div>\n</nav>\n\n<div class="container offcourse-main">\n\n  <div class="row">\n  </div>\n\n  '),c=n._triageMustache.call(t,"outlet",{hash:{},hashTypes:{},hashContexts:{},contexts:[t],types:["ID"],data:a}),(c||0===c)&&a.buffer.push(c),a.buffer.push("\n</div>\n"),h})}),define("offcourse/templates/categories",["ember","exports"],function(e,t){"use strict";var s=e["default"];t["default"]=s.Handlebars.template(function(e,t,n,o,a){function r(e,t){var s,o,a,r="";return t.buffer.push("\n	<li>\n		"),o=n["link-to"]||e&&e["link-to"],a={hash:{},hashTypes:{},hashContexts:{},inverse:l.noop,fn:l.program(2,i,t),contexts:[e,e],types:["STRING","ID"],data:t},s=o?o.call(e,"categories.category","item.slug",a):f.call(e,"link-to","categories.category","item.slug",a),(s||0===s)&&t.buffer.push(s),t.buffer.push("\n	</li>\n	"),r}function i(e,t){var s,o="";return t.buffer.push("\n		  "),s=n._triageMustache.call(e,"item.name",{hash:{},hashTypes:{},hashContexts:{},contexts:[e],types:["ID"],data:t}),(s||0===s)&&t.buffer.push(s),t.buffer.push("\n		"),o}this.compilerInfo=[4,">= 1.0.0"],n=this.merge(n,s.Handlebars.helpers),a=a||{};var u,c="",l=this,f=n.helperMissing;return a.buffer.push('<div class="categories-list">\n	Pick a category:\n\n	<ul>\n\n	'),u=n.each.call(t,"item","in","model.category_list.categories",{hash:{},hashTypes:{},hashContexts:{},inverse:l.noop,fn:l.program(1,r,a),contexts:[t,t,t],types:["ID","ID","ID"],data:a}),(u||0===u)&&a.buffer.push(u),a.buffer.push('\n\n	</ul>\n\n</div>\n\n<div class="topics-list" >\n	'),u=n._triageMustache.call(t,"outlet",{hash:{},hashTypes:{},hashContexts:{},contexts:[t],types:["ID"],data:a}),(u||0===u)&&a.buffer.push(u),a.buffer.push("\n</div>"),c})}),define("offcourse/templates/categories/category",["ember","exports"],function(e,t){"use strict";var s=e["default"];t["default"]=s.Handlebars.template(function(e,t,n,o,a){function r(e,t){var s,o,a="";return t.buffer.push('\n  <div class="selectable-topics">\n\nSelect topics below <button '),t.buffer.push(c(n.action.call(e,"saveTopicsOffline",{hash:{},hashTypes:{},hashContexts:{},contexts:[e],types:["STRING"],data:t}))),t.buffer.push(" > and click here to save offline </button>\n\n"),t.buffer.push(c((s=n["multiselect-checkboxes"]||e&&e["multiselect-checkboxes"],o={hash:{options:"model.topic_list.topics",labelProperty:"title",selection:"selectedTopics"},hashTypes:{options:"ID",labelProperty:"STRING",selection:"ID"},hashContexts:{options:e,labelProperty:e,selection:e},contexts:[],types:[],data:t},s?s.call(e,o):l.call(e,"multiselect-checkboxes",o)))),t.buffer.push("\n\n\n\n\n	</div>\n"),a}this.compilerInfo=[4,">= 1.0.0"],n=this.merge(n,s.Handlebars.helpers),a=a||{};var i,u="",c=this.escapeExpression,l=n.helperMissing,f=this;return a.buffer.push("\n"),i=n.unless.call(t,"isTopicView",{hash:{},hashTypes:{},hashContexts:{},inverse:f.noop,fn:f.program(1,r,a),contexts:[t],types:["ID"],data:a}),(i||0===i)&&a.buffer.push(i),a.buffer.push("\n\n<div>\n	"),i=n._triageMustache.call(t,"outlet",{hash:{},hashTypes:{},hashContexts:{},contexts:[t],types:["ID"],data:a}),(i||0===i)&&a.buffer.push(i),a.buffer.push("\n</div>"),u})}),define("offcourse/templates/categories/category/topic",["ember","exports"],function(e,t){"use strict";var s=e["default"];t["default"]=s.Handlebars.template(function(e,t,n,o,a){function r(e,t){t.buffer.push("\n		   back to topics list\n		")}function i(e,t){var s="";return t.buffer.push("\n	<div>\n		  "),t.buffer.push(h(n._triageMustache.call(e,"item.cooked",{hash:{unescaped:"true"},hashTypes:{unescaped:"STRING"},hashContexts:{unescaped:e},contexts:[e],types:["ID"],data:t}))),t.buffer.push("\n\n	</div>\n	"),s}this.compilerInfo=[4,">= 1.0.0"],n=this.merge(n,s.Handlebars.helpers),a=a||{};var u,c,l,f="",h=this.escapeExpression,p=this,d=n.helperMissing;return a.buffer.push('<div class="row">\n		'),c=n["link-to"]||t&&t["link-to"],l={hash:{},hashTypes:{},hashContexts:{},inverse:p.noop,fn:p.program(1,r,a),contexts:[t,t],types:["STRING","ID"],data:a},u=c?c.call(t,"categories.category","model.category_slug",l):d.call(t,"link-to","categories.category","model.category_slug",l),(u||0===u)&&a.buffer.push(u),a.buffer.push("\n\n		<button "),a.buffer.push(h(n.action.call(t,"saveOffline",{hash:{},hashTypes:{},hashContexts:{},contexts:[t],types:["STRING"],data:a}))),a.buffer.push(" > Save offline </button>\n\n		<button "),a.buffer.push(h(n.action.call(t,"retrieveFromPouchDb",{hash:{},hashTypes:{},hashContexts:{},contexts:[t],types:["STRING"],data:a}))),a.buffer.push(' > Retrieve Topic from PouchDb </button>\n\n</div>\n\n<div class="topic-details">\n	\n<h4>'),u=n._triageMustache.call(t,"model.fancy_title",{hash:{},hashTypes:{},hashContexts:{},contexts:[t],types:["ID"],data:a}),(u||0===u)&&a.buffer.push(u),a.buffer.push('</h4>\n\n<div class="">\n	<ul>\n\n	'),u=n.each.call(t,"item","in","model.post_stream.posts",{hash:{},hashTypes:{},hashContexts:{},inverse:p.noop,fn:p.program(3,i,a),contexts:[t,t,t],types:["ID","ID","ID"],data:a}),(u||0===u)&&a.buffer.push(u),a.buffer.push("\n\n	</ul>\n\n</div>\n</div>"),f})}),define("offcourse/templates/components/multiselect-checkbox-option",["ember","exports"],function(e,t){"use strict";var s=e["default"];t["default"]=s.Handlebars.template(function(e,t,n,o,a){this.compilerInfo=[4,">= 1.0.0"],n=this.merge(n,s.Handlebars.helpers),a=a||{};var r,i,u,c="",l=n.helperMissing,f=this.escapeExpression;return a.buffer.push("<label>\n  "),a.buffer.push(f((i=n.input||t&&t.input,u={hash:{type:"checkbox",checked:"isSelected"},hashTypes:{type:"STRING",checked:"ID"},hashContexts:{type:t,checked:t},contexts:[],types:[],data:a},i?i.call(t,u):l.call(t,"input",u)))),a.buffer.push("\n  "),r=n._triageMustache.call(t,"label",{hash:{},hashTypes:{},hashContexts:{},contexts:[t],types:["ID"],data:a}),(r||0===r)&&a.buffer.push(r),a.buffer.push("\n</label>\n"),c})}),define("offcourse/templates/components/multiselect-checkboxes",["ember","exports"],function(e,t){"use strict";var s=e["default"];t["default"]=s.Handlebars.template(function(e,t,n,o,a){function r(e,t){var s,o,a="";return t.buffer.push("\n  "),t.buffer.push(l((s=n["multiselect-checkbox-option"]||e&&e["multiselect-checkbox-option"],o={hash:{value:"option",labelProperty:"labelProperty",selection:"selection"},hashTypes:{value:"ID",labelProperty:"ID",selection:"ID"},hashContexts:{value:e,labelProperty:e,selection:e},contexts:[],types:[],data:t},s?s.call(e,o):c.call(e,"multiselect-checkbox-option",o)))),t.buffer.push("\n"),a}this.compilerInfo=[4,">= 1.0.0"],n=this.merge(n,s.Handlebars.helpers),a=a||{};var i,u="",c=n.helperMissing,l=this.escapeExpression,f=this;return i=n.each.call(t,"option","in","options",{hash:{},hashTypes:{},hashContexts:{},inverse:f.noop,fn:f.program(1,r,a),contexts:[t,t,t],types:["ID","ID","ID"],data:a}),(i||0===i)&&a.buffer.push(i),a.buffer.push("\n"),u})}),define("offcourse/templates/sites",["ember","exports"],function(e,t){"use strict";var s=e["default"];t["default"]=s.Handlebars.template(function(e,t,n,o,a){function r(e,t){var s,o="";return t.buffer.push("\n<li>\n	"),s=n._triageMustache.call(e,"item.title",{hash:{},hashTypes:{},hashContexts:{},contexts:[e],types:["ID"],data:t}),(s||0===s)&&t.buffer.push(s),t.buffer.push("\n</li>\n"),o}this.compilerInfo=[4,">= 1.0.0"],n=this.merge(n,s.Handlebars.helpers),a=a||{};var i,u="",c=this;return a.buffer.push("Pick a site:\n\n<ul>\n\n"),i=n.each.call(t,"item","in","model",{hash:{},hashTypes:{},hashContexts:{},inverse:c.noop,fn:c.program(1,r,a),contexts:[t,t,t],types:["ID","ID","ID"],data:a}),(i||0===i)&&a.buffer.push(i),a.buffer.push("\n\n</ul>\n\n\n"),i=n._triageMustache.call(t,"outlet",{hash:{},hashTypes:{},hashContexts:{},contexts:[t],types:["ID"],data:a}),(i||0===i)&&a.buffer.push(i),a.buffer.push("\n"),u})}),define("offcourse/templates/topics",["ember","exports"],function(e,t){"use strict";var s=e["default"];t["default"]=s.Handlebars.template(function(e,t,n,o,a){function r(e,t){var s,o,a,r="";return t.buffer.push("\n          <li>\n            "),o=n["link-to"]||e&&e["link-to"],a={hash:{},hashTypes:{},hashContexts:{},inverse:l.noop,fn:l.program(2,i,t),contexts:[e,e],types:["STRING","ID"],data:t},s=o?o.call(e,"topics.topic","topic.id",a):f.call(e,"link-to","topics.topic","topic.id",a),(s||0===s)&&t.buffer.push(s),t.buffer.push("\n          </li>\n          "),r}function i(e,t){var s,o="";return t.buffer.push(" "),s=n._triageMustache.call(e,"topic.title",{hash:{},hashTypes:{},hashContexts:{},contexts:[e],types:["ID"],data:t}),(s||0===s)&&t.buffer.push(s),t.buffer.push(" "),o}this.compilerInfo=[4,">= 1.0.0"],n=this.merge(n,s.Handlebars.helpers),a=a||{};var u,c="",l=this,f=n.helperMissing;return a.buffer.push('<div class="offline-topics">\n\n  <div class="col-md-3">\n    <div class="bs-sidebar hidden-print affix-top" role="complementary">\n      Offlint ts:\n      <ul class="nav bs-sidenav">\n        <ul>\n\n          '),u=n.each.call(t,"topic","in","model.content",{hash:{},hashTypes:{},hashContexts:{},inverse:l.noop,fn:l.program(1,r,a),contexts:[t,t,t],types:["ID","ID","ID"],data:a}),(u||0===u)&&a.buffer.push(u),a.buffer.push('\n\n        </ul>\n\n    </div>\n  </div>\n  <div class="col-md-9" role="main">\n  	'),u=n._triageMustache.call(t,"outlet",{hash:{},hashTypes:{},hashContexts:{},contexts:[t],types:["ID"],data:a}),(u||0===u)&&a.buffer.push(u),a.buffer.push("\n	</div>\n</div>\n"),c})}),define("offcourse/templates/topics/topic",["ember","exports"],function(e,t){"use strict";var s=e["default"];t["default"]=s.Handlebars.template(function(e,t,n,o,a){function r(e,t){var s="";return t.buffer.push('\n      <li class="list-group-item">\n        '),t.buffer.push(c(n._triageMustache.call(e,"item.cooked",{hash:{unescaped:"true"},hashTypes:{unescaped:"STRING"},hashContexts:{unescaped:e},contexts:[e],types:["ID"],data:t}))),t.buffer.push("\n      </li>\n      "),s}this.compilerInfo=[4,">= 1.0.0"],n=this.merge(n,s.Handlebars.helpers),a=a||{};var i,u="",c=this.escapeExpression,l=this;return a.buffer.push('<div class="row">\n\n</div>\n\n<div class="topic-details">\n\n  <div class="panel panel-default">\n    <div class="panel-heading">\n      <h4>'),i=n._triageMustache.call(t,"model.fancy_title",{hash:{},hashTypes:{},hashContexts:{},contexts:[t],types:["ID"],data:a}),(i||0===i)&&a.buffer.push(i),a.buffer.push('</h4>\n    </div>\n\n    <ul class="list-group">\n\n      '),i=n.each.call(t,"item","in","model.post_stream.posts",{hash:{},hashTypes:{},hashContexts:{},inverse:l.noop,fn:l.program(1,r,a),contexts:[t,t,t],types:["ID","ID","ID"],data:a}),(i||0===i)&&a.buffer.push(i),a.buffer.push("\n\n    </ul>\n\n  </div>\n\n</div>\n"),u})}),define("offcourse/transforms/raw",["ember-data","exports"],function(e,t){"use strict";var s=e["default"];t["default"]=s.Transform.extend({deserialize:function(e){return e},serialize:function(e){return e}})}),define("offcourse/config/environment",["ember"],function(e){var t="offcourse";try{var s=t+"/config/environment",n=e["default"].$('meta[name="'+s+'"]').attr("content"),o=JSON.parse(unescape(n));return{"default":o}}catch(a){throw new Error('Could not read config from meta tag with name "'+s+'".')}}),runningTests?require("offcourse/tests/test-helper"):require("offcourse/app")["default"].create({});