Ext.define('BS.view.IframeVideo', {
    extend: 'Ext.Container',
    xtype: 'iframevideo',

    config: {
        tpl: new Ext.XTemplate(
            '{[this.renderMedia(values)]}',
            {
                renderMedia: function(media) {
                    if (media.video_id) {
                        if (media.video_host == 'vimeo') {
                            return '<div class="video vimeo"><iframe class="vimeo-player" type="text/html" width="320" height="180" src="http://player.vimeo.com/video/'+media.video_id+'?byline=0&amp;portrait=0&amp;color=ffffff" frameborder="0"></iframe></div>';
                        } else {
                            return '<div class="video youtube"><iframe class="youtube-player" type="text/html" width="320" height="180" src="http://www.youtube.com/embed/'+media.video_id+'" frameborder="0"></iframe></div>';
                        }
                    }
                }
            }
        )
    }
});