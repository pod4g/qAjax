    
    
    /*
        原生ajax函数。用法与jquery ajax一致。
        author:pod4g
    */
    function ajax(opts){
         var xhr = new XMLHttpRequest(),// 获取ajax对象
             method = opts.type || "GET", // 默认是GET方式
             async = true, // 默认是异步
             cache = true, // 默认缓存ajax结果
             contentType = opts.contentType || 'application/x-www.form-urlencoded',// 默认是表单提交数据格式
             data = opts.data || {}, // 请求参数
             dataType = opts.dataType,
             type = function (arg){ 
                var t = typeof arg,s;
                if(t === 'object'){
                    if(arg === null){
                        return 'null';
                    }else{
                        s = Object.prototype.toString.call(arg);
                        return s.slice(8,-1).toLowerCase();
                    }
                }else{
                    return t;
                }
          };
         if(opts.async != undefined){
            async = opts.async;
         }
         var url = opts.url;
         if(opts.cache != undefined){
            cache = opts.cache;
         }
         if(!cache){
            if(url.indexOf('?') == -1){
                url += "?__my_ajax__="+new Date();
            }else{
                url += "&__my_ajax__="+new Date();
            }
         }
         console.log(opts);
         // 建立与服务端的连接
         xhr.open(method,opts.url,async);
         // 设置 POST 请求需要的header
         if(method.toUpperCase() === "POST"){
            xhr.setRequestHeader('Content-Type',contentType);
         }
         data = opts.data;
         if(data && type(data) == 'object'){
                data = (function(data){
                    var str = '',prop;
                    for(prop in data){
                        str += prop + "=" + data[prop] + "&";
                    }
                    if(dataType.toLowerCase() == "jsonp"){
                        str += opts.jsonp +"="+opts.jsonpCallback;
                    }
                    alert(str);
                    return str;
                })(data);
        }
         // 发送参数
         xhr.send(data);

         xhr.onreadystatechange = function(){
            if(xhr.readyState === 4){
                if(xhr.status === 200){
                      // dataType: 'jsonp',
                      // type: "GET",
                      // jsonp: 'cb',
                      // jsonpCallback: "cb99",
                    if(opts.success){
                        var arg = xhr.responseText;
                        if(contentType === "application/json"){
                            arg = JSON.parse(xhr.responseText)
                        }

                        opts.success(arg);
                    }
                }else{
                    if(opts.error){
                         opts.error({readyState:xhr.readyState,status:xhr.status});
                    }
                }
            }else{
                opts.error && opts.error({readyState:xhr.readyState,status:xhr.status});
            }
         }
    }
