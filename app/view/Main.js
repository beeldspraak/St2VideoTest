Ext.define("BS.view.Main", {
    extend: 'Ext.tab.Panel',
    requires: [
        'Ext.TitleBar',
        'Ext.Video',
        'BS.view.jwplayer.Base',
        'BS.view.IframeVideo',
        'BS.view.CombinedVideo'
    ],
    config: {
        tabBarPosition: 'bottom',

        items: [
            {
                title: 'Welcome',
                iconCls: 'home',

                styleHtmlContent: true,
                scrollable: true,

                items: {
                    docked: 'top',
                    xtype: 'titlebar',
                    title: 'Welcome to Sencha Touch 2'
                },

                html: [
                    "You've just generated a new Sencha Touch 2 project. What you're looking at right now is the ",
                    "contents of <a target='_blank' href=\"app/view/Main.js\">app/view/Main.js</a> - edit that file ",
                    "and refresh to change what's rendered here."
                ].join("")
            },
            {
                title: 'Ext.Video',
                iconCls: 'action',

                items: [
                    {
                        docked: 'top',
                        xtype: 'titlebar',
                        title: 'Video'
                    },
                    {
                        xtype: 'video',
                        url: 'http://www.longtailvideo.com/jw/upload/bunny.mp4',
                        posterUrl: 'http://www.longtailvideo.com/jw/upload/bunny.jpg'
                    }
                ]
            },
            {
                title: 'JW Video',
                iconCls: 'action',
//                layout: {
//                    type: 'vbox',
//                    pack: 'center',
//                    align: 'center'
//                },

                items: [
                    {
                        docked: 'top',
                        xtype: 'titlebar',
                        title: 'JW Player example'
                    },
                    {
                        xtype: 'jwplayer',
                        playerOptions: {
                            file: 'http://www.longtailvideo.com/jw/upload/bunny.mp4',
                            image: 'http://www.longtailvideo.com/jw/upload/bunny.jpg',
                            width: 320, // set a width otherwise the video controls do not show on a smaller phone
                            height: 180
                        }
                    }
                ],

                listeners: {
                    activate: function() {
                        var me = this,
                            player = me.down('jwplayer');

                        player.fireEvent('activate', me);
                    },
                    deactivate: function() {
                        var me = this,
                            player = me.down('jwplayer');

                        player.fireEvent('deactivate', me);
                    }
                }
            },
            {
                title: 'JW / Ext.Video',
                iconCls: 'action',
                layout: 'fit',

                items: [
                    {
                        docked: 'top',
                        xtype: 'titlebar',
                        title: 'Ext.Video (iOS) / JW'
                    },
                    {
                        xtype: 'combinedvideo',
                        url: 'http://www.longtailvideo.com/jw/upload/bunny.mp4',
                        posterUrl: 'http://www.longtailvideo.com/jw/upload/bunny.jpg'
                    }
                ],

                listeners: {
                    activate: function() {
                        var me = this,
                            player = me.down('combinedvideo');

                        player.fireEvent('activate', me);
                    },
                    deactivate: function() {
                        var me = this,
                            player = me.down('combinedvideo');

                        player.fireEvent('deactivate', me);
                    }
                }
            }
//            {
//                title: 'JW Youtube',
//                iconCls: 'action',
////                layout: {
////                    type: 'vbox',
////                    pack: 'center',
////                    align: 'center'
////                },
//
//                items: [
//                    {
//                        docked: 'top',
//                        xtype: 'titlebar',
//                        title: 'JW Player Youtube example'
//                    },
//                    {
//                        xtype: 'jwplayer',
//                        playerOptions: {
//                            file: 'http://www.youtube.com/watch?v=YE7VzlLtp-4',
//                            image: 'http://www.longtailvideo.com/jw/upload/bunny.jpg',
//                            width: 320, // set a width otherwise the video controls do not show on a smaller phone,
//                            height: 180,
//                            controlbar: 'none',
//                            events: {
//                                onReady: function() {
//                                    if (Ext.os.is.iOS) {
//                                        this.play();
//                                    }
//                                }
//                            }
//                        }
//                    }
//                ]
//            },
//            {
//                title: 'Youtube',
//                iconCls: 'action',
//
//                items: [
//                    {
//                        docked: 'top',
//                        xtype: 'titlebar',
//                        title: 'Youtube embed example'
//                    },
//                    {
//                        xtype: 'iframevideo',
//                        data: {
//                            video_host: 'youtube',
//                            video_id: 'YE7VzlLtp-4'
//                        }
//                    }
//                ]
//            }
        ]
    }
});
