<?php

/**
 * @file
 * Contains \Drupal\react_block\ReactBlock.
 */

namespace Drupal\react_block\Controller;

use \Drupal\Core\Controller\ControllerBase;

class ReactBlock extends ControllerBase {
  /**
   * Display the markup.
   *
   * @return array
   */
   public function content() {
     return array(
       '#type' => 'markup',
       '#markup' => $this->t('React Block'),
       '#attached' => [
          'library' =>  [
              'react_block/react.block'
          ],
        ],
     );
   }
}