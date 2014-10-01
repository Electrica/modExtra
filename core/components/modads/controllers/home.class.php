<?php

/**
 * The home manager controller for modAds.
 *
 */
class modAdsHomeManagerController extends modAdsMainController {
	/* @var modAds $modAds */
	public $modAds;


	/**
	 * @param array $scriptProperties
	 */
	public function process(array $scriptProperties = array()) {
	}


	/**
	 * @return null|string
	 */
	public function getPageTitle() {
		return $this->modx->lexicon('modads');
	}


	/**
	 * @return void
	 */
	public function loadCustomCssJs() {
		$this->addCss($this->modAds->config['cssUrl'] . 'mgr/main.css');
		$this->addCss($this->modAds->config['cssUrl'] . 'mgr/bootstrap.buttons.css');
		$this->addJavascript($this->modAds->config['jsUrl'] . 'mgr/misc/utils.js');
		$this->addJavascript($this->modAds->config['jsUrl'] . 'mgr/widgets/employer.grid.js');
        $this->addJavascript($this->modAds->config['jsUrl'] . 'mgr/widgets/applicants.grid.js');
		$this->addJavascript($this->modAds->config['jsUrl'] . 'mgr/widgets/employer.windows.js');
		$this->addJavascript($this->modAds->config['jsUrl'] . 'mgr/widgets/home.panel.js');
		$this->addJavascript($this->modAds->config['jsUrl'] . 'mgr/sections/home.js');
		$this->addHtml('<script type="text/javascript">
		Ext.onReady(function() {
			MODx.load({ xtype: "modads-page-home"});
		});
		</script>');
	}


	/**
	 * @return string
	 */
	public function getTemplateFile() {
		return $this->modAds->config['templatesPath'] . 'home.tpl';
	}
}