ace.define("ace/mode/doc_comment_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"],function(a,b,c){"use strict";var d=a("../lib/oop"),e=a("./text_highlight_rules").TextHighlightRules,f=function(){this.$rules={start:[{token:"comment.doc.tag",regex:"@[\\w\\d_]+"},f.getTagRule(),{defaultToken:"comment.doc",caseInsensitive:!0}]}};d.inherits(f,e),f.getTagRule=function(a){return{token:"comment.doc.tag.storage.type",regex:"\\b(?:TODO|FIXME|XXX|HACK)\\b"}},f.getStartRule=function(a){return{token:"comment.doc",regex:"\\/\\*(?=\\*)",next:a}},f.getEndRule=function(a){return{token:"comment.doc",regex:"\\*\\/",next:a}},b.DocCommentHighlightRules=f}),ace.define("ace/mode/javascript_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/doc_comment_highlight_rules","ace/mode/text_highlight_rules"],function(a,b,c){"use strict";function d(){var a=h.replace("\\d","\\d\\-"),b={onMatch:function(a,b,c){var d="/"==a.charAt(1)?2:1;return 1==d?(b!=this.nextState?c.unshift(this.next,this.nextState,0):c.unshift(this.next),c[2]++):2==d&&b==this.nextState&&(c[1]--,(!c[1]||c[1]<0)&&(c.shift(),c.shift())),[{type:"meta.tag.punctuation."+(1==d?"":"end-")+"tag-open.xml",value:a.slice(0,d)},{type:"meta.tag.tag-name.xml",value:a.substr(d)}]},regex:"</?"+a,next:"jsxAttributes",nextState:"jsx"};this.$rules.start.unshift(b);var c={regex:"{",token:"paren.quasi.start",push:"start"};this.$rules.jsx=[c,b,{include:"reference"},{defaultToken:"string"}],this.$rules.jsxAttributes=[{token:"meta.tag.punctuation.tag-close.xml",regex:"/?>",onMatch:function(a,b,c){return b==c[0]&&c.shift(),2==a.length&&(c[0]==this.nextState&&c[1]--,(!c[1]||c[1]<0)&&c.splice(0,2)),this.next=c[0]||"start",[{type:this.token,value:a}]},nextState:"jsx"},c,{token:"entity.other.attribute-name.xml",regex:a},{token:"keyword.operator.attribute-equals.xml",regex:"="},{token:"text.tag-whitespace.xml",regex:"\\s+"},{token:"string.attribute-value.xml",regex:"'",stateName:"jsx_attr_q",push:[{token:"string.attribute-value.xml",regex:"'",next:"pop"},c,{include:"reference"},{defaultToken:"string.attribute-value.xml"}]},{token:"string.attribute-value.xml",regex:'"',stateName:"jsx_attr_qq",push:[c,{token:"string.attribute-value.xml",regex:'"',next:"pop"},{include:"reference"},{defaultToken:"string.attribute-value.xml"}]}],this.$rules.reference=[{token:"constant.language.escape.reference.xml",regex:"(?:&#[0-9]+;)|(?:&#x[0-9a-fA-F]+;)|(?:&[a-zA-Z0-9_:\\.-]+;)"}]}var e=a("../lib/oop"),f=a("./doc_comment_highlight_rules").DocCommentHighlightRules,g=a("./text_highlight_rules").TextHighlightRules,h="[a-zA-Z\\$_¡-￿][a-zA-Z\\d\\$_¡-￿]*\\b",i=function(a){var b=this.createKeywordMapper({"variable.language":"Array|Boolean|Date|Function|Iterator|Number|Object|RegExp|String|Proxy|Namespace|QName|XML|XMLList|ArrayBuffer|Float32Array|Float64Array|Int16Array|Int32Array|Int8Array|Uint16Array|Uint32Array|Uint8Array|Uint8ClampedArray|Error|EvalError|InternalError|RangeError|ReferenceError|StopIteration|SyntaxError|TypeError|URIError|decodeURI|decodeURIComponent|encodeURI|encodeURIComponent|eval|isFinite|isNaN|parseFloat|parseInt|JSON|Math|this|arguments|prototype|window|document",keyword:"const|yield|import|get|set|break|case|catch|continue|default|delete|do|else|finally|for|function|if|in|instanceof|new|return|switch|throw|try|typeof|let|var|while|with|debugger|__parent__|__count__|escape|unescape|with|__proto__|class|enum|extends|super|export|implements|private|public|interface|package|protected|static","storage.type":"const|let|var|function","constant.language":"null|Infinity|NaN|undefined","support.function":"alert","constant.language.boolean":"true|false"},"identifier"),c="case|do|else|finally|in|instanceof|return|throw|try|typeof|yield|void",e="\\\\(?:x[0-9a-fA-F]{2}|u[0-9a-fA-F]{4}|[0-2][0-7]{0,2}|3[0-6][0-7]?|37[0-7]?|[4-7][0-7]?|.)";this.$rules={no_regex:[{token:"comment",regex:"\\/\\/",next:"line_comment"},f.getStartRule("doc-start"),{token:"comment",regex:/\/\*/,next:"comment"},{token:"string",regex:"'(?=.)",next:"qstring"},{token:"string",regex:'"(?=.)',next:"qqstring"},{token:"constant.numeric",regex:/0[xX][0-9a-fA-F]+\b/},{token:"constant.numeric",regex:/[+-]?\d+(?:(?:\.\d*)?(?:[eE][+-]?\d+)?)?\b/},{token:["storage.type","punctuation.operator","support.function","punctuation.operator","entity.name.function","text","keyword.operator"],regex:"("+h+")(\\.)(prototype)(\\.)("+h+")(\\s*)(=)",next:"function_arguments"},{token:["storage.type","punctuation.operator","entity.name.function","text","keyword.operator","text","storage.type","text","paren.lparen"],regex:"("+h+")(\\.)("+h+")(\\s*)(=)(\\s*)(function)(\\s*)(\\()",next:"function_arguments"},{token:["entity.name.function","text","keyword.operator","text","storage.type","text","paren.lparen"],regex:"("+h+")(\\s*)(=)(\\s*)(function)(\\s*)(\\()",next:"function_arguments"},{token:["storage.type","punctuation.operator","entity.name.function","text","keyword.operator","text","storage.type","text","entity.name.function","text","paren.lparen"],regex:"("+h+")(\\.)("+h+")(\\s*)(=)(\\s*)(function)(\\s+)(\\w+)(\\s*)(\\()",next:"function_arguments"},{token:["storage.type","text","entity.name.function","text","paren.lparen"],regex:"(function)(\\s+)("+h+")(\\s*)(\\()",next:"function_arguments"},{token:["entity.name.function","text","punctuation.operator","text","storage.type","text","paren.lparen"],regex:"("+h+")(\\s*)(:)(\\s*)(function)(\\s*)(\\()",next:"function_arguments"},{token:["text","text","storage.type","text","paren.lparen"],regex:"(:)(\\s*)(function)(\\s*)(\\()",next:"function_arguments"},{token:"keyword",regex:"(?:"+c+")\\b",next:"start"},{token:["support.constant"],regex:/that\b/},{token:["storage.type","punctuation.operator","support.function.firebug"],regex:/(console)(\.)(warn|info|log|error|time|trace|timeEnd|assert)\b/},{token:b,regex:h},{token:"punctuation.operator",regex:/[.](?![.])/,next:"property"},{token:"keyword.operator",regex:/--|\+\+|\.{3}|===|==|=|!=|!==|<=|>=|<<=|>>=|>>>=|<>|<|>|!|&&|\|\||\?\:|[!$%&*+\-~\/^]=?/,next:"start"},{token:"punctuation.operator",regex:/[?:,;.]/,next:"start"},{token:"paren.lparen",regex:/[\[({]/,next:"start"},{token:"paren.rparen",regex:/[\])}]/},{token:"comment",regex:/^#!.*$/}],property:[{token:"text",regex:"\\s+"},{token:["storage.type","punctuation.operator","entity.name.function","text","keyword.operator","text","storage.type","text","entity.name.function","text","paren.lparen"],regex:"("+h+")(\\.)("+h+")(\\s*)(=)(\\s*)(function)(?:(\\s+)(\\w+))?(\\s*)(\\()",next:"function_arguments"},{token:"punctuation.operator",regex:/[.](?![.])/},{token:"support.function",regex:/(s(?:h(?:ift|ow(?:Mod(?:elessDialog|alDialog)|Help))|croll(?:X|By(?:Pages|Lines)?|Y|To)?|t(?:op|rike)|i(?:n|zeToContent|debar|gnText)|ort|u(?:p|b(?:str(?:ing)?)?)|pli(?:ce|t)|e(?:nd|t(?:Re(?:sizable|questHeader)|M(?:i(?:nutes|lliseconds)|onth)|Seconds|Ho(?:tKeys|urs)|Year|Cursor|Time(?:out)?|Interval|ZOptions|Date|UTC(?:M(?:i(?:nutes|lliseconds)|onth)|Seconds|Hours|Date|FullYear)|FullYear|Active)|arch)|qrt|lice|avePreferences|mall)|h(?:ome|andleEvent)|navigate|c(?:har(?:CodeAt|At)|o(?:s|n(?:cat|textual|firm)|mpile)|eil|lear(?:Timeout|Interval)?|a(?:ptureEvents|ll)|reate(?:StyleSheet|Popup|EventObject))|t(?:o(?:GMTString|S(?:tring|ource)|U(?:TCString|pperCase)|Lo(?:caleString|werCase))|est|a(?:n|int(?:Enabled)?))|i(?:s(?:NaN|Finite)|ndexOf|talics)|d(?:isableExternalCapture|ump|etachEvent)|u(?:n(?:shift|taint|escape|watch)|pdateCommands)|j(?:oin|avaEnabled)|p(?:o(?:p|w)|ush|lugins.refresh|a(?:ddings|rse(?:Int|Float)?)|r(?:int|ompt|eference))|e(?:scape|nableExternalCapture|val|lementFromPoint|x(?:p|ec(?:Script|Command)?))|valueOf|UTC|queryCommand(?:State|Indeterm|Enabled|Value)|f(?:i(?:nd|le(?:ModifiedDate|Size|CreatedDate|UpdatedDate)|xed)|o(?:nt(?:size|color)|rward)|loor|romCharCode)|watch|l(?:ink|o(?:ad|g)|astIndexOf)|a(?:sin|nchor|cos|t(?:tachEvent|ob|an(?:2)?)|pply|lert|b(?:s|ort))|r(?:ou(?:nd|teEvents)|e(?:size(?:By|To)|calc|turnValue|place|verse|l(?:oad|ease(?:Capture|Events)))|andom)|g(?:o|et(?:ResponseHeader|M(?:i(?:nutes|lliseconds)|onth)|Se(?:conds|lection)|Hours|Year|Time(?:zoneOffset)?|Da(?:y|te)|UTC(?:M(?:i(?:nutes|lliseconds)|onth)|Seconds|Hours|Da(?:y|te)|FullYear)|FullYear|A(?:ttention|llResponseHeaders)))|m(?:in|ove(?:B(?:y|elow)|To(?:Absolute)?|Above)|ergeAttributes|a(?:tch|rgins|x))|b(?:toa|ig|o(?:ld|rderWidths)|link|ack))\b(?=\()/},{token:"support.function.dom",regex:/(s(?:ub(?:stringData|mit)|plitText|e(?:t(?:NamedItem|Attribute(?:Node)?)|lect))|has(?:ChildNodes|Feature)|namedItem|c(?:l(?:ick|o(?:se|neNode))|reate(?:C(?:omment|DATASection|aption)|T(?:Head|extNode|Foot)|DocumentFragment|ProcessingInstruction|E(?:ntityReference|lement)|Attribute))|tabIndex|i(?:nsert(?:Row|Before|Cell|Data)|tem)|open|delete(?:Row|C(?:ell|aption)|T(?:Head|Foot)|Data)|focus|write(?:ln)?|a(?:dd|ppend(?:Child|Data))|re(?:set|place(?:Child|Data)|move(?:NamedItem|Child|Attribute(?:Node)?)?)|get(?:NamedItem|Element(?:sBy(?:Name|TagName|ClassName)|ById)|Attribute(?:Node)?)|blur)\b(?=\()/},{token:"support.constant",regex:/(s(?:ystemLanguage|cr(?:ipts|ollbars|een(?:X|Y|Top|Left))|t(?:yle(?:Sheets)?|atus(?:Text|bar)?)|ibling(?:Below|Above)|ource|uffixes|e(?:curity(?:Policy)?|l(?:ection|f)))|h(?:istory|ost(?:name)?|as(?:h|Focus))|y|X(?:MLDocument|SLDocument)|n(?:ext|ame(?:space(?:s|URI)|Prop))|M(?:IN_VALUE|AX_VALUE)|c(?:haracterSet|o(?:n(?:structor|trollers)|okieEnabled|lorDepth|mp(?:onents|lete))|urrent|puClass|l(?:i(?:p(?:boardData)?|entInformation)|osed|asses)|alle(?:e|r)|rypto)|t(?:o(?:olbar|p)|ext(?:Transform|Indent|Decoration|Align)|ags)|SQRT(?:1_2|2)|i(?:n(?:ner(?:Height|Width)|put)|ds|gnoreCase)|zIndex|o(?:scpu|n(?:readystatechange|Line)|uter(?:Height|Width)|p(?:sProfile|ener)|ffscreenBuffering)|NEGATIVE_INFINITY|d(?:i(?:splay|alog(?:Height|Top|Width|Left|Arguments)|rectories)|e(?:scription|fault(?:Status|Ch(?:ecked|arset)|View)))|u(?:ser(?:Profile|Language|Agent)|n(?:iqueID|defined)|pdateInterval)|_content|p(?:ixelDepth|ort|ersonalbar|kcs11|l(?:ugins|atform)|a(?:thname|dding(?:Right|Bottom|Top|Left)|rent(?:Window|Layer)?|ge(?:X(?:Offset)?|Y(?:Offset)?))|r(?:o(?:to(?:col|type)|duct(?:Sub)?|mpter)|e(?:vious|fix)))|e(?:n(?:coding|abledPlugin)|x(?:ternal|pando)|mbeds)|v(?:isibility|endor(?:Sub)?|Linkcolor)|URLUnencoded|P(?:I|OSITIVE_INFINITY)|f(?:ilename|o(?:nt(?:Size|Family|Weight)|rmName)|rame(?:s|Element)|gColor)|E|whiteSpace|l(?:i(?:stStyleType|n(?:eHeight|kColor))|o(?:ca(?:tion(?:bar)?|lName)|wsrc)|e(?:ngth|ft(?:Context)?)|a(?:st(?:M(?:odified|atch)|Index|Paren)|yer(?:s|X)|nguage))|a(?:pp(?:MinorVersion|Name|Co(?:deName|re)|Version)|vail(?:Height|Top|Width|Left)|ll|r(?:ity|guments)|Linkcolor|bove)|r(?:ight(?:Context)?|e(?:sponse(?:XML|Text)|adyState))|global|x|m(?:imeTypes|ultiline|enubar|argin(?:Right|Bottom|Top|Left))|L(?:N(?:10|2)|OG(?:10E|2E))|b(?:o(?:ttom|rder(?:Width|RightWidth|BottomWidth|Style|Color|TopWidth|LeftWidth))|ufferDepth|elow|ackground(?:Color|Image)))\b/},{token:"identifier",regex:h},{regex:"",token:"empty",next:"no_regex"}],start:[f.getStartRule("doc-start"),{token:"comment",regex:"\\/\\*",next:"comment_regex_allowed"},{token:"comment",regex:"\\/\\/",next:"line_comment_regex_allowed"},{token:"string.regexp",regex:"\\/",next:"regex"},{token:"text",regex:"\\s+|^$",next:"start"},{token:"empty",regex:"",next:"no_regex"}],regex:[{token:"regexp.keyword.operator",regex:"\\\\(?:u[\\da-fA-F]{4}|x[\\da-fA-F]{2}|.)"},{token:"string.regexp",regex:"/[sxngimy]*",next:"no_regex"},{token:"invalid",regex:/\{\d+\b,?\d*\}[+*]|[+*$^?][+*]|[$^][?]|\?{3,}/},{token:"constant.language.escape",regex:/\(\?[:=!]|\)|\{\d+\b,?\d*\}|[+*]\?|[()$^+*?.]/},{token:"constant.language.delimiter",regex:/\|/},{token:"constant.language.escape",regex:/\[\^?/,next:"regex_character_class"},{token:"empty",regex:"$",next:"no_regex"},{defaultToken:"string.regexp"}],regex_character_class:[{token:"regexp.charclass.keyword.operator",regex:"\\\\(?:u[\\da-fA-F]{4}|x[\\da-fA-F]{2}|.)"},{token:"constant.language.escape",regex:"]",next:"regex"},{token:"constant.language.escape",regex:"-"},{token:"empty",regex:"$",next:"no_regex"},{defaultToken:"string.regexp.charachterclass"}],function_arguments:[{token:"variable.parameter",regex:h},{token:"punctuation.operator",regex:"[, ]+"},{token:"punctuation.operator",regex:"$"},{token:"empty",regex:"",next:"no_regex"}],comment_regex_allowed:[f.getTagRule(),{token:"comment",regex:"\\*\\/",next:"start"},{defaultToken:"comment",caseInsensitive:!0}],comment:[f.getTagRule(),{token:"comment",regex:"\\*\\/",next:"no_regex"},{defaultToken:"comment",caseInsensitive:!0}],line_comment_regex_allowed:[f.getTagRule(),{token:"comment",regex:"$|^",next:"start"},{defaultToken:"comment",caseInsensitive:!0}],line_comment:[f.getTagRule(),{token:"comment",regex:"$|^",next:"no_regex"},{defaultToken:"comment",caseInsensitive:!0}],qqstring:[{token:"constant.language.escape",regex:e},{token:"string",regex:"\\\\$",next:"qqstring"},{token:"string",regex:'"|$',next:"no_regex"},{defaultToken:"string"}],qstring:[{token:"constant.language.escape",regex:e},{token:"string",regex:"\\\\$",next:"qstring"},{token:"string",regex:"'|$",next:"no_regex"},{defaultToken:"string"}]},a&&a.noES6||(this.$rules.no_regex.unshift({regex:"[{}]",onMatch:function(a,b,c){return this.next="{"==a?this.nextState:"","{"==a&&c.length?(c.unshift("start",b),"paren"):"}"==a&&c.length&&(c.shift(),this.next=c.shift(),-1!=this.next.indexOf("string")||-1!=this.next.indexOf("jsx"))?"paren.quasi.end":"{"==a?"paren.lparen":"paren.rparen"},nextState:"start"},{token:"string.quasi.start",regex:/`/,push:[{token:"constant.language.escape",regex:e},{token:"paren.quasi.start",regex:/\${/,push:"start"},{token:"string.quasi.end",regex:/`/,next:"pop"},{defaultToken:"string.quasi"}]}),a&&a.noJSX||d.call(this)),this.embedRules(f,"doc-",[f.getEndRule("no_regex")]),this.normalizeRules()};e.inherits(i,g),b.JavaScriptHighlightRules=i}),ace.define("ace/mode/matching_brace_outdent",["require","exports","module","ace/range"],function(a,b,c){"use strict";var d=a("../range").Range,e=function(){};(function(){this.checkOutdent=function(a,b){return/^\s+$/.test(a)?/^\s*\}/.test(b):!1},this.autoOutdent=function(a,b){var c=a.getLine(b),e=c.match(/^(\s*\})/);if(!e)return 0;var f=e[1].length,g=a.findMatchingBracket({row:b,column:f});if(!g||g.row==b)return 0;var h=this.$getIndent(a.getLine(g.row));a.replace(new d(b,0,b,f-1),h)},this.$getIndent=function(a){return a.match(/^\s*/)[0]}}).call(e.prototype),b.MatchingBraceOutdent=e}),ace.define("ace/mode/behaviour/cstyle",["require","exports","module","ace/lib/oop","ace/mode/behaviour","ace/token_iterator","ace/lib/lang"],function(a,b,c){"use strict";var d,e=a("../../lib/oop"),f=a("../behaviour").Behaviour,g=a("../../token_iterator").TokenIterator,h=a("../../lib/lang"),i=["text","paren.rparen","punctuation.operator"],j=["text","paren.rparen","punctuation.operator","comment"],k={},l=function(a){var b=-1;return a.multiSelect&&(b=a.selection.index,k.rangeCount!=a.multiSelect.rangeCount&&(k={rangeCount:a.multiSelect.rangeCount})),k[b]?d=k[b]:void(d=k[b]={autoInsertedBrackets:0,autoInsertedRow:-1,autoInsertedLineEnd:"",maybeInsertedBrackets:0,maybeInsertedRow:-1,maybeInsertedLineStart:"",maybeInsertedLineEnd:""})},m=function(a,b,c,d){var e=a.end.row-a.start.row;return{text:c+b+d,selection:[0,a.start.column+1,e,a.end.column+(e?0:1)]}},n=function(){this.add("braces","insertion",function(a,b,c,e,f){var g=c.getCursorPosition(),i=e.doc.getLine(g.row);if("{"==f){l(c);var j=c.getSelectionRange(),k=e.doc.getTextRange(j);if(""!==k&&"{"!==k&&c.getWrapBehavioursEnabled())return m(j,k,"{","}");if(n.isSaneInsertion(c,e))return/[\]\}\)]/.test(i[g.column])||c.inMultiSelectMode?(n.recordAutoInsert(c,e,"}"),{text:"{}",selection:[1,1]}):(n.recordMaybeInsert(c,e,"{"),{text:"{",selection:[1,1]})}else if("}"==f){l(c);var o=i.substring(g.column,g.column+1);if("}"==o){var p=e.$findOpeningBracket("}",{column:g.column+1,row:g.row});if(null!==p&&n.isAutoInsertedClosing(g,i,f))return n.popAutoInsertedClosing(),{text:"",selection:[1,1]}}}else{if("\n"==f||"\r\n"==f){l(c);var q="";n.isMaybeInsertedClosing(g,i)&&(q=h.stringRepeat("}",d.maybeInsertedBrackets),n.clearMaybeInsertedClosing());var o=i.substring(g.column,g.column+1);if("}"===o){var r=e.findMatchingBracket({row:g.row,column:g.column+1},"}");if(!r)return null;var s=this.$getIndent(e.getLine(r.row))}else{if(!q)return void n.clearMaybeInsertedClosing();var s=this.$getIndent(i)}var t=s+e.getTabString();return{text:"\n"+t+"\n"+s+q,selection:[1,t.length,1,t.length]}}n.clearMaybeInsertedClosing()}}),this.add("braces","deletion",function(a,b,c,e,f){var g=e.doc.getTextRange(f);if(!f.isMultiLine()&&"{"==g){l(c);var h=e.doc.getLine(f.start.row),i=h.substring(f.end.column,f.end.column+1);if("}"==i)return f.end.column++,f;d.maybeInsertedBrackets--}}),this.add("parens","insertion",function(a,b,c,d,e){if("("==e){l(c);var f=c.getSelectionRange(),g=d.doc.getTextRange(f);if(""!==g&&c.getWrapBehavioursEnabled())return m(f,g,"(",")");if(n.isSaneInsertion(c,d))return n.recordAutoInsert(c,d,")"),{text:"()",selection:[1,1]}}else if(")"==e){l(c);var h=c.getCursorPosition(),i=d.doc.getLine(h.row),j=i.substring(h.column,h.column+1);if(")"==j){var k=d.$findOpeningBracket(")",{column:h.column+1,row:h.row});if(null!==k&&n.isAutoInsertedClosing(h,i,e))return n.popAutoInsertedClosing(),{text:"",selection:[1,1]}}}}),this.add("parens","deletion",function(a,b,c,d,e){var f=d.doc.getTextRange(e);if(!e.isMultiLine()&&"("==f){l(c);var g=d.doc.getLine(e.start.row),h=g.substring(e.start.column+1,e.start.column+2);if(")"==h)return e.end.column++,e}}),this.add("brackets","insertion",function(a,b,c,d,e){if("["==e){l(c);var f=c.getSelectionRange(),g=d.doc.getTextRange(f);if(""!==g&&c.getWrapBehavioursEnabled())return m(f,g,"[","]");if(n.isSaneInsertion(c,d))return n.recordAutoInsert(c,d,"]"),{text:"[]",selection:[1,1]}}else if("]"==e){l(c);var h=c.getCursorPosition(),i=d.doc.getLine(h.row),j=i.substring(h.column,h.column+1);if("]"==j){var k=d.$findOpeningBracket("]",{column:h.column+1,row:h.row});if(null!==k&&n.isAutoInsertedClosing(h,i,e))return n.popAutoInsertedClosing(),{text:"",selection:[1,1]}}}}),this.add("brackets","deletion",function(a,b,c,d,e){var f=d.doc.getTextRange(e);if(!e.isMultiLine()&&"["==f){l(c);var g=d.doc.getLine(e.start.row),h=g.substring(e.start.column+1,e.start.column+2);if("]"==h)return e.end.column++,e}}),this.add("string_dquotes","insertion",function(a,b,c,d,e){if('"'==e||"'"==e){l(c);var f=e,g=c.getSelectionRange(),h=d.doc.getTextRange(g);if(""!==h&&"'"!==h&&'"'!=h&&c.getWrapBehavioursEnabled())return m(g,h,f,f);if(!h){var i=c.getCursorPosition(),j=d.doc.getLine(i.row),k=j.substring(i.column-1,i.column),n=j.substring(i.column,i.column+1),o=d.getTokenAt(i.row,i.column),p=d.getTokenAt(i.row,i.column+1);if("\\"==k&&o&&/escape/.test(o.type))return null;var q,r=o&&/string|escape/.test(o.type),s=!p||/string|escape/.test(p.type);if(n==f)q=r!==s;else{if(r&&!s)return null;if(r&&s)return null;var t=d.$mode.tokenRe;t.lastIndex=0;var u=t.test(k);t.lastIndex=0;var v=t.test(k);if(u||v)return null;if(n&&!/[\s;,.})\]\\]/.test(n))return null;q=!0}return{text:q?f+f:"",selection:[1,1]}}}}),this.add("string_dquotes","deletion",function(a,b,c,d,e){var f=d.doc.getTextRange(e);if(!e.isMultiLine()&&('"'==f||"'"==f)){l(c);var g=d.doc.getLine(e.start.row),h=g.substring(e.start.column+1,e.start.column+2);if(h==f)return e.end.column++,e}})};n.isSaneInsertion=function(a,b){var c=a.getCursorPosition(),d=new g(b,c.row,c.column);if(!this.$matchTokenType(d.getCurrentToken()||"text",i)){var e=new g(b,c.row,c.column+1);if(!this.$matchTokenType(e.getCurrentToken()||"text",i))return!1}return d.stepForward(),d.getCurrentTokenRow()!==c.row||this.$matchTokenType(d.getCurrentToken()||"text",j)},n.$matchTokenType=function(a,b){return b.indexOf(a.type||a)>-1},n.recordAutoInsert=function(a,b,c){var e=a.getCursorPosition(),f=b.doc.getLine(e.row);this.isAutoInsertedClosing(e,f,d.autoInsertedLineEnd[0])||(d.autoInsertedBrackets=0),d.autoInsertedRow=e.row,d.autoInsertedLineEnd=c+f.substr(e.column),d.autoInsertedBrackets++},n.recordMaybeInsert=function(a,b,c){var e=a.getCursorPosition(),f=b.doc.getLine(e.row);this.isMaybeInsertedClosing(e,f)||(d.maybeInsertedBrackets=0),d.maybeInsertedRow=e.row,d.maybeInsertedLineStart=f.substr(0,e.column)+c,d.maybeInsertedLineEnd=f.substr(e.column),d.maybeInsertedBrackets++},n.isAutoInsertedClosing=function(a,b,c){return d.autoInsertedBrackets>0&&a.row===d.autoInsertedRow&&c===d.autoInsertedLineEnd[0]&&b.substr(a.column)===d.autoInsertedLineEnd},n.isMaybeInsertedClosing=function(a,b){return d.maybeInsertedBrackets>0&&a.row===d.maybeInsertedRow&&b.substr(a.column)===d.maybeInsertedLineEnd&&b.substr(0,a.column)==d.maybeInsertedLineStart},n.popAutoInsertedClosing=function(){d.autoInsertedLineEnd=d.autoInsertedLineEnd.substr(1),d.autoInsertedBrackets--},n.clearMaybeInsertedClosing=function(){d&&(d.maybeInsertedBrackets=0,d.maybeInsertedRow=-1)},e.inherits(n,f),b.CstyleBehaviour=n}),ace.define("ace/mode/folding/cstyle",["require","exports","module","ace/lib/oop","ace/range","ace/mode/folding/fold_mode"],function(a,b,c){"use strict";var d=a("../../lib/oop"),e=a("../../range").Range,f=a("./fold_mode").FoldMode,g=b.FoldMode=function(a){a&&(this.foldingStartMarker=new RegExp(this.foldingStartMarker.source.replace(/\|[^|]*?$/,"|"+a.start)),this.foldingStopMarker=new RegExp(this.foldingStopMarker.source.replace(/\|[^|]*?$/,"|"+a.end)))};d.inherits(g,f),function(){this.foldingStartMarker=/(\{|\[)[^\}\]]*$|^\s*(\/\*)/,this.foldingStopMarker=/^[^\[\{]*(\}|\])|^[\s\*]*(\*\/)/,this.singleLineBlockCommentRe=/^\s*(\/\*).*\*\/\s*$/,this.tripleStarBlockCommentRe=/^\s*(\/\*\*\*).*\*\/\s*$/,this.startRegionRe=/^\s*(\/\*|\/\/)#?region\b/,this._getFoldWidgetBase=this.getFoldWidget,this.getFoldWidget=function(a,b,c){var d=a.getLine(c);if(this.singleLineBlockCommentRe.test(d)&&!this.startRegionRe.test(d)&&!this.tripleStarBlockCommentRe.test(d))return"";var e=this._getFoldWidgetBase(a,b,c);return!e&&this.startRegionRe.test(d)?"start":e},this.getFoldWidgetRange=function(a,b,c,d){var e=a.getLine(c);if(this.startRegionRe.test(e))return this.getCommentRegionBlock(a,e,c);var f=e.match(this.foldingStartMarker);if(f){var g=f.index;if(f[1])return this.openingBracketBlock(a,f[1],c,g);var h=a.getCommentFoldRange(c,g+f[0].length,1);return h&&!h.isMultiLine()&&(d?h=this.getSectionRange(a,c):"all"!=b&&(h=null)),h}if("markbegin"!==b){var f=e.match(this.foldingStopMarker);if(f){var g=f.index+f[0].length;return f[1]?this.closingBracketBlock(a,f[1],c,g):a.getCommentFoldRange(c,g,-1)}}},this.getSectionRange=function(a,b){var c=a.getLine(b),d=c.search(/\S/),f=b,g=c.length;b+=1;for(var h=b,i=a.getLength();++b<i;){c=a.getLine(b);var j=c.search(/\S/);if(-1!==j){if(d>j)break;var k=this.getFoldWidgetRange(a,"all",b);if(k){if(k.start.row<=f)break;if(k.isMultiLine())b=k.end.row;else if(d==j)break}h=b}}return new e(f,g,h,a.getLine(h).length)},this.getCommentRegionBlock=function(a,b,c){for(var d=b.search(/\s*$/),f=a.getLength(),g=c,h=/^\s*(?:\/\*|\/\/|--)#?(end)?region\b/,i=1;++c<f;){b=a.getLine(c);var j=h.exec(b);if(j&&(j[1]?i--:i++,!i))break}var k=c;return k>g?new e(g,d,k,b.length):void 0}}.call(g.prototype)}),ace.define("ace/mode/javascript",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/javascript_highlight_rules","ace/mode/matching_brace_outdent","ace/range","ace/worker/worker_client","ace/mode/behaviour/cstyle","ace/mode/folding/cstyle"],function(a,b,c){"use strict";var d=a("../lib/oop"),e=a("./text").Mode,f=a("./javascript_highlight_rules").JavaScriptHighlightRules,g=a("./matching_brace_outdent").MatchingBraceOutdent,h=(a("../range").Range,a("../worker/worker_client").WorkerClient),i=a("./behaviour/cstyle").CstyleBehaviour,j=a("./folding/cstyle").FoldMode,k=function(){this.HighlightRules=f,this.$outdent=new g,this.$behaviour=new i,this.foldingRules=new j};d.inherits(k,e),function(){this.lineCommentStart="//",this.blockComment={start:"/*",end:"*/"},this.getNextLineIndent=function(a,b,c){var d=this.$getIndent(b),e=this.getTokenizer().getLineTokens(b,a),f=e.tokens,g=e.state;if(f.length&&"comment"==f[f.length-1].type)return d;if("start"==a||"no_regex"==a){var h=b.match(/^.*(?:\bcase\b.*\:|[\{\(\[])\s*$/);h&&(d+=c)}else if("doc-start"==a){if("start"==g||"no_regex"==g)return"";var h=b.match(/^\s*(\/?)\*/);h&&(h[1]&&(d+=" "),d+="* ")}return d},this.checkOutdent=function(a,b,c){return this.$outdent.checkOutdent(b,c)},this.autoOutdent=function(a,b,c){this.$outdent.autoOutdent(b,c)},this.createWorker=function(a){var b=new h(["ace"],"ace/mode/javascript_worker","JavaScriptWorker");return b.attachToDocument(a.getDocument()),b.on("annotate",function(b){a.setAnnotations(b.data)}),b.on("terminate",function(){a.clearAnnotations()}),b},this.$id="ace/mode/javascript"}.call(k.prototype),b.Mode=k});