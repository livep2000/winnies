$.widget("apps.filebrowser",$.winnies.appDialog,{version:"1.0.0",doLog:!0,FM:null,contentLoaded:function(){var a={startPath:"/",addressBar:!0,filePane:!0,fileBuffer:null};this.element.css("overflow","hidden"),this.FM=this.fec("container"),this.FM.height(this.element.height()),this.FM.filemanager(a)},resize:function(a){this.FM.height(this.element.height())},fec:function(a){return this.element.find("._winnies_"+this.widgetName+"_"+a)},_trigger:function(a,b,c){"close"==a&&(this.FM.filemanager("destroy"),this.FM=null,this._destroy()),"contentLoaded"==a&&this.contentLoaded(c),"resize"==a&&(this.FM.filemanager("option","resizeAll",c),this.resize(c)),this._super(a,b,c)},_destroy:function(){this._super()},logging:function(a){this.doLog&&console.log(this.widgetName+" :: "+a)}});