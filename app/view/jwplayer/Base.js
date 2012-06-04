Ext.define('BS.view.jwplayer.Base', {
    extend: 'Ext.Container',
    alias: 'widget.jwplayer',

    config: {
        /**
         * @event playerrender
         * Fired when Player initially rendered.
         * @param {BS.view.jwplayer.Base} this
         * @param {jwplayer} player The rendered JW Player instance
         */

        /**
         * @cfg {jwplayer} player The rendered JW Player instance
         * The wrapped player.
         * @accessor
         */
        player: null,

        /**
         * @cfg {Object} playerOptions
         * PlayerOptions as specified by the JW Player Documentation:
         * http://www.longtailvideo.com/support/jw-player/jw-player-for-flash-v5/15995/jw-embedder-reference-guide
         * @accessor
         */
        playerOptions: {
            controlbar: 'bottom',
            //'width': 320,
            //'height': 384,
            modes: [
                { type: "html5" },
                { type: "flash", src: "resources/jwplayer/player.swf" },
                { type: "download" }
            ]
        },

        /**
         * @cfg {Boolean} autoResume
         * Will automatically start playing the media when the container is activated.
         * @accessor
         */
        autoResume: false,

        layout: 'fit'
    },

    constructor: function() {
        var me = this;
        me.callParent(arguments);
        me.element.setVisibilityMode(Ext.Element.OFFSETS);

        if (!(window.jwplayer || {}).version) {
            me.setHtml('JW Player is required');
        }
    },

    initialize: function() {
        var me = this;
        me.callParent();

        me.on({
            scope: me,
            
            painted   : me.renderPlayer,
            activate  : me.onActivate,
            deactivate: me.onDeactivate
        });
        me.element.on('touchstart', 'onTouchStart', me);
    },

    onTouchStart: function(e) {
        e.makeUnpreventable();
    },

    applyPlayerOptions: function(options) {
        return Ext.merge({}, this.options, options);
    },

    getPlayerOptions: function() {
        return Ext.merge({}, this.options || this.getInitialConfig('playerOptions'));
    },

    // @private
    renderPlayer: function() {
        var me = this,
            jw = window.jwplayer,
            element = me.element,
            playerOptions = me.getPlayerOptions(),
            player = me.getPlayer();

        if (element.dom.firstChild) {
            Ext.fly(element.dom.firstChild).destroy();
        }

        me.setPlayer(jw(me.getId()).setup(playerOptions));
        player = me.getPlayer();

        me.fireEvent('playerrender', me, player);
    },

    // @private
    destroy: function() {
        var me = this,
            player = me.getPlayer();

        if (player) {
            player.remove();
        }

        this.callParent();
    },

    /**
     * Returns if the media is currently playing
     * @return {Boolean} playing True if the media is playing
     */
    isPlaying: function() {
        var me = this,
            player = me.getPlayer(),
            state = player ? player.getState() : false;

        return state == 'BUFFERING' || state == 'PLAYING';
    },

    // @private
    onActivate: function() {
        var me = this;

        if (me.getAutoResume() && !me.isPlaying()) {
            me.play();
        }
    },

    // @private
    onDeactivate: function() {
        var me = this,
            player = me.getPlayer();

        if (me.isPlaying()) {
            me.stop();
        }
    },

    /**
     * Starts or resumes jwplayer playback
     */
    play: function() {
        var me = this,
            player = me.getPlayer();

        if (player) {
            player.play(true);
        }
    },

    /**
     * Pauses jwplayer playback
     */
    pause: function() {
        var me = this,
            player = me.getPlayer();

        if (player) {
            player.pause(true);
        }
    },

    /**
     * Toggles the jwplayer playback state
     */
    toggle: function() {
        var me = this,
            player = me.getPlayer();

        if (player) {
            player.play();
        }
    },

    /**
     * Stops jwplayer playback and returns to the beginning
     */
    stop: function() {
        var me = this,
            player = me.getPlayer();

        if (player) {
            player.stop();
        }
    }
});