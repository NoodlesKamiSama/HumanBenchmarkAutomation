/// <reference types="cypress" />

describe('Human Benchmark', () => {
    beforeEach(() => {
        cy.visit('https://humanbenchmark.com/');
    })

    it('Reaction Time', () => {
        cy.get('a').find('h3').contains('Reaction Time').click();
        cy.get('.view-splash').click();
        cy.get('.view-go', { timeout: 30 * 1000 }).click();
        cy.get('.view-result').find('h1').invoke('text').then((txt) => cy.task('log', txt))
    })

    it('Aim Trainer', () => {
        cy.get('a').find('h3').contains('Aim Trainer').click();
        for (let i=0; i <= 30; i++) {
            cy.get('[data-aim-target="true"]')
                .find('div:nth-child(1)').click({force: true})
        }
        cy.get('h1').then($obj => cy.task('log', $obj.text()))
    })

    it('Typing Test', () => {
        cy.get('a').find('h3').contains('Typing').click();
        cy.get('.letters').then(letter => {
            cy.get('.letters').type(letter.text());
        })
        cy.get('h1').then($obj => cy.task('log', $obj.text()))
    })
})