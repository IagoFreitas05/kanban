import subtract from "./subtract";

// Descrevendo o teste usando o método describe
describe("Subtraction", () => {
  // Teste específico usando o método it
  it("should subtract 1 - 1 and return 0", () => {
    // Chama a função de subtração e verifica se o resultado é igual a 0
    expect(subtract(1, 1)).toBe(0);
  });
});
