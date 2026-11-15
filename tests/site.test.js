
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const raiz = path.join(__dirname, '..');

test('A página inicial existe', () => {
    assert.ok(fs.existsSync(path.join(raiz, 'index.html')));
});

test('A página de cadastro existe', () => {
    assert.ok(fs.existsSync(path.join(raiz, 'cadastro.html')));
});

test('A página de projetos existe', () => {
    assert.ok(fs.existsSync(path.join(raiz, 'projetos.html')));
});

test('A página administrativa existe', () => {
    assert.ok(fs.existsSync(path.join(raiz, 'admin.html')));
});

test('A pasta CSS existe', () => {
    assert.ok(fs.existsSync(path.join(raiz, 'css')));
});

test('A pasta JavaScript existe', () => {
    assert.ok(fs.existsSync(path.join(raiz, 'js')));
});

