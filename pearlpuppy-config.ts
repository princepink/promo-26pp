/**
 *  @file   Pearlpuppy Configurations
 *    This file defines the requirements that must be fulfilled during the
 *    build process.
 */

/**
 *  Definition where the logo works being stored
 *  @caution ! to get this value, use logoWorksDir()
 *  @caution  this string must start and end with slashes
 *  @notice  SVGs stored this directory, automatically parade in 'Logo Works'
 *    section
 */
const LOGO_WORKS_PATH = '/src/assets/works/logos/';
const DUMMY_LOGOS_PATH = '/src/assets/dummy-svgs/';
const TEST_MODE = true;

/**
 *  Provides the logo works directory
 *  @param  slash - the way to express slashes in head and toe
 *    1: with leading slash, without trailing one
 *    0: no leading and trailing slash
 *    -1: without leading slash, with trailing one
 *    other number: (default) with both leading and trailing slashes
 */
export const logoWorksDir = (slash: number = 2) => {
  const path = TEST_MODE ? DUMMY_LOGOS_PATH : LOGO_WORKS_PATH;
  // default pattern
  if (Math.abs(slash) > 1) {
    return path;
  }
  // specific patterns (-1 to 1)
  return path.slice(Math.sign(slash + 1), path.length + Math.sign(slash - 1));
};

/**
 * -----------------------------
 *
 * -----------------------------
 */

/**
 *
 */

/**
 *
 */

/**
 *
 */

/**
 *
 */

/**
 *
 */

/**
 *
 */

//[EOF]*/
