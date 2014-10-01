<?php
/** @noinspection PhpIncludeInspection */
if (file_exists(dirname(dirname(dirname(dirname(__FILE__)))) . '/config.core.php')) {
    require_once dirname(dirname(dirname(dirname(__FILE__)))) . '/config.core.php';
} else {
    require_once dirname(dirname(dirname(dirname(dirname(__FILE__))))) . '/config.core.php';
}
/** @noinspection PhpIncludeInspection */
require_once MODX_CORE_PATH . 'config/' . MODX_CONFIG_KEY . '.inc.php';
/** @noinspection PhpIncludeInspection */
require_once MODX_CONNECTORS_PATH . 'index.php';
/** @var modAds $modAds */
$modAds = $modx->getService('modads', 'modAds', $modx->getOption('modads_core_path', null, $modx->getOption('core_path') . 'components/modads/') . 'model/modads/');
$modx->lexicon->load('modads:default', 'modads:employer', 'modads:applicants');

// handle request
$corePath = $modx->getOption('modads_core_path', null, $modx->getOption('core_path') . 'components/modads/');
$path     = $modx->getOption('processorsPath', $modAds->config, $corePath . 'processors/');
$modx->request->handleRequest(array(
    'processors_path' => $path,
    'location'        => '',
));