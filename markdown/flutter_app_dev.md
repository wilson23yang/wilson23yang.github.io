# 应用开发框架

[项目Github地址][https://github.com/wilson23yang/flutter_app_dev.git]

 模块可配置
 
 网络框架基于GRPC进行封装

 实时状态传送更新与持久化使用Redux
 
 资源文件引用使用脚本自动生成，加快开发
 
 

## 1.应用模块可配置
    主页应用模块可动态配置设整，增删模块可通过ModuleConfig进行配置，无需修改MainPage。
    
ModuleConfig配置示例如下：

```
///模块定义与配置
class ModuleConfig{
  ///首页
  static Module _home = Module(
    ModuleKey.home,
    name: StringWrapper((context) => MyLocalizations.of(context).home),
    desc: 'home',
    icon: ImageTheme.instance().nav_home_n,
    iconPress: ImageTheme.instance().nav_home_p,
    entrance: (context,{p1,p2,p3}) => HomePage(),
  );

  ///我的
  static Module _mine = Module(
    ModuleKey.mine,
    name: StringWrapper((context) => MyLocalizations.of(context).mime),
    desc: 'mine',
    icon: ImageTheme.instance().nav_my_n,
    iconPress: ImageTheme.instance().nav_my_p,
    entrance: (context,{p1,p2,p3}) => MyPage(),
  );


  ///app模块
  static List<Module> _modules = [_home, ... ,_mine];

  static const int initTabIndex = 0;

  ...

}

```

## 2.网络基于GRPC
    网络模块基于GRPC,并对GRPC请求与响应进行统一封装处理，调用简单方便
    
    a.GRPC请求与响应进行统一封装处理
        位于：lib/infrastructures/api/api_request.dart
        
        static Future<T> grpcFuture<T,K>({
            @required String tag, 
            @required GRPCCall grpcCall,
            @required GRPCRequest<K> request,GRPCResponse<T> response,
            bool printDebugLog = true,bool cancelDoubleCall = false
        }) async
        {
            ...
        }
        
    b.错误码统一定义与管理，可对共性错误码统一处理
    
    c.调用示例：
    ```
    Future<RegisterRes> register({
        @required String name,
        @required String password,
        @required String inviteCode
    }){
      return ApiRequest.grpcFuture(
        tag: 'register',
        request: () async {
          var pwd = Utf8Encoder().convert(password);
          var digest = md5.convert(pwd);
          return RegisterReq()..name=name
                  ..passwordMd5=hex.encode(digest.bytes)
                  ..parentCode=Int64(int.parse(inviteCode));
        },
        grpcCall: (request) => GRPCManager.getAccountNoAuthClient().register(request),
        response: ({rsp,headers}) => rsp,
      );
    }
    ```
    
    
            

## 3.资源管理
    资源管理包括：应用主题、颜色、图片、字符串常量、样式。【/lib/res】
    
    
    a.主题管理
        通过lib/res/theme_manager.dart  ThemeManager可切换应用主题，如白天黑夜模式
    
    b.图片
        将图片资源根据主题在ImageTheme中定义，然后通过lib/res/images/script.dart
        生成对应主题资源源文件供调用
    
    c.颜色
        将颜色资源根据主题在ColorTheme中定义，然后通过lib/res/colors/script.dart
        生成对应主题资源源文件供调用
    
    d.样式
        页面样式按功能模块统一管理
    
    e.字符串常量及国际化
        /lib/res/localizations
    


## 4.redux之实时状态传送更新与持久化











[https://github.com/wilson23yang/flutter_app_dev.git]: https://github.com/wilson23yang/flutter_app_dev.git