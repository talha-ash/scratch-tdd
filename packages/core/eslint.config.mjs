import tseslint from 'typescript-eslint';
import baseEslintConfigs from '../../eslint.config.mjs';
export default tseslint.config([...baseEslintConfigs]);
