var ROUTES_INDEX = {"name":"<root>","kind":"module","className":"AppModule","children":[{"name":"routes","filename":"src/app/app-routing.module.ts","module":"AppRoutingModule","children":[{"path":"","component":"LoginComponent"},{"path":"e","component":"EmisionComponent","canActivate":["LoggedinGuard","OutboundSearchGuard"]},{"path":"r","component":"RecepcionComponent","canActivate":["LoggedinGuard","InboundSearchGuard"]},{"path":"r/:documentId","component":"RedirectorComponent"},{"path":"e/cargar","component":"CargafeComponent","canActivate":["LoggedinGuard","OutboundOperateGuard"]},{"path":"inicio","component":"InicioComponent","canActivate":["LoggedinGuard"],"runGuardsAndResolvers":"always"},{"path":"ajustes","component":"AjustesComponent","canActivate":["LoggedinGuard"]},{"path":"rastreador","component":"RastreadorComponent","canActivate":["LoggedinGuard","ShowTrackSearchGuard"]},{"path":"activarusuario","component":"ActivarUsuarioComponent"},{"path":"recordarcontrasena","component":"RecordarcontrasenaComponent"},{"path":"**","pathMatch":"full","redirectTo":""}],"kind":"module"}]}