(this["webpackJsonpcterm-for-react"]=this["webpackJsonpcterm-for-react"]||[]).push([[0],{21:function(e,t,n){"use strict";n.r(t);var i=n(2),r=n(11),a=n.n(r),l=n(15),s=n(14),c=n(12),h=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"";return n&&t[n]&&(e[n]=t[n]),e[n]},o=n(4),d=n(9),u=n(10),f=function(){function e(t){Object(d.a)(this,e),this.name="",t.length>0&&(this.name=t),this.contents=""}return Object(u.a)(e,[{key:"addContents",value:function(e){this.contents=e}}]),e}(),m=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";Object(d.a)(this,e),this.name="",this.childFiles=[],this.childFolders=[],this.childLength=0,t&&(this.name=t)}return Object(u.a)(e,[{key:"appendChildFile",value:function(e){if(!(this.childLength<6))return new Error("cannot create new file or folder. this directory limited 5 child which is sum of all files and folders");if(this.childFiles.includes(e)||this.childFolders.includes(e))return new Error("filename is already exist. try another filename.");var t=new f(e);this.childFiles.push(t),this.childLength++}},{key:"appendChildFolder",value:function(t){if(!(this.childLength<6))return new Error("cannot create new file or folder. this directory limited 5 child which is sum of all files and folders");if(this.childFiles.includes(t)||this.childFolders.includes(t))return new Error("folder name is already exist. try another folder name.");var n=new e(t);this.childFolders.push(n),this.childLength++}},{key:"deleteChildFile",value:function(e){var t,n,i=[],r=!1,a=Object(o.a)(this.childFiles);try{for(a.s();!(n=a.n()).done;){var l=n.value;l.name!==e?i.push(l):(r=!0,t=l)}}catch(s){a.e(s)}finally{a.f()}return r?(this.childFiles=i,t):new Error('cannot find the file named "'.concat(e,'"'))}},{key:"deleteChildFolder",value:function(e){var t,n,i=[],r=!1,a=Object(o.a)(this.childFolders);try{for(a.s();!(n=a.n()).done;){var l=n.value;l.name!==e?i.push(l):(r=!0,t=l)}}catch(s){a.e(s)}finally{a.f()}return r?0===t.childLength?(this.childFiles=i,t):void new Error("cannot delete this folder. it's not empty."):new Error('cannot find the file named "'.concat(e,'"'))}}]),e}(),v=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"codestates";return new m(e)},g=(n(13),n(1)),b=v("/");var w=function(e){var t=function(e){for(var t=window.location.search.substring(1).split("&"),n=0;n<t.length;n++){var i=t[n].split("=");return i[0]===e&&console.log(i[1]),i[1]}},n=function(e){return void 0===e.path&&(e.path=[v("home"),v(e.githubUserName)]),0===e.dirPath.length&&(e.dirPath=["home",e.githubUserName]),e}(function(e){var t={name:"",userId:"",email:"",githubId:"",githubUserName:""};for(var n in t)t[n]=h(t,e,n);return""===t.name&&(t.name="codestates"),""===t.githubUserName&&(t.githubUserName="codestates"),void 0===t.dirPath&&(t.dirPath=[]),t}(e)),r=function(e){if(i=n.githubUserName,r=n.dirPath,Array.isArray(r)&&r.length>1&&"/"+r[0]+"/"+r[1]==="/home/".concat(i)){var t=Object(s.a)(n.dirPath);return t.shift(),t.shift(),"~"+t.join("/")}var i,r;return b.name+n.dirPath.join("/")},a=Object(i.useRef)(null),o=Object(i.useState)(""),d=Object(l.a)(o,2),u=d[0],f=d[1],m=function(){a.current.terminal.write("\r\n"+r()+"$ ")},w=function(){return["".concat(arguments.length>0&&void 0!==arguments[0]?arguments[0]:"codestates","\ub2d8 \ubc18\uac11\uc2b5\ub2c8\ub2e4."),"Linux & CLI \uc2e4\uc2b5\uc744 \uc704\ud55c Interactive web tutorial\uc5d0 \uc624\uc2e0 \uac83\uc744 \ud658\uc601\ud569\ub2c8\ub2e4.","\uc774 \ud29c\ud1a0\ub9ac\uc5bc\uc740 \uc624\ub85c\uc9c0 \ucf54\ub4dc\uc2a4\ud14c\uc774\uce20 \uc218\uac15\uc0dd\uc744 \uc704\ud574 \ub9cc\ub4e4\uc5b4\uc84c\uc2b5\ub2c8\ub2e4.","\uc9c0\uae08\ubd80\ud130 Linux & CLI \uc2e4\uc2b5\uc744 \uc2dc\uc791\ud569\ub2c8\ub2e4."].join("\r\n")}();return Object(i.useEffect)((function(){a.current.terminal.writeln(w),m()}),[]),Object(g.jsxs)(g.Fragment,{children:[console.log("email=",t("email"),"username=",t("username")),Object(g.jsx)(c.a,{ref:a,onKey:function(e){var t=e.domEvent.key;if("Enter"===t)f(""),m();else if("Backspace"===t){if(u.length>0){var n=u.split("");n.pop(),n=n.join(""),f(n),a.current.terminal.write("\b \b")}}else f(u+t),a.current.terminal.write(t)}}),";"]})};a.a.render(Object(g.jsx)(w,{}),document.getElementById("root"))}},[[21,1,2]]]);
//# sourceMappingURL=main.a8b9b074.chunk.js.map