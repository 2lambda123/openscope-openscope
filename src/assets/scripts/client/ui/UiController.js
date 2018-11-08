import $ from 'jquery';
import _keys from 'lodash/keys';
import AirportController from '../airport/AirportController';
import EventBus from '../lib/EventBus';
import GameController from '../game/GameController';
import TutorialView from './TutorialView';
import { speech_toggle } from '../speech';
import { EVENT } from '../constants/eventNames';
import { INVALID_NUMBER } from '../constants/globalConstants';
import { SELECTORS } from '../constants/selectors';

/**
 * @class UiController
 */
class UiController {
    /**
     * @constructor
     */
    constructor() {
        this._eventBus = null;
        this.tutorialView = null;

        this.$element = null;
        this.$airportDialog = null;
        this.$airportList = null;
        this.$fastForwards = null;
        this.$pauseToggle = null;
        this.$pausedImg = null;
        this.$speechToggle = null;
        this.$switchAirport = null;
        this.$toggleLabels = null;
        this.$toggleRestrictedAreas = null;
        this.$toggleSids = null;
        this.$toggleStars = null;
        this.$toggleTerrain = null;
        this.$toggleTutorial = null;
        this.$toggleOptions = null;
        this.$toggleVideoMap = null;
    }

    /**
     * Initialization method
     *
     * Called from the `AppController` after instantiation of the `AircraftController`
     *
     * @for UiController
     * @method init
     * @param $element {jQuery Element}
     */
    init($element) {
        this._eventBus = EventBus;
        this.tutorialView = new TutorialView($element);

        this.$element = $element;
        this.$airportDialog = this.$element.find(SELECTORS.DOM_SELECTORS.AIRPORT_SWITCH);
        this.$airportList = this.$element.find(SELECTORS.DOM_SELECTORS.AIRPORT_LIST);
        this.$fastForwards = this.$element.find(SELECTORS.DOM_SELECTORS.FAST_FORWARDS);
        this.$pauseToggle = this.$element.find(SELECTORS.DOM_SELECTORS.PAUSE_TOGGLE);
        this.$pausedImg = this.$element.find(`${SELECTORS.DOM_SELECTORS.PAUSED} img`);
        this.$speechToggle = this.$element.find(SELECTORS.DOM_SELECTORS.SPEECH_TOGGLE);
        this.$switchAirport = this.$element.find(SELECTORS.DOM_SELECTORS.SWITCH_AIRPORT);
        this.$toggleLabels = this.$element.find(SELECTORS.DOM_SELECTORS.TOGGLE_LABELS);
        this.$toggleRestrictedAreas = this.$element.find(SELECTORS.DOM_SELECTORS.TOGGLE_RESTRICTED_AREAS);
        this.$toggleSids = this.$element.find(SELECTORS.DOM_SELECTORS.TOGGLE_SIDS);
        this.$toggleStars = this.$element.find(SELECTORS.DOM_SELECTORS.TOGGLE_STARS);
        this.$toggleTerrain = this.$element.find(SELECTORS.DOM_SELECTORS.TOGGLE_TERRAIN);
        this.$toggleTutorial = this.$element.find(SELECTORS.DOM_SELECTORS.TOGGLE_TUTORIAL);
        this.$toggleOptions = this.$element.find(SELECTORS.DOM_SELECTORS.TOGGLE_OPTIONS);
        this.$toggleVideoMap = this.$element.find(SELECTORS.DOM_SELECTORS.TOGGLE_VIDEO_MAP);

        return this.setupHandlers()
            .enable();
    }

    /**
     * @for UiController
     * @method setupHandlers
     * @chainable
     */
    setupHandlers() {
        return this;
    }

    /**
     * Enable event handlers
     *
     * should be run only once on instantiation
     *
     * @for UiController
     * @method enable
     */
    enable() {
        this.$fastForwards.on('click', (event) => GameController.game_timewarp_toggle(event));
        this.$pauseToggle.on('click', (event) => GameController.game_pause_toggle(event));
        this.$pausedImg.on('click', (event) => GameController.game_unpause(event));

        this.$speechToggle.on('click', (event) => speech_toggle(event));
        this.$switchAirport.on('click', (event) => this.onToggleAirportList(event));
        this.$toggleLabels.on('click', (event) => this.onToggleLabels(event));
        this.$toggleRestrictedAreas.on('click', (event) => this.onToggleRestrictedAreas(event));
        this.$toggleSids.on('click', (event) => this.onToggleSids(event));
        this.$toggleStars.on('click', (event) => this.onToggleStars(event));
        this.$toggleTerrain.on('click', (event) => this.onToggleTerrain(event));
        this.$toggleTutorial.on('click', (event) => this._eventBus.trigger(EVENT.TOGGLE_TUTORIAL, event));
        this.$toggleOptions.on('click', (event) => this.onToggleOptions(event));
        this.$toggleVideoMap.on('click', (event) => this.onToggleVideoMap(event));

        return this;
    }

    /**
     * Disable event handlers
     *
     * @for UiController
     * @method disable
     */
    disable() {
        this.$fastForwards.off('click', (event) => GameController.game_timewarp_toggle(event));
        this.$pauseToggle.off('click', (event) => GameController.game_pause_toggle(event));
        this.$pausedImg.off('click', (event) => GameController.game_unpause(event));

        this.$speechToggle.off('click', (event) => speech_toggle(event));
        this.$switchAirport.off('click', (event) => this.onToggleAirportList(event));
        this.$toggleLabels.off('click', (event) => this.onToggleLabels(event));
        this.$toggleRestrictedAreas.off('click', (event) => this.onToggleRestrictedAreas(event));
        this.$toggleSids.off('click', (event) => this.onToggleSids(event));
        this.$toggleStars.off('click', (event) => this.onToggleStars(event));
        this.$toggleTerrain.off('click', (event) => this.onToggleTerrain(event));
        this.$toggleTutorial.off('click', (event) => this._eventBus.trigger(EVENT.TOGGLE_TUTORIAL, event));
        this.$toggleOptions.off('click', (event) => this.onToggleOptions(event));
        this.$toggleVideoMap.off('click', (event) => this.onToggleVideoMap(event));

        return this.destroy();
    }

    /**
     * Tear down the instance
     *
     * @for UiController
     * @method destroy
     */
    destroy() {
        this._eventBus = null;
        this.tutorialView = null;
        this.ui = {};
        this.ui.scale = INVALID_NUMBER;

        this.$element = null;
        this.$airportDialog = null;
        this.$airportList = null;
        this.$fastForwards = null;
        this.$pauseToggle = null;
        this.$pausedImg = null;
        this.$speechToggle = null;
        this.$switchAirport = null;
        this.$toggleLabels = null;
        this.$toggleRestrictedAreas = null;
        this.$toggleSids = null;
        this.$toggleStars = null;
        this.$toggleTerrain = null;
        this.$toggleTutorial = null;
        this.$toggleOptions = null;
        this.$toggleVideoMap = null;

        return this;
    }

    /**
     * @for uiController
     * @method ui_init
     */
    ui_init() {
        this.tutorialView.tutorial_init_pre();
        this.$fastForwards.prop('title', 'Set time warp to 2');
        // TODO: Make the options dialog findable by ID, not just by class
        this.$optionsDialog = this.$element.find(SELECTORS.DOM_SELECTORS.OPTIONS_DIALOG);
    }

    /**
     * Close all open dialogs and return focus to the command bar
     *
     * @for UiController
     * @method closeAllDialogs
     */
    closeAllDialogs() {
        if (this.isTutorialDialogOpen()) {
            this.tutorialView.tutorial_close();
        }

        if (this.isOptionsDialogOpen()) {
            this.onToggleOptions();
        }

        if (this.isAirportSelectionDialogOpen()) {
            this.onToggleAirportList();
        }
    }

    /**
     * Returns whether the airport selection dialog is open
     *
     * @for UiController
     * @method isAirportSelectionDialogOpen
     * @return {boolean}
     */
    isAirportSelectionDialogOpen() {
        return this.$airportDialog.hasClass(SELECTORS.CLASSNAMES.OPEN);
    }

    /**
     * Returns whether the airport selection dialog is open
     *
     * @for UiController
     * @method isOptionsDialogOpen
     * @return {boolean}
     */
    isOptionsDialogOpen() {
        return this.$optionsDialog.hasClass(SELECTORS.CLASSNAMES.OPEN);
    }

    /**
     * Returns whether the tutorial dialog is open
     *
     * @for UiController
     * @method isTutorialDialogOpen
     * @return {boolean}
     */
    isTutorialDialogOpen() {
        return this.$toggleTutorial.hasClass(SELECTORS.CLASSNAMES.ACTIVE);
    }

    /**
     * @for uiController
     * @method onClickAirportListItemHandler
     * @paam event {jquery event}
     */
    onClickAirportListItemHandler(event) {
        if (event.data !== AirportController.airport_get().icao) {
            AirportController.airport_set(event.data);
            this._onClickCloseAirportDialog();
        }
    }

    /**
     * @for UiController
     * @method ui_complete
     */
    ui_complete() {
        this._buildAirportList();
    }

    /**
     * Loop through each airport defined in the `AirportController` and build
     * a list item that can be appended to the #airport-list element.
     *
     * @for UiController
     * @method _buildAirportList
     * @private
     */
    _buildAirportList() {
        // clear out the contents of this element
        this.$airportList.empty();

        const airports = _keys(AirportController.airports).sort();
        let difficulty = '';

        for (let i = 0; i < airports.length; i++) {
            const { name, icao, level } = AirportController.airports[airports[i]];

            difficulty = this._buildAirportListIconForDifficultyLevel(level);
            const $airportListItem = $(this._buildAirportListItemTemplate(icao, difficulty, name));

            // TODO: replace with an onClick() handler
            $airportListItem.click(icao.toLowerCase(), (event) => {
                if (event.data !== AirportController.airport_get().icao) {
                    AirportController.airport_set(event.data);

                    this._onClickCloseAirportDialog();
                }
            });

            this.$airportList.append($airportListItem);
        }
    }

    /**
     * Given a `difficultyLevel`, create a string with the correct icon char code
     * that can be used in the airport list
     *
     * @for UiController
     * @method _buildAirportListIconForDifficultyLevel
     * @param difficultyLevel {string}
     * @return difficulty {string}
     * @private
     */
    _buildAirportListIconForDifficultyLevel(difficultyLevel) {
        let difficulty;
        const icon = '&#9992;';

        switch (difficultyLevel) {
            case 'beginner':
                difficulty = icon;
                break;
            case 'easy':
                difficulty = icon.repeat(2);
                break;
            case 'medium':
                difficulty = icon.repeat(3);
                break;
            case 'hard':
                difficulty = icon.repeat(4);
                break;
            case 'expert':
                difficulty = icon.repeat(5);
                break;
            default:
                difficulty = '?';
                break;
        }

        return difficulty;
    }

    /**
     * @for uiController
     * @method _buildAirportListItemTemplate
     * @param icao {string}
     * @param difficulty {string}
     * @param name {string}
     * @return {DOM element|string}
     */
    _buildAirportListItemTemplate(icao, difficulty, name) {
        return `<li class="airport-list-item icao-${icao.toLowerCase()}">` +
                    `<span style="font-size: 7pt" class="difficulty">${difficulty}</span>` +
                    `<span class="icao">${icao.toUpperCase()}</span>` +
                    `<span class="name">${name}</span>` +
                '</li>';
    }

    /**
     * @for UiController
     * @method ui_log
     */
    ui_log(message, warn = false) {
        const html = $(`<span class="item"><span class="message">${message}</span></span>`);

        if (warn) {
            html.addClass(SELECTORS.CLASSNAMES.WARN);
        }

        const $log = $(SELECTORS.DOM_SELECTORS.LOG);
        $log.append(html);
        $log.scrollTop($log.get(0).scrollHeight);

        GameController.game_timeout((uiLogView) => {
            uiLogView.addClass(SELECTORS.CLASSNAMES.HIDDEN);

            setTimeout(() => {
                uiLogView.remove();
            }, 10000);
        }, 3, window, html);
    }

    /**
     * @for UiController
     * @method _onClickOpenAirportDialog
     */
    _onClickOpenAirportDialog() {
        this.$airportDialog.addClass(SELECTORS.CLASSNAMES.OPEN);

        const $previousActiveAirport = this.$airportList.find(SELECTORS.DOM_SELECTORS.AIRPORT_LIST_ITEM_IS_ACTIVE);

        // Remove the active class from a no-longer-selected airport in the list.
        if ($previousActiveAirport.length !== 0) {
            $previousActiveAirport.removeClass(SELECTORS.CLASSNAMES.AIRPORT_LIST_ITEM_IS_ACTIVE);
        }

        const icao = AirportController.airport_get().icao.toLowerCase();
        $(`.icao-${icao}`).addClass(SELECTORS.CLASSNAMES.AIRPORT_LIST_ITEM_IS_ACTIVE);

        this.$switchAirport.addClass(SELECTORS.CLASSNAMES.ACTIVE);
    }

    /**
     * @for UiController
     * @method _onClickCloseAirportDialog
     * @private
     */
    _onClickCloseAirportDialog() {
        this.$airportDialog.removeClass(SELECTORS.CLASSNAMES.OPEN);
        this.$switchAirport.removeClass(SELECTORS.CLASSNAMES.ACTIVE);
    }

    /**
     * @for UiController
     * @method onToggleAirportList
     */
    onToggleAirportList() {
        if (this.$airportDialog.hasClass(SELECTORS.CLASSNAMES.OPEN)) {
            this._onClickCloseAirportDialog();

            return;
        }

        this._onClickOpenAirportDialog();
    }

    /**
     * @for UiController
     * @method onToggleLabels
     * @param {jquery event}
     */
    onToggleLabels(event) {
        $(event.target).closest(SELECTORS.DOM_SELECTORS.CONTROL).toggleClass(SELECTORS.CLASSNAMES.ACTIVE);

        this._eventBus.trigger(EVENT.TOGGLE_LABELS);
    }

    /**
     * @for UiController
     * @method onToggleRestrictedAreas
     */
    onToggleRestrictedAreas(event) {
        $(event.target).closest(SELECTORS.DOM_SELECTORS.CONTROL)
            .toggleClass(`${SELECTORS.DOM_SELECTORS.WARNING_BUTTON} ${SELECTORS.CLASSNAMES.ACTIVE}`);

        this._eventBus.trigger(EVENT.TOGGLE_RESTRICTED_AREAS);
    }

    /**
     * @for UiController
     * @method onToggleSids
     * @param event {jquery event}
     */
    onToggleSids(event) {
        $(event.target).closest(SELECTORS.DOM_SELECTORS.CONTROL).toggleClass(SELECTORS.CLASSNAMES.ACTIVE);

        this._eventBus.trigger(EVENT.TOGGLE_SID_MAP);
    }

    /**
     * @for UiController
     * @method onToggleStars
     * @param event {jquery event}
     */
    onToggleStars(event) {
        $(event.target).closest(SELECTORS.DOM_SELECTORS.CONTROL).toggleClass(SELECTORS.CLASSNAMES.ACTIVE);

        this._eventBus.trigger(EVENT.TOGGLE_STAR_MAP);
    }

    /**
     * @for UiController
     * @method onToggleTerrain
     * @param event {jquery event}
     */
    onToggleTerrain(event) {
        $(event.target).closest(SELECTORS.DOM_SELECTORS.CONTROL).toggleClass(SELECTORS.CLASSNAMES.ACTIVE);

        this._eventBus.trigger(EVENT.TOGGLE_TERRAIN);
    }

    /**
     * @for UiController
     * @method onToggleVideoMap
     * @param event {jquery event}
     */
    onToggleVideoMap(event) {
        $(event.target).closest(SELECTORS.DOM_SELECTORS.CONTROL).toggleClass(SELECTORS.CLASSNAMES.ACTIVE);

        this._eventBus.trigger(EVENT.TOGGLE_VIDEO_MAP);
    }

    /**
     * @for UiController
     * @method onToggleOptions
     */
    onToggleOptions() {
        this.$toggleOptions.toggleClass(SELECTORS.CLASSNAMES.ACTIVE);
        this.$optionsDialog.toggleClass(SELECTORS.CLASSNAMES.OPEN);
    }

    /**
     * @for UiController
     * @method onToggleTutorial
     */
    onToggleTutorial() {
        if (this.isTutorialDialogOpen()) {
            this.tutorialView.tutorial_close();

            return;
        }

        this.tutorialView.tutorial_open();
    }
}

export default new UiController();
