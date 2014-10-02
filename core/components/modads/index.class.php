<?php

/**
 * Class modAdsMainController
 */
abstract class modAdsMainController extends modExtraManagerController {
	/** @var modAds $modAds */
	public $modAds;


	/**
	 * @return void
	 */
	public function initialize() {
		$corePath = $this->modx->getOption('modads_core_path', null, $this->modx->getOption('core_path') . 'components/modads/');
		require_once $corePath . 'model/modads/modads.class.php';

		$this->modAds = new modAds($this->modx);
		$this->addCss($this->modAds->config['cssUrl'] . 'mgr/main.css');
		$this->addJavascript($this->modAds->config['jsUrl'] . 'mgr/modads.js');
        $this->addJavascript($this->modAds->config['jsUrl'] . 'mgr/custom/jQuery.js');
        $this->addJavascript($this->modAds->config['jsUrl'] . 'mgr/custom/ckeditor.js');
        $this->addJavascript($this->modAds->config['jsUrl'] . 'mgr/custom/custom.js');
		$this->addHtml('
		<script type="text/javascript">
			modAds.config = ' . $this->modx->toJSON($this->modAds->config) . ';
			modAds.config.connector_url = "' . $this->modAds->config['connectorUrl'] . '";
		</script>
		');

		parent::initialize();
	}


	/**
	 * @return array
	 */
	public function getLanguageTopics() {
		return array('modads:default','modads:employer','modads:applicants');
	}


	/**
	 * @return bool
	 */
	public function checkPermissions() {
		return true;
	}
}


/**
 * Class IndexManagerController
 */
class IndexManagerController extends modAdsMainController {

	/**
	 * @return string
	 */
	public static function getDefaultController() {
		return 'home';
	}
}