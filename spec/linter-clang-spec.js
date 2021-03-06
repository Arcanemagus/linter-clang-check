'use babel';

import * as path from 'path';

const miPath = path.join(__dirname, 'files', 'missing_import');
const validPath = path.join(__dirname, 'files', 'valid.c');

describe('The Clang provider for AtomLinter', () => {
  const lint = require('../lib/main').provideLinter().lint;

  beforeEach(() => {
    waitsForPromise(() => atom.packages.activatePackage('linter-clang-check'));
  });

  it('finds nothing wrong with a valid file', () => {
    waitsForPromise(() =>
      atom.workspace.open(validPath).then(editor =>
        lint(editor).then((messages) => {
          expect(messages.length).toBe(0);
        }),
      ),
    );
  });

  it('finds a fatal error in "missing_import.c"', () => {
    waitsForPromise(() => atom.workspace.open(`${miPath}.c`).then(
      editor => lint(editor).then((messages) => {
        expect(messages.length).toEqual(1);
        expect(messages[0].type).toEqual('fatal error');
        expect(messages[0].text).toEqual("'nothing.h' file not found");
      }),
    ));
  });

  it('finds a fatal error in "missing_import.cpp"', () => {
    waitsForPromise(() => atom.workspace.open(`${miPath}.cpp`).then(
      editor => lint(editor).then((messages) => {
        expect(messages.length).toEqual(1);
        expect(messages[0].type).toEqual('fatal error');
        expect(messages[0].text).toEqual("'nothing.h' file not found");
      }),
    ));
  });

  it('finds a fatal error in "missing_import.m"', () => {
    waitsForPromise(() => atom.workspace.open(`${miPath}.m`).then(
      editor => lint(editor).then((messages) => {
        expect(messages.length).toEqual(1);
        expect(messages[0].type).toEqual('fatal error');
        expect(messages[0].text).toEqual("'nothing.h' file not found");
      }),
    ));
  });

  it('finds a fatal error in "missing_import.mm"', () => {
    waitsForPromise(() => atom.workspace.open(`${miPath}.mm`).then(
      editor => lint(editor).then((messages) => {
        expect(messages.length).toEqual(1);
        expect(messages[0].type).toEqual('fatal error');
        expect(messages[0].text).toEqual("'nothing.h' file not found");
      }),
    ));
  });
});
