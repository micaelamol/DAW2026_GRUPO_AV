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
                    <a href="index.html" data-type="index-link">backend documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search">
    <input type="text" placeholder="Type to search">
    <button type="button"
        class="search-input-clear"
        aria-label="Clear search"
        data-search-input-clear>&times;</button>
</div>
` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                                <li class="link">
                                    <a href="index.html" data-type="chapter-link">
                                        <span class="icon ion-ios-keypad"></span>Overview
                                    </a>
                                </li>

                                <li class="link">
                                    <a href="architecture.html" data-type="chapter-link">
                                        <span class="icon ion-ios-git-branch"></span>Architecture
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
                                            'data-bs-target="#controllers-links-module-AppModule-714c42cdb8c780e269eba1d28d6f65014e57f053092f6068841073447e6680e37e2d66785d23eacac2f2d04d1f3baba58bc67587e3c589be9a7c266452f63f88"' : 'data-bs-target="#xs-controllers-links-module-AppModule-714c42cdb8c780e269eba1d28d6f65014e57f053092f6068841073447e6680e37e2d66785d23eacac2f2d04d1f3baba58bc67587e3c589be9a7c266452f63f88"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-714c42cdb8c780e269eba1d28d6f65014e57f053092f6068841073447e6680e37e2d66785d23eacac2f2d04d1f3baba58bc67587e3c589be9a7c266452f63f88"' :
                                            'id="xs-controllers-links-module-AppModule-714c42cdb8c780e269eba1d28d6f65014e57f053092f6068841073447e6680e37e2d66785d23eacac2f2d04d1f3baba58bc67587e3c589be9a7c266452f63f88"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppModule-714c42cdb8c780e269eba1d28d6f65014e57f053092f6068841073447e6680e37e2d66785d23eacac2f2d04d1f3baba58bc67587e3c589be9a7c266452f63f88"' : 'data-bs-target="#xs-injectables-links-module-AppModule-714c42cdb8c780e269eba1d28d6f65014e57f053092f6068841073447e6680e37e2d66785d23eacac2f2d04d1f3baba58bc67587e3c589be9a7c266452f63f88"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-714c42cdb8c780e269eba1d28d6f65014e57f053092f6068841073447e6680e37e2d66785d23eacac2f2d04d1f3baba58bc67587e3c589be9a7c266452f63f88"' :
                                        'id="xs-injectables-links-module-AppModule-714c42cdb8c780e269eba1d28d6f65014e57f053092f6068841073447e6680e37e2d66785d23eacac2f2d04d1f3baba58bc67587e3c589be9a7c266452f63f88"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AuthModule-3818c85b83ea533dc0edad6adedde484cfaf4482065fe4462ff52c0cda2de9f9f688941860d586d16080397f665d02a7b4a2da462eb15727b6b5dc1efc697ccd"' : 'data-bs-target="#xs-controllers-links-module-AuthModule-3818c85b83ea533dc0edad6adedde484cfaf4482065fe4462ff52c0cda2de9f9f688941860d586d16080397f665d02a7b4a2da462eb15727b6b5dc1efc697ccd"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-3818c85b83ea533dc0edad6adedde484cfaf4482065fe4462ff52c0cda2de9f9f688941860d586d16080397f665d02a7b4a2da462eb15727b6b5dc1efc697ccd"' :
                                            'id="xs-controllers-links-module-AuthModule-3818c85b83ea533dc0edad6adedde484cfaf4482065fe4462ff52c0cda2de9f9f688941860d586d16080397f665d02a7b4a2da462eb15727b6b5dc1efc697ccd"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AuthModule-3818c85b83ea533dc0edad6adedde484cfaf4482065fe4462ff52c0cda2de9f9f688941860d586d16080397f665d02a7b4a2da462eb15727b6b5dc1efc697ccd"' : 'data-bs-target="#xs-injectables-links-module-AuthModule-3818c85b83ea533dc0edad6adedde484cfaf4482065fe4462ff52c0cda2de9f9f688941860d586d16080397f665d02a7b4a2da462eb15727b6b5dc1efc697ccd"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-3818c85b83ea533dc0edad6adedde484cfaf4482065fe4462ff52c0cda2de9f9f688941860d586d16080397f665d02a7b4a2da462eb15727b6b5dc1efc697ccd"' :
                                        'id="xs-injectables-links-module-AuthModule-3818c85b83ea533dc0edad6adedde484cfaf4482065fe4462ff52c0cda2de9f9f688941860d586d16080397f665d02a7b4a2da462eb15727b6b5dc1efc697ccd"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/MedicosModule.html" data-type="entity-link" >MedicosModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-MedicosModule-7e9af8c4b5bbcccc230ee81b96eb181a66b9da9af1a7addde2d88334356748f334425a291238f71eb5ed7c17947b9335d15f2339c4db24baab8466bca802a26e"' : 'data-bs-target="#xs-controllers-links-module-MedicosModule-7e9af8c4b5bbcccc230ee81b96eb181a66b9da9af1a7addde2d88334356748f334425a291238f71eb5ed7c17947b9335d15f2339c4db24baab8466bca802a26e"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-MedicosModule-7e9af8c4b5bbcccc230ee81b96eb181a66b9da9af1a7addde2d88334356748f334425a291238f71eb5ed7c17947b9335d15f2339c4db24baab8466bca802a26e"' :
                                            'id="xs-controllers-links-module-MedicosModule-7e9af8c4b5bbcccc230ee81b96eb181a66b9da9af1a7addde2d88334356748f334425a291238f71eb5ed7c17947b9335d15f2339c4db24baab8466bca802a26e"' }>
                                            <li class="link">
                                                <a href="controllers/MedicosController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MedicosController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-MedicosModule-7e9af8c4b5bbcccc230ee81b96eb181a66b9da9af1a7addde2d88334356748f334425a291238f71eb5ed7c17947b9335d15f2339c4db24baab8466bca802a26e"' : 'data-bs-target="#xs-injectables-links-module-MedicosModule-7e9af8c4b5bbcccc230ee81b96eb181a66b9da9af1a7addde2d88334356748f334425a291238f71eb5ed7c17947b9335d15f2339c4db24baab8466bca802a26e"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-MedicosModule-7e9af8c4b5bbcccc230ee81b96eb181a66b9da9af1a7addde2d88334356748f334425a291238f71eb5ed7c17947b9335d15f2339c4db24baab8466bca802a26e"' :
                                        'id="xs-injectables-links-module-MedicosModule-7e9af8c4b5bbcccc230ee81b96eb181a66b9da9af1a7addde2d88334356748f334425a291238f71eb5ed7c17947b9335d15f2339c4db24baab8466bca802a26e"' }>
                                        <li class="link">
                                            <a href="injectables/MedicosService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MedicosService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ReservasModule.html" data-type="entity-link" >ReservasModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-ReservasModule-952268049bf557fb8987be346a8f76c1f537e514e22bbc90651eece9a80b9ad2a737908aba641f45c449c43e705f65993667ec12e5a3137c0a25f74e65f848bf"' : 'data-bs-target="#xs-controllers-links-module-ReservasModule-952268049bf557fb8987be346a8f76c1f537e514e22bbc90651eece9a80b9ad2a737908aba641f45c449c43e705f65993667ec12e5a3137c0a25f74e65f848bf"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ReservasModule-952268049bf557fb8987be346a8f76c1f537e514e22bbc90651eece9a80b9ad2a737908aba641f45c449c43e705f65993667ec12e5a3137c0a25f74e65f848bf"' :
                                            'id="xs-controllers-links-module-ReservasModule-952268049bf557fb8987be346a8f76c1f537e514e22bbc90651eece9a80b9ad2a737908aba641f45c449c43e705f65993667ec12e5a3137c0a25f74e65f848bf"' }>
                                            <li class="link">
                                                <a href="controllers/ReservasController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ReservasController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-ReservasModule-952268049bf557fb8987be346a8f76c1f537e514e22bbc90651eece9a80b9ad2a737908aba641f45c449c43e705f65993667ec12e5a3137c0a25f74e65f848bf"' : 'data-bs-target="#xs-injectables-links-module-ReservasModule-952268049bf557fb8987be346a8f76c1f537e514e22bbc90651eece9a80b9ad2a737908aba641f45c449c43e705f65993667ec12e5a3137c0a25f74e65f848bf"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ReservasModule-952268049bf557fb8987be346a8f76c1f537e514e22bbc90651eece9a80b9ad2a737908aba641f45c449c43e705f65993667ec12e5a3137c0a25f74e65f848bf"' :
                                        'id="xs-injectables-links-module-ReservasModule-952268049bf557fb8987be346a8f76c1f537e514e22bbc90651eece9a80b9ad2a737908aba641f45c449c43e705f65993667ec12e5a3137c0a25f74e65f848bf"' }>
                                        <li class="link">
                                            <a href="injectables/ReservasService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ReservasService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/SeedModule.html" data-type="entity-link" >SeedModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-SeedModule-faa469c0e68d3d6130e2dece9b340d45f415285d077d34e845368b55c24a5df1bcb2b0816da8d3d7c75f74034a10e37ea7717125573c2420e84ac0dd5fb94308"' : 'data-bs-target="#xs-injectables-links-module-SeedModule-faa469c0e68d3d6130e2dece9b340d45f415285d077d34e845368b55c24a5df1bcb2b0816da8d3d7c75f74034a10e37ea7717125573c2420e84ac0dd5fb94308"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-SeedModule-faa469c0e68d3d6130e2dece9b340d45f415285d077d34e845368b55c24a5df1bcb2b0816da8d3d7c75f74034a10e37ea7717125573c2420e84ac0dd5fb94308"' :
                                        'id="xs-injectables-links-module-SeedModule-faa469c0e68d3d6130e2dece9b340d45f415285d077d34e845368b55c24a5df1bcb2b0816da8d3d7c75f74034a10e37ea7717125573c2420e84ac0dd5fb94308"' }>
                                        <li class="link">
                                            <a href="injectables/SeedService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SeedService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UsuariosModule.html" data-type="entity-link" >UsuariosModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-UsuariosModule-e756f61444b928fdc906973f743309597e36d44b9b956ca54913ed18f976ce525dfb16a0d7b0c33441feabbe04f4703a60ddb2566e6b24d5b84c33aaa0fbdb35"' : 'data-bs-target="#xs-controllers-links-module-UsuariosModule-e756f61444b928fdc906973f743309597e36d44b9b956ca54913ed18f976ce525dfb16a0d7b0c33441feabbe04f4703a60ddb2566e6b24d5b84c33aaa0fbdb35"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UsuariosModule-e756f61444b928fdc906973f743309597e36d44b9b956ca54913ed18f976ce525dfb16a0d7b0c33441feabbe04f4703a60ddb2566e6b24d5b84c33aaa0fbdb35"' :
                                            'id="xs-controllers-links-module-UsuariosModule-e756f61444b928fdc906973f743309597e36d44b9b956ca54913ed18f976ce525dfb16a0d7b0c33441feabbe04f4703a60ddb2566e6b24d5b84c33aaa0fbdb35"' }>
                                            <li class="link">
                                                <a href="controllers/UsuariosController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsuariosController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UsuariosModule-e756f61444b928fdc906973f743309597e36d44b9b956ca54913ed18f976ce525dfb16a0d7b0c33441feabbe04f4703a60ddb2566e6b24d5b84c33aaa0fbdb35"' : 'data-bs-target="#xs-injectables-links-module-UsuariosModule-e756f61444b928fdc906973f743309597e36d44b9b956ca54913ed18f976ce525dfb16a0d7b0c33441feabbe04f4703a60ddb2566e6b24d5b84c33aaa0fbdb35"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UsuariosModule-e756f61444b928fdc906973f743309597e36d44b9b956ca54913ed18f976ce525dfb16a0d7b0c33441feabbe04f4703a60ddb2566e6b24d5b84c33aaa0fbdb35"' :
                                        'id="xs-injectables-links-module-UsuariosModule-e756f61444b928fdc906973f743309597e36d44b9b956ca54913ed18f976ce525dfb16a0d7b0c33441feabbe04f4703a60ddb2566e6b24d5b84c33aaa0fbdb35"' }>
                                        <li class="link">
                                            <a href="injectables/UsuariosService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsuariosService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#controllers-links"' :
                                'data-bs-target="#xs-controllers-links"' }>
                                <span class="icon ion-md-swap"></span>
                                <span>Controllers</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="controllers-links"' : 'id="xs-controllers-links"' }>
                                <li class="link">
                                    <a href="controllers/AppController.html" data-type="entity-link" >AppController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/AuthController.html" data-type="entity-link" >AuthController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/MedicosController.html" data-type="entity-link" >MedicosController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/ReservasController.html" data-type="entity-link" >ReservasController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/UsuariosController.html" data-type="entity-link" >UsuariosController</a>
                                </li>
                            </ul>
                        </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#entities-links"' :
                                'data-bs-target="#xs-entities-links"' }>
                                <span class="icon ion-ios-apps"></span>
                                <span>Entities</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="entities-links"' : 'id="xs-entities-links"' }>
                                <li class="link">
                                    <a href="entities/MedicoEntity.html" data-type="entity-link" >MedicoEntity</a>
                                </li>
                                <li class="link">
                                    <a href="entities/MedicosEntity.html" data-type="entity-link" >MedicosEntity</a>
                                </li>
                                <li class="link">
                                    <a href="entities/ReservaEntity.html" data-type="entity-link" >ReservaEntity</a>
                                </li>
                                <li class="link">
                                    <a href="entities/UsuarioEntity.html" data-type="entity-link" >UsuarioEntity</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/CreateReservaDto.html" data-type="entity-link" >CreateReservaDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/LoginDto.html" data-type="entity-link" >LoginDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/LoginResponseDto.html" data-type="entity-link" >LoginResponseDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UsuarioResponseDto.html" data-type="entity-link" >UsuarioResponseDto</a>
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
                                    <a href="injectables/AppService.html" data-type="entity-link" >AppService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MedicosService.html" data-type="entity-link" >MedicosService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ReservasService.html" data-type="entity-link" >ReservasService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SeedService.html" data-type="entity-link" >SeedService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UsuariosService.html" data-type="entity-link" >UsuariosService</a>
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
                                <a href="guards/JwtAuthGuard.html" data-type="entity-link" >JwtAuthGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/RolesGuard.html" data-type="entity-link" >RolesGuard</a>
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
                                <a href="interfaces/AuthenticatedRequest.html" data-type="entity-link" >AuthenticatedRequest</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/JwtPayload.html" data-type="entity-link" >JwtPayload</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MedicosResponseDto.html" data-type="entity-link" >MedicosResponseDto</a>
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
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
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
