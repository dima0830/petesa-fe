'use strict';


customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">portalfe documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link">AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-5f6c3135a0754e858deadf2fb5c3b378"' : 'data-target="#xs-components-links-module-AppModule-5f6c3135a0754e858deadf2fb5c3b378"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-5f6c3135a0754e858deadf2fb5c3b378"' :
                                            'id="xs-components-links-module-AppModule-5f6c3135a0754e858deadf2fb5c3b378"' }>
                                            <li class="link">
                                                <a href="components/ActivarUsuarioComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ActivarUsuarioComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AjustesComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AjustesComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AppComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BarrasComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BarrasComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BuscadorEmisionComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BuscadorEmisionComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BuscadorRastreadorComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BuscadorRastreadorComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BuscadorRecepcionComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BuscadorRecepcionComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CargafeComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CargafeComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EmisionComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">EmisionComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EmisionfComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">EmisionfComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FilasComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FilasComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/InfopieComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">InfopieComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/InicioComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">InicioComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LibraryComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LibraryComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LineasComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LineasComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LoginComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LoginComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/Navbar0Component.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">Navbar0Component</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NavbarComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">NavbarComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PdfviewerComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PdfviewerComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PieComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PieComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PrecargaComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PrecargaComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RastreadorComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">RastreadorComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RecepcionComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">RecepcionComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RecordarcontrasenaComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">RecordarcontrasenaComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RedirectorComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">RedirectorComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/StatusComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">StatusComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SwitchCompanyComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SwitchCompanyComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TarjetasComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TarjetasComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UsuariosComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">UsuariosComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#pipes-links-module-AppModule-5f6c3135a0754e858deadf2fb5c3b378"' : 'data-target="#xs-pipes-links-module-AppModule-5f6c3135a0754e858deadf2fb5c3b378"' }>
                                            <span class="icon ion-md-add"></span>
                                            <span>Pipes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="pipes-links-module-AppModule-5f6c3135a0754e858deadf2fb5c3b378"' :
                                            'id="xs-pipes-links-module-AppModule-5f6c3135a0754e858deadf2fb5c3b378"' }>
                                            <li class="link">
                                                <a href="pipes/CounterPipe.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CounterPipe</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link">AppRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AyudaModule.html" data-type="entity-link">AyudaModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AyudaModule-c23f0ea23de89cb523399811a9aaafac"' : 'data-target="#xs-components-links-module-AyudaModule-c23f0ea23de89cb523399811a9aaafac"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AyudaModule-c23f0ea23de89cb523399811a9aaafac"' :
                                            'id="xs-components-links-module-AyudaModule-c23f0ea23de89cb523399811a9aaafac"' }>
                                            <li class="link">
                                                <a href="components/AyudaComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AyudaComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ContenidoAyudaComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ContenidoAyudaComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/IndiceComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">IndiceComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AyudaRoutingModule.html" data-type="entity-link">AyudaRoutingModule</a>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/Counter.html" data-type="entity-link">Counter</a>
                            </li>
                            <li class="link">
                                <a href="classes/VisibilidadBuscador.html" data-type="entity-link">VisibilidadBuscador</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/ActivarUsuarioService.html" data-type="entity-link">ActivarUsuarioService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AnaliticaService.html" data-type="entity-link">AnaliticaService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/BorrarSoportesService.html" data-type="entity-link">BorrarSoportesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CambiarEstadoService.html" data-type="entity-link">CambiarEstadoService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CargafeService.html" data-type="entity-link">CargafeService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CargarSoportesService.html" data-type="entity-link">CargarSoportesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ChangePasswordService.html" data-type="entity-link">ChangePasswordService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CheckpermService.html" data-type="entity-link">CheckpermService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CheckTrackidService.html" data-type="entity-link">CheckTrackidService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DataTransportService.html" data-type="entity-link">DataTransportService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DescargaFilesService.html" data-type="entity-link">DescargaFilesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/EntregafeService.html" data-type="entity-link">EntregafeService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FilterDocument.html" data-type="entity-link">FilterDocument</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FiltrarEmisionService.html" data-type="entity-link">FiltrarEmisionService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FiltrarRecepcionService.html" data-type="entity-link">FiltrarRecepcionService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FiltroTrackService.html" data-type="entity-link">FiltroTrackService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/GetHelpService.html" data-type="entity-link">GetHelpService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/GetResultsFileService.html" data-type="entity-link">GetResultsFileService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/GlobalsService.html" data-type="entity-link">GlobalsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/GoogleAnalyticsService.html" data-type="entity-link">GoogleAnalyticsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LoginService.html" data-type="entity-link">LoginService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LoginService-1.html" data-type="entity-link">LoginService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/NotificationsService.html" data-type="entity-link">NotificationsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PagerService.html" data-type="entity-link">PagerService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RecordarContrasenaService.html" data-type="entity-link">RecordarContrasenaService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ResetPwdService.html" data-type="entity-link">ResetPwdService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ServiciopruebaService.html" data-type="entity-link">ServiciopruebaService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TrackDocumentsService.html" data-type="entity-link">TrackDocumentsService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#guards-links"' :
                            'data-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/AdminGuard.html" data-type="entity-link">AdminGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/InboundOperateGuard.html" data-type="entity-link">InboundOperateGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/InboundSearchGuard.html" data-type="entity-link">InboundSearchGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/LoggedinGuard.html" data-type="entity-link">LoggedinGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/OutboundOperateGuard.html" data-type="entity-link">OutboundOperateGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/OutboundSearchGuard.html" data-type="entity-link">OutboundSearchGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/ShowTrackSearchGuard.html" data-type="entity-link">ShowTrackSearchGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/Pdf.html" data-type="entity-link">Pdf</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});