/**
 * Cede control to the event loop for one tick, from within an async function.
 *
 * Usage:
 *
 *     // ... slow stuff...
 *     await tick() // will cede control
 *     // ... slow stuff...
 */
export function tick () {
  return new Promise(resolve => setTimeout(resolve, 0))
}

