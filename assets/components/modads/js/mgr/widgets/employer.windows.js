modAds.window.CreateEmployer = function (config) {
	config = config || {};
	if (!config.id) {
		config.id = 'modads-employer-window-create';
	}
	Ext.applyIf(config, {
		title: _('modads_employer_create'),
		width: 1000,
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
            xtype: 'modx-tabs',
            defaults: {border: false, autoHeight: true},
            border: true,
            hideMode: 'offsets',
            items: [{
                title: _('modads_employer_contact_details'),
                layout: 'anchor',
                items: [{
                    html: _('modads_employer_contact_details_intro'),
                    cls: 'panel-desc'
                },{
                    layout: 'column',
                    border: 'false',
                    anchor: '100%',
                    items: [{
                        columnWidth: .5
                        ,layout: 'form',
                        defaults: {msTarget: 'under'},
                        border: 'false',
                        items: [{
                            xtype: 'textfield',
                            fieldLabel: _('modads_employer_contact_name'),
                            anchor: '99%',
                            name: 'modads_employer_contact_name'
                        },{
                            xtype: 'textfield',
                            fieldLabel: _('modads_employer_contact_surname'),
                            anchor: '99%',
                        },{
                            xtype: 'textfield',
                            fieldLabel: _('modads_employer_contact_lastname'),
                            anchor: '99%',
                        },{
                            xtype: 'textfield',
                            fieldLabel: _('modads_employer_contact_post'),
                            anchor: '99%',
                        }]
                    },{
                        columnWidth: .5,
                        layout: 'form',
                        defaults: {msTarget: 'under'},
                        border: 'false',
                        anchor: '99%',
                        items: [{
                            xtype: 'checkbox', //asdasdasd
                            fieldLabel: _('modads_employer_contact_on_main'),
                            anchor: '99%',
                        },{
                            layout: 'column',
                            border: 'true',
                            style: 'margin-top: 30px',
                            anchor: '99%',
                            items: [{
                                columnWidth: .3,
                                layout: 'form',
                                defaults: {msTarget: 'under'},
                                border: 'false',
                                anchor: '99%',
                                items: [{
                                    xtype: 'textfield',
                                    fieldLabel: _('modads_employer_contact_phone_ekstensi'),
                                    anchor: '99%'
                                }]
                            },{
                                columnWidth: .7,
                                layout: 'form',
                                defaults: {msTarget: 'under'},
                                border: 'false',
                                anchor: '99%',
                                items: [{
                                    xtype: 'textfield',
                                    fieldLabel: _('modads_employer_contact_phone'),
                                    anchor: '99%'
                                }]
                            }]
                        },{
                            xtype: 'textfield',
                            fieldLabel: _('modads_employer_contact_email'),
                            anchor: '99%'
                        },{
                            xtype: 'textfield',
                            fieldLabel: _('modads_employer_contact_password'),
                            anchor: '99%'
                        }]
                    }]
                }]
            },{
                title: _('modads_employer_organization_details'),
                layuot: 'anchor',
                items: [{
                    html: _('modads_employer_organization_details_intro'),
                    cls: 'panel-desc'
                },{
                    layout: 'column',
                    border: 'false',
                    anchor: '99%',
                    items: [{
                        columnWidth: .2,
                        layout: 'form',
                        defaults: {msTarget: 'under'},
                        border: 'false',
                        anchor: '99%',
                        items: [{
                            xtype: 'modads-combo-orgform',
                            fieldLabel: _('modads_employer_contact_org_form'),
                            anchor: '99%'
                        }]
                    },{
                        columnWidth: .6,
                        layout: 'form',
                        defaults: {msTarget: 'under'},
                        border: 'false',
                        anchor: '99%',
                        items: [{
                            xtype: 'textfield',
                            fieldLabel: _('modads_employer_contact_org_name'),
                            anchor: '99%'
                        }]
                    },{
                        columnWidth: .2,
                        layout: 'form',
                        defaults: {msTarget: 'under'},
                        border: 'false',
                        anchor: '99%',
                        items: [{
                            xtype: 'modads-combo-city',
                            fieldLabel: _('modads_employer_contact_city'),
                            anchor: '99%'
                        }]
                    }]
                },{
                    layout: 'form',
                    border: false,
                    style: 'margin-top: 20px',
                    anchor: '100%',
                    items: [{
                        xtype: 'textarea',
                        fieldLabel: _('modads_employer_contact_description'),
                        anchor: '100%',
                        cls: 'ckeditor',
                        name: 'editor1'
                    }]
                }]
            },{
                title: _('modads_employer_moderation'),
                layout: 'anchor',
                items: [{
                    html: _('modads_employer_moderation_intro'),
                    cls: 'panel-desc'
                }]
            }]
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