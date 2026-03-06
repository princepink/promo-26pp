/**
 *
 */
const SVG_MODULES = import.meta.glob('/src/**/*.svg');

/**
 *  Provides all SVG files under the directory
 */
export function getSVGModulesInDir(dirName: string) {
  return Object.fromEntries(
    Object.entries(SVG_MODULES).filter(([path]) => {
      return path.includes(`/${dirName}/`);
    }),
  );
}

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
