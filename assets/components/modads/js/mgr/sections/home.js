modAds.page.Home = function (config) {
	config = config || {};
	Ext.applyIf(config, {
		components: [{
			xtype: 'modads-panel-home', renderTo: 'modads-panel-home-div'
		}]
	});
	modAds.page.Home.superclass.constructor.call(this, config);
};
Ext.extend(modAds.page.Home, MODx.Component);
Ext.reg('modads-page-home', modAds.page.Home);