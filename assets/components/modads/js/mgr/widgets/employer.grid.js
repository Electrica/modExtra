modAds.grid.Employer = function (config) {
	config = config || {};
	if (!config.id) {
		config.id = 'modads-grid-employer';
	}
	Ext.applyIf(config, {
		url: modAds.config.connector_url,
		fields: this.getFields(config),
		columns: this.getColumns(config),
		tbar: this.getTopBar(config),
		sm: new Ext.grid.CheckboxSelectionModel(),
		baseParams: {
			action: 'mgr/employer/getlist'
		},
		listeners: {
			rowDblClick: function (grid, rowIndex, e) {
				var row = grid.store.getAt(rowIndex);
				this.updateItem(grid, e, row);
			}
		},
		viewConfig: {
			forceFit: true,
			enableRowBody: true,
			autoFill: true,
			showPreview: true,
			scrollOffset: 0,
			getRowClass: function (rec, ri, p) {
				return !rec.data.active
					? 'modads-row-disabled'
					: '';
			}
		},
		paging: true,
		remoteSort: true,
		autoHeight: true,
	});
	modAds.grid.Employer.superclass.constructor.call(this, config);

	// Clear selection on grid refresh
	this.store.on('load', function (a, b, c, d, e) {
		this.getSelectionModel().clearSelections();
	}, this);
};
Ext.extend(modAds.grid.Employer, MODx.grid.Grid, {
	windows: {},

	getMenu: function (grid, rowIndex) {
		var ids = this._getSelectedIds();

		var row = grid.getStore().getAt(rowIndex);
		var menu = modAds.utils.getMenu(row.data['actions'], this, ids);

		this.addContextMenuItem(menu);
	},

	createItem: function (btn, e) {
		var w = MODx.load({
			xtype: 'modads-employer-window-create',
			id: Ext.id(),
			listeners: {
				success: {
					fn: function () {
						this.refresh();
					}, scope: this
				}
			}
		});
		w.reset();
		w.setValues({active: true});
		w.show(e.target);
	},

	updateItem: function (btn, e, row) {
		if (typeof(row) != 'undefined') {
			this.menu.record = row.data;
		}
		else if (!this.menu.record) {
			return false;
		}
		var id = this.menu.record.id;

		MODx.Ajax.request({
			url: this.config.url,
			params: {
				action: 'mgr/employer/get',
				id: id
			},
			listeners: {
				success: {
					fn: function (r) {
						var w = MODx.load({
							xtype: 'modads-item-window-update',
							id: Ext.id(),
							record: r,
							listeners: {
								success: {
									fn: function () {
										this.refresh();
									}, scope: this
								}
							}
						});
						w.reset();
						w.setValues(r.object);
						w.show(e.target);
					}, scope: this
				}
			}
		});
	},

	removeItem: function (act, btn, e) {
		var ids = this._getSelectedIds();
		if (!ids.length) {
			return false;
		}
		MODx.msg.confirm({
			title: ids.length > 1
				? _('modads_items_remove')
				: _('modads_item_remove'),
			text: ids.length > 1
				? _('modads_items_remove_confirm')
				: _('modads_item_remove_confirm'),
			url: this.config.url,
			params: {
				action: 'mgr/employer/remove',
				ids: Ext.util.JSON.encode(ids),
			},
			listeners: {
				success: {
					fn: function (r) {
						this.refresh();
					}, scope: this
				}
			}
		});
		return true;
	},

	disableItem: function (act, btn, e) {
		var ids = this._getSelectedIds();
		if (!ids.length) {
			return false;
		}
		MODx.Ajax.request({
			url: this.config.url,
			params: {
				action: 'mgr/employer/disable',
				ids: Ext.util.JSON.encode(ids),
			},
			listeners: {
				success: {
					fn: function () {
						this.refresh();
					}, scope: this
				}
			}
		})
	},

	enableItem: function (act, btn, e) {
		var ids = this._getSelectedIds();
		if (!ids.length) {
			return false;
		}
		MODx.Ajax.request({
			url: this.config.url,
			params: {
				action: 'mgr/employer/enable',
				ids: Ext.util.JSON.encode(ids),
			},
			listeners: {
				success: {
					fn: function () {
						this.refresh();
					}, scope: this
				}
			}
		})
	},

	getFields: function (config) {
		return ['id', 'org_form', 'name', 'city', 'description', 'active', 'actions'];
	},

	getColumns: function (config) {
		return [{
			header: _('modads_item_id'),
			dataIndex: 'id',
			sortable: true,
			width: 70
		},{
            header: _('modads_employer_org_form'),
            dataIndex: 'org_form',
            sortable: true
        },{
			header: _('modads_mployer_city'),
			dataIndex: 'city',
			sortable: true,
			width: 200,
		}, {
			header: _('modads_employer_block'),
			dataIndex: 'block',
			sortable: false,
			width: 250,
		}, {
			header: _('modads_employer_mmoderation'),
			dataIndex: 'moderation',
			renderer: modAds.utils.renderBoolean,
			sortable: true,
			width: 100,
		}, {
			header: _('modads_employer_actions'),
			dataIndex: 'actions',
			renderer: modAds.utils.renderActions,
			sortable: false,
			width: 100,
			id: 'actions'
		}];
	},

	getTopBar: function (config) {
		return [{
			text: '<i class="icon icon-plus">&nbsp;' + _('modads_employer_create'),
			handler: this.createItem,
			scope: this
		}, '->', {
			xtype: 'textfield',
			name: 'query',
			width: 200,
			id: config.id + '-search-field',
			emptyText: _('modads_grid_search'),
			listeners: {
				render: {
					fn: function (tf) {
						tf.getEl().addKeyListener(Ext.EventObject.ENTER, function () {
							this._doSearch(tf);
						}, this);
					}, scope: this
				}
			}
		}, {
			xtype: 'button',
			id: config.id + '-search-clear',
			text: '<i class="icon icon-times"></i>',
			listeners: {
				click: {fn: this._clearSearch, scope: this}
			}
		}];
	},

	onClick: function (e) {
		var elem = e.getTarget();
		if (elem.nodeName == 'BUTTON') {
			var row = this.getSelectionModel().getSelected();
			if (typeof(row) != 'undefined') {
				var action = elem.getAttribute('action');
				if (action == 'showMenu') {
					var ri = this.getStore().find('id', row.id);
					return this._showMenu(this, ri, e);
				}
				else if (typeof this[action] === 'function') {
					this.menu.record = row.data;
					return this[action](this, e);
				}
			}
		}
		return this.processEvent('click', e);
	},

	_getSelectedIds: function () {
		var ids = [];
		var selected = this.getSelectionModel().getSelections();

		for (var i in selected) {
			if (!selected.hasOwnProperty(i)) {
				continue;
			}
			ids.push(selected[i]['id']);
		}

		return ids;
	},

	_doSearch: function (tf, nv, ov) {
		this.getStore().baseParams.query = tf.getValue();
		this.getBottomToolbar().changePage(1);
		this.refresh();
	},

	_clearSearch: function (btn, e) {
		this.getStore().baseParams.query = '';
		Ext.getCmp(this.config.id + '-search-field').setValue('');
		this.getBottomToolbar().changePage(1);
		this.refresh();
	}
});
Ext.reg('modads-grid-employer', modAds.grid.Employer);


modAds.combo.Orgform = function(config) {
    config = config || {};
    Ext.applyIf(config,{
        store: new Ext.data.ArrayStore({
            id: 0
            ,fields: ['unit']
            ,data: [
                ['ТОО']
                ,['ИП']
                ,['АО']
                ,['Фонд']
                ,['Общ.Орг.']
                ,['Нек.Орг.']
                ,['ГКП']
                ,['Другое']
            ]
        })
        ,mode: 'local'
        ,displayField: 'unit'
        ,valueField: 'unit'
    });
    modAds.combo.Orgform.superclass.constructor.call(this,config);
};
Ext.extend(modAds.combo.Orgform,MODx.combo.ComboBox);
Ext.reg('modads-combo-orgform',modAds.combo.Orgform);


modAds.combo.City = function(config) {
    config = config || {};
    Ext.applyIf(config,{
        store: new Ext.data.ArrayStore({
            id: 0
            ,fields: ['unit']
            ,data: [
                ['Алматы']
                ,['Астана']
                ,['Караганда']
                ,['Костанай']
                ,['Павлодар']
                ,['Усть-Каменогороск']
                ,['Актау']
                ,['Актобе']
                ,['Капшагай']
                ,['Атырау']
                ,['Ерейментау']
                ,['Жезказган']
                ,['Кызылорда']
                ,['Лисаковск']
                ,['Петропавловск']
                ,['Рудный']
                ,['Семей']
                ,['Степногорск']
                ,['Талгар']
                ,['Талдыкурган']
                ,['Тараз']
                ,['Темиртау']
                ,['Уральс']
                ,['Шимкент']
                ,['Экибастуз']
                ,['Щучинск']
                ,['Степняк']
                ,['Каскелен']
                ,['Аркалык']
                ,['Есик']
            ]
        })
        ,mode: 'local'
        ,displayField: 'unit'
        ,valueField: 'unit'
    });
    modAds.combo.City.superclass.constructor.call(this,config);
};
Ext.extend(modAds.combo.City,MODx.combo.ComboBox);
Ext.reg('modads-combo-city',modAds.combo.City);


