import { deepEqual } from 'node:assert';
import test from 'node:test';

import validateNpmPackage from 'validate-npm-package';

import packageJson from '../package.json' with { type: 'json' };

const {
    author,
    bugs,
    files,
    homepage,
    keywords,
    license,
    name,
    repository,
    version
} = packageJson;

test('Validate NPM package', () => {
    const results:
        | validateNpmPackage.ValidNames
        | validateNpmPackage.InvalidNames
        | validateNpmPackage.LegacyNames = validateNpmPackage({
        author,
        bugs,
        files,
        homepage,
        keywords,
        license,
        name,
        repository,
        version
    });

    deepEqual(
        results,
        {
            validForNewPackages: true,
            validForOldPackages: true,
            warnings: [],
            errors: []
        },
        'NPM package has errors'
    );
});
