/// <reference types="cypress" />

import {
  random,
  closeThePopups,
  skipTheWelcomeScreen
} from './utils'

before(() => {
  skipTheWelcomeScreen()
})

it('allows adding of a canvas', () => {
  cy.visit('app/canvas#/');
  closeThePopups();
  cy.get('[data-test-subj="create-workpad-button"]')
    .should('be.visible')
    .forceClick();
  cy.fixture('testdata').then((td) => {
    cy.get('input[value="My Canvas Workpad"]').clear().type(`${td.workpadName}${random}`);
  });

  cy.get('[data-test-subj="add-element-button"]')
    .should('have.text', 'Add element')
    .forceClick();
  cy.contains('span', 'Text').forceClick();
  cy.visit('app/canvas#/');
  cy.fixture('testdata').then((td) => {
    cy.contains(`${td.workpadName}${random}`).should('be.visible');
  });
})
