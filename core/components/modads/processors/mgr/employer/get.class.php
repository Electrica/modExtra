<?php

/**
 * Get an Employer
 */
class modAdsEmployerGetProcessor extends modObjectGetProcessor {
	public $objectType = 'modAdsEmployer';
	public $classKey = 'modAdsEmployer';
	public $languageTopics = array('modads:default');
	//public $permission = 'view';


	/**
	 * We doing special check of permission
	 * because of our objects is not an instances of modAccessibleObject
	 *
	 * @return mixed
	 */
	public function process() {
		if (!$this->checkPermissions()) {
			return $this->failure($this->modx->lexicon('access_denied'));
		}

		return parent::process();
	}

}

return 'modAdsEmployerGetProcessor';