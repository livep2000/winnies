$.widget("apps.appstudio",$.winnies.appDialog,{version:"2.0.0",doLog:!0,tabHolder:null,uniqueLabel:null,myTabs:null,innerHeight:0,innerWidth:0,editors:{},menus:{},extFilters:[{"json file":".json"},{Webpage:".html"},{JavaScript:".js"},{"Plain text":".txt"},{"All files":".*"}],options:{},contentLoaded:function(){var a=this;this.element.css("overflow","hidden"),this.menuEvents(),this.createToolbar();var b=this.idFy("tabholder");this.uniqueLabel=b.id,this.tabHolder=b.element,this.myTabs=this.tabHolder.dynamictabs({activate:function(b,c){a.resize()},beforetabclose:function(b,c){var d=a.myTabs.dynamictabs("get_tabData",c).savedState;d?(a.myTabs.dynamictabs("close_tab",c),a.editors[c]=null,delete a.editors[c]):core.system.dialogs.dialog("confirmdialog",{title:"Save file first?",okText:"Save file",noButton:!0,noButtonText:"No",okButtonEnabled:!0,content:"The file was not saved.<br/>Doe you want to save it now?"},function(b,d){$(d).on("confirmdialogconfirm",function(d,e){if(e.err)return alert(b.message);var f=a.myTabs.dynamictabs("get_tabData",c),g=f.data.fullPath,h=a.editors[c].editor.getValue(),i=BVFS.path.basename(g),j=BVFS.path.dirname(g),k=new BVFS.buffer(h,"utf8");core.system.dialogs.dialog("filedialog",{title:"Save file",fileName:i,startPath:j,extFilters:a.extFilters,fileBuffer:k,handles:"save"},function(b,d){$(d).on("filedialogconfirm",function(b,d){a.myTabs.dynamictabs("close_tab",c),a.editors[c]=null,delete a.editors[c]})})}),$(d).on("confirmdialognoconfirm",function(d,e){return e.err?alert(b.message):(a.myTabs.dynamictabs("close_tab",c),a.editors[c]=null,void delete a.editors[c])})})}}),this.resize()},createEditorTabByFile:function(a,b){var c=this,d=BVFS.path.extname(a),e="text";".json"==d&&(e="json"),".js"==d&&(e="javascript"),".html"==d&&(e="html"),".css"==d&&(e="css");var f=BVFS.path.basename(a),g=b.toString("utf8");console.log("MODE: "+e);var h={title:f,content:g,savedState:!0,data:{fullPath:a,ext:d}},i=this.myTabs.dynamictabs("create_newtab",h);this.myTabs.dynamictabs("open_tab",i),this.editors[i]={},this.editors[i].editor=ace.edit("tab-"+i),this.editors[i].editor.setTheme("ace/theme/monokai"),this.editors[i].editor.getSession().setMode("ace/mode/"+e),this.editors[i].editor.width=1,this.editors[i].editor.height=1,this.editors[i].editor.setOptions({fontSize:"16px"}),this.editors[i].editor.on("input",function(){c.editors[i].editor.session.getUndoManager().isClean()||c.myTabs.dynamictabs("set_state",i,!1)}),this.myTabs.dynamictabs("select_tab",i),this.resize()},createToolbar:function(){var a=this;this.fec("filebutton").button(),this.fec("editbutton").button(),this.fec("viewbutton").button(),this.fec("templatebutton").button(),this.fec("aboutbutton").button(),$.contextMenu({selector:"button._winnies_appstudio_filebutton",trigger:"left",items:a.menus.file}),$.contextMenu({selector:"button._winnies_appstudio_editbutton",trigger:"left",items:a.menus.edit}),$.contextMenu({selector:"button._winnies_appstudio_viewbutton",trigger:"left",items:a.menus.view}),$.contextMenu({selector:"button._winnies_appstudio_templatebutton",trigger:"left",items:a.menus.template}),$.contextMenu({selector:"button._winnies_appstudio_aboutbutton",trigger:"left",items:a.menus.about})},menuEvents:function(){var a=this;this.menus.file={openfile:{name:"Open file",callback:function(b,c){core.system.dialogs.dialog("filedialog",{title:"Open file",startPath:"/home",extFilters:a.extFilters,handles:"open"},function(b,c){$(c).on("filedialogconfirm",function(c,d){return d.err?alert(b.message):void a.createEditorTabByFile(d.result.path,d.result.buffer)})})}},savefile:{name:"Save file",callback:function(b,c){var d=a.myTabs.dynamictabs("get_selected"),e=a.myTabs.dynamictabs("get_tabData",d),f=e.data.fullPath,g=a.editors[d].editor.getValue(),h=BVFS.path.basename(f),i=BVFS.path.dirname(f),j=new BVFS.buffer(g,"utf8");core.system.dialogs.dialog("filedialog",{title:"Save file",fileName:h,startPath:i,extFilters:a.extFilters,fileBuffer:j,handles:"save"},function(b,c){$(c).on("filedialogconfirm",function(b,c){console.log("confirmed save file!!"),a.myTabs.dynamictabs("set_state",d,!0),a.editors[d].editor.session.getUndoManager().markClean()})})}},saveall:{name:"Save all files",callback:function(a,b){alert("Clicked on "+a)}},newfile:{name:"New file",callback:function(a,b){}}},this.menus.edit={cut:{name:"Cut",callback:function(a,b){}},copy:{name:"Copy",callback:function(a,b){}},paste:{name:"Paste",callback:function(a,b){}},deletesel:{name:"Delete",callback:function(a,b){}},find:{name:"Find",callback:function(a,b){}}},this.menus.view={dummy:{name:"dummy",callback:function(a,b){}}},this.menus.template={dummy:{name:"dummy",callback:function(a,b){}}},this.menus.about={dummy:{name:"dummy",callback:function(a,b){}}}},idFy:function(a){var b=this.fec(a),c=core.util.guid();return b.attr({id:c}),{element:b,id:c}},fec:function(a){return this.element.find("._winnies_"+this.widgetName+"_"+a)},logging:function(a){this.doLog&&console.log(this.widgetName+" :: "+a)},resize:function(){this.myTabs.height(this.innerHeight-30),this.myTabs.width(this.innerWidth+5);var a=this.myTabs.dynamictabs("get_selected");a&&($("#tab-"+a).height(this.innerHeight-90),this.myTabs.dynamictabs("refresh"),this.editors[a]&&this.editors[a].editor.resize())},_trigger:function(a,b,c){"close"==a&&this._destroy(),"contentLoaded"==a&&(this.innerHeight=c.size.innerHeight,this.innerWidth=c.size.innerWidth,this.contentLoaded()),"resize"==a&&(this.innerHeight=c.size.innerHeight,this.innerWidth=c.size.innerWidth,this.resize()),this._super(a,b,c)},_destroy:function(){this._super()}});