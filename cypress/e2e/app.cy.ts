describe('Initial test', () => {
  it('should pass a test', () => {
    expect(true).to.equal(true);
  });

  it('should run a test', () => {
    cy.visit('/');
    cy.contains('SkillGrow');
  });
});
