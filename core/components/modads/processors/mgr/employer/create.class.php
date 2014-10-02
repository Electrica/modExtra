<?php

/**
 * Create an Item
 */
class modAdsEmployerCreateProcessor extends modObjectCreateProcessor {
	public $objectType = 'modAdsEmployer';
	public $classKey = 'modAdsEmployer';
	public $languageTopics = array('modads');
	//public $permission = 'create';


	/**
	 * @return bool
	 */
	public function beforeSet() {
		$name = trim($this->getProperty('modads_employer_contact_name'));
		if (empty($name)) {
			$this->modx->error->addField('modads_employer_contact_name', $this->modx->lexicon('modads_employer_contact_name_err'));
		}
		elseif ($this->modx->getCount($this->classKey, array('name' => $name))) {
			$this->modx->error->addField('name', $this->modx->lexicon('modads_item_err_ae'));
		}

		return parent::beforeSet();
	}

}

return 'modAdsEmployerCreateProcessor';