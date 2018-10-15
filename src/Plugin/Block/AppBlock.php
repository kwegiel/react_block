<?php
/**
 * @file
 * Contains \Drupal\react_block\Plugin\Block\AppBlock.
 */

 namespace Drupal\react_block\Plugin\Block; 
 use Drupal\Core\Block\BlockBase;

/**
 * Provides a 'React Block' block.
 *
 * @Block(
 *  id = "react_block",
 *  admin_label = @Translation("AppBlock"),
 * )
 */
 class AppBlock extends BlockBase {
    
      /**
       * {@inheritdoc}
       */
      public function build() {
        return array(
          '#markup' => '<div id="root"></div>',
          '#attached' => [
            'library' =>  [
                'react_block/react.block'
            ],
          ],
        );
      }
    
    }