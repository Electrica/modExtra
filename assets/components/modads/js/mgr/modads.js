var modAds = function (config) {
	config = config || {};
	modAds.superclass.constructor.call(this, config);
};
Ext.extend(modAds, Ext.Component, {
	page: {}, window: {}, grid: {}, tree: {}, panel: {}, combo: {}, config: {}, view: {}, utils: {}
});
Ext.reg('modads', modAds);

modAds = new modAds();