export const uniqueColorFromString = (name: string): string => {
  // Generate a unique color based on the componentName
  const hashCode = (str: string): number => str.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const HUE_MAX = 350;
  const uniqueColor = `hsl(${hashCode(name) % HUE_MAX}, 70%, 50%)`;

  return uniqueColor;
};

/**
 * Logs the name of a React component to the console in development mode
 * if the `VITE_APP_LOG_COMPONENT_NAME` environment variable is set to 'true'.
 *
 * @param componentName - The name of the component to log.
 *
 * @remarks
 * This utility is intended for debugging purposes during development.
 * Ensure that the `VITE_APP_LOG_COMPONENT_NAME` environment variable is properly configured
 * in your `.env` file to enable or disable this functionality.
 *
 * @example
 * ```tsx
 * logComponentNameInDevMode('MyComponent');
 * // Logs: " MyComponent " (uniquely styled) to the console in development mode
 * ```
 */
export const logComponentNameInDevMode = (componentName: string): void => {
  if (import.meta.env.MODE === 'development' && import.meta.env.VITE_APP_LOG_COMPONENT_NAME === 'true') {
    // eslint-disable-next-line no-console
    console.log(
      `%c ${componentName} `,
      `background: ${uniqueColorFromString(componentName)}; color: white; border-radius: 5px; padding: 1px;`,
    );
  }
};
