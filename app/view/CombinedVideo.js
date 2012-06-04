Ext.define('BS.view.CombinedVideo', {
    extend: 'Ext.Container',
    alias: 'widget.combinedvideo',
    requires: [
        'Ext.Video',
        'BS.view.jwplayer.Base'
    ],

    config: {
        /**
         * @cfg {String} url
         * Location of the media to play.
         * @accessor
         */
        url: '',

        /**
         * @cfg {String} posterUrl
         * Location of a poster image to be shown before showing the video.
         * @accessor
         */
        posterUrl: null,

        layout: Ext.os.is.iOS ? 'fit' : {
            type: 'vbox',
            pack: 'center',
            align: 'center'
        }
    },

    createVideo: function() {
        var me = this,
            video = null;

        if (Ext.os.is.iOS) {
             video = Ext.create('Ext.Video', {
                url: me.getUrl(),
                posterUrl: me.getPosterUrl()
            });
        } else {
            video = Ext.create('BS.view.jwplayer.Base', {
                playerOptions: {
                    file: me.getUrl(),
                    image: me.getPosterUrl(),
                    width: 320, // set a width otherwise the video controls do not show on a smaller phone
                    height: 180
                }
            });
        }

        return video;
    },

    doInitialize: function() {
        var me = this,
            video = me.createVideo();

        me.add(video);

        me.on({
            activate      : 'onActivate',
            deactivate    : 'onDeactivate'
        });
    },

    //@private
    initialize: function() {
        this.callParent();
        this.doInitialize();
    },

    // @private
    onActivate: function() {
        var me = this,
            video = me.getActiveItem();

        if (video) {
            video.fireEvent('activate');
        }
    },

    // @private
    onDeactivate: function() {
        var me = this,
            video = me.getActiveItem();

        if (video) {
            video.fireEvent('deactivate');
        }
    }
});