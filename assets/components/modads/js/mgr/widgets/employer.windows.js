modAds.window.CreateEmployer = function (config) {
	config = config || {};
	if (!config.id) {
		config.id = 'modads-employer-window-create';
	}
	Ext.applyIf(config, {
		title: _('modads_item_create'),
		width: 550,
		autoHeight: true,
		url: modAds.config.connector_url,
		action: 'mgr/employer/create',
		fields: this.getFields(config),
		keys: [{
			key: Ext.EventObject.ENTER, shift: true, fn: function () {
				this.submit()
			}, scope: this
		}]
	});
	modAds.window.CreateEmployer.superclass.constructor.call(this, config);
};
Ext.extend(modAds.window.CreateEmployer, MODx.Window, {

	getFields: function (config) {
		return [{
			xtype: 'textfield',
			fieldLabel: _('modads_item_name'),
			name: 'name',
			id: config.id + '-name',
			anchor: '99%',
			allowBlank: false,
		}, {
			xtype: 'textarea',
			fieldLabel: _('modads_item_description'),
			name: 'description',
			id: config.id + '-description',
			height: 150,
			anchor: '99%'
		}, {
			xtype: 'xcheckbox',
			boxLabel: _('modads_item_active'),
			name: 'active',
			id: config.id + '-active',
			checked: true,
		}];
	}

});
Ext.reg('modads-employer-window-create', modAds.window.CreateEmployer);


modAds.window.UpdateEmployer = function (config) {
	config = config || {};
	if (!config.id) {
		config.id = 'modads-item-window-update';
	}
	Ext.applyIf(config, {
		title: _('modads_item_update'),
		width: 550,
		autoHeight: true,
		url: modAds.config.connector_url,
		action: 'mgr/employer/update',
		fields: this.getFields(config),
		keys: [{
			key: Ext.EventObject.ENTER, shift: true, fn: function () {
				this.submit()
			}, scope: this
		}]
	});
	modAds.window.UpdateEmployer.superclass.constructor.call(this, config);
};
Ext.extend(modAds.window.UpdateEmployer, MODx.Window, {

	getFields: function (config) {
		return [{
			xtype: 'hidden',
			name: 'id',
			id: config.id + '-id',
		}, {
			xtype: 'textfield',
			fieldLabel: _('modads_item_name'),
			name: 'name',
			id: config.id + '-name',
			anchor: '99%',
			allowBlank: false,
		}, {
			xtype: 'textarea',
			fieldLabel: _('modads_item_description'),
			name: 'description',
			id: config.id + '-description',
			anchor: '99%',
			height: 150,
		}, {
			xtype: 'xcheckbox',
			boxLabel: _('modads_item_active'),
			name: 'active',
			id: config.id + '-active',
		}];
	}

});
Ext.reg('modads-employer-window-update', modAds.window.UpdateEmployer);