/**
 * # FormButton-test.js
 *
 * This class tests that the form button displays correctly
 *
 * *Note:* if you want to understand the structures here, add a
 * ```console.log``` and then ```npm test```.
 */
'use strict';
console.log('=== start test ===');

jest.autoMockOff();

/**
* ## Imports
 */

const React = require('react-native');
const { View } = React;

const utils = require('react-addons-test-utils');

/**
 * ## Under test
 * class under test
 */
jest.dontMock('../searchPost');
var SearchPost = require('../searchPost');

/**
 * ## Test
 */
describe('searchPost', () => {
  console.log('=== test searchPost ===');
  let searchPost;

  const searchPostProps = {};

  function renderFormSearchPost(props) {
    const renderer = utils.createRenderer();
    renderer.render(<SearchPost {...props}/>);
    const output = renderer.getRenderOutput();

    return {
      props,
      output,
      renderer
    };
  }
  /**
   * ### beforeEach
   * before each test, render the form button with the default props
   */
  beforeEach(() => {
    console.log('=== beforeEach ===');
    searchPost = renderFormSearchPost(searchPostProps);
    console.log('searchPost', searchPost);
  });

  it('should be fine', () => {
    const {output} = searchPost;
    expect(output.type).toEqual(View);
  });

  // /**
  //  * ### it should display text
  //  * the button should be disabled and have the correct text
  //  */
  // it('should display text', () => {
  //   const {output} = formButton;
  //   const button = output.props.children;
  //   expect(button.props.isDisabled).toEqual(buttonProps.isDisabled);
  //   const buttonText = button.props.children;
  //   expect(buttonText).toEqual(buttonProps.buttonText);
  // });
});//describe FormButton
