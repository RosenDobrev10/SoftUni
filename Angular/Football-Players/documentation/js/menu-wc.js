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
                    <a href="index.html" data-type="index-link">football-Players documentation</a>
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
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-AppModule-61f96c255089d53c821b2409473935d4b0585e3a06f0b8ab7d780d3f5f47413e8feb4d457a160586e0f3030d993fc835e475511505251edcd93169efb5ec552e"' : 'data-bs-target="#xs-components-links-module-AppModule-61f96c255089d53c821b2409473935d4b0585e3a06f0b8ab7d780d3f5f47413e8feb4d457a160586e0f3030d993fc835e475511505251edcd93169efb5ec552e"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-61f96c255089d53c821b2409473935d4b0585e3a06f0b8ab7d780d3f5f47413e8feb4d457a160586e0f3030d993fc835e475511505251edcd93169efb5ec552e"' :
                                            'id="xs-components-links-module-AppModule-61f96c255089d53c821b2409473935d4b0585e3a06f0b8ab7d780d3f5f47413e8feb4d457a160586e0f3030d993fc835e475511505251edcd93169efb5ec552e"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link" >AppRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-AuthModule-5d09446717bd0a4de0f22d997f328c9cf6f0ab2597c2cb5221afaee1d6371e7f1f9f0026c65d5e65f80085d8d9b8b929194f8af8b5edba140ed684d061bc7559"' : 'data-bs-target="#xs-components-links-module-AuthModule-5d09446717bd0a4de0f22d997f328c9cf6f0ab2597c2cb5221afaee1d6371e7f1f9f0026c65d5e65f80085d8d9b8b929194f8af8b5edba140ed684d061bc7559"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AuthModule-5d09446717bd0a4de0f22d997f328c9cf6f0ab2597c2cb5221afaee1d6371e7f1f9f0026c65d5e65f80085d8d9b8b929194f8af8b5edba140ed684d061bc7559"' :
                                            'id="xs-components-links-module-AuthModule-5d09446717bd0a4de0f22d997f328c9cf6f0ab2597c2cb5221afaee1d6371e7f1f9f0026c65d5e65f80085d8d9b8b929194f8af8b5edba140ed684d061bc7559"' }>
                                            <li class="link">
                                                <a href="components/LoginComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LoginComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ProfileComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProfileComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RegisterComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RegisterComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthRoutingModule.html" data-type="entity-link" >AuthRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/CoreModule.html" data-type="entity-link" >CoreModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/FeaturesModule.html" data-type="entity-link" >FeaturesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-FeaturesModule-a138a3d8ee8e885a4f381a893362bda1e5a9a0d4ef94a8b437154ac79af9f47a1f0b4a1d8ce4e5927d1097e164f56c34aec4653e674c91d59130c52ff911d2e0"' : 'data-bs-target="#xs-components-links-module-FeaturesModule-a138a3d8ee8e885a4f381a893362bda1e5a9a0d4ef94a8b437154ac79af9f47a1f0b4a1d8ce4e5927d1097e164f56c34aec4653e674c91d59130c52ff911d2e0"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-FeaturesModule-a138a3d8ee8e885a4f381a893362bda1e5a9a0d4ef94a8b437154ac79af9f47a1f0b4a1d8ce4e5927d1097e164f56c34aec4653e674c91d59130c52ff911d2e0"' :
                                            'id="xs-components-links-module-FeaturesModule-a138a3d8ee8e885a4f381a893362bda1e5a9a0d4ef94a8b437154ac79af9f47a1f0b4a1d8ce4e5927d1097e164f56c34aec4653e674c91d59130c52ff911d2e0"' }>
                                            <li class="link">
                                                <a href="components/HomeComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HomeComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NotFoundComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NotFoundComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/PlayersModule.html" data-type="entity-link" >PlayersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-PlayersModule-b9ad66c2af3b0bbb3eafd9a373ae4c44aa14d1bd2f74a48e0df955e077a9b06129b76cfcd08805594e6fc67f24ff278e070fff2a65c3015d06cc64657dd466eb"' : 'data-bs-target="#xs-components-links-module-PlayersModule-b9ad66c2af3b0bbb3eafd9a373ae4c44aa14d1bd2f74a48e0df955e077a9b06129b76cfcd08805594e6fc67f24ff278e070fff2a65c3015d06cc64657dd466eb"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-PlayersModule-b9ad66c2af3b0bbb3eafd9a373ae4c44aa14d1bd2f74a48e0df955e077a9b06129b76cfcd08805594e6fc67f24ff278e070fff2a65c3015d06cc64657dd466eb"' :
                                            'id="xs-components-links-module-PlayersModule-b9ad66c2af3b0bbb3eafd9a373ae4c44aa14d1bd2f74a48e0df955e077a9b06129b76cfcd08805594e6fc67f24ff278e070fff2a65c3015d06cc64657dd466eb"' }>
                                            <li class="link">
                                                <a href="components/CatalogComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CatalogComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CreateComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CreateComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DetailsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DetailsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EditComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EditComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SearchComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SearchComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/PlayersRoutingModule.html" data-type="entity-link" >PlayersRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/SharedModule.html" data-type="entity-link" >SharedModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-SharedModule-3a9f755a5a7fe479a9b30cea06c09a2f9fa1995ad7b526c99da9ab76afdf60c1bf8941a2e98f56c93daebbe091f982d0a4ecd5a1d35e861671928c2fec20ffd2"' : 'data-bs-target="#xs-components-links-module-SharedModule-3a9f755a5a7fe479a9b30cea06c09a2f9fa1995ad7b526c99da9ab76afdf60c1bf8941a2e98f56c93daebbe091f982d0a4ecd5a1d35e861671928c2fec20ffd2"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SharedModule-3a9f755a5a7fe479a9b30cea06c09a2f9fa1995ad7b526c99da9ab76afdf60c1bf8941a2e98f56c93daebbe091f982d0a4ecd5a1d35e861671928c2fec20ffd2"' :
                                            'id="xs-components-links-module-SharedModule-3a9f755a5a7fe479a9b30cea06c09a2f9fa1995ad7b526c99da9ab76afdf60c1bf8941a2e98f56c93daebbe091f982d0a4ecd5a1d35e861671928c2fec20ffd2"' }>
                                            <li class="link">
                                                <a href="components/FooterComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FooterComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HeaderComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HeaderComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LoaderComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LoaderComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PlayerComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PlayerComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PlayerService.html" data-type="entity-link" >PlayerService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserService.html" data-type="entity-link" >UserService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interceptors-links"' :
                            'data-bs-target="#xs-interceptors-links"' }>
                            <span class="icon ion-ios-swap"></span>
                            <span>Interceptors</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="interceptors-links"' : 'id="xs-interceptors-links"' }>
                            <li class="link">
                                <a href="interceptors/AddHeaderInterceptor.html" data-type="entity-link" >AddHeaderInterceptor</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#guards-links"' :
                            'data-bs-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/isGuestGuard.html" data-type="entity-link" >isGuestGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/isLoggedGuard.html" data-type="entity-link" >isLoggedGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/IPlayer.html" data-type="entity-link" >IPlayer</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IUser.html" data-type="entity-link" >IUser</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
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
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});