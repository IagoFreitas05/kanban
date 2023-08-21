import subtract from "./subtract";

describe("Subtraction", () => {
  it("should subtract 1 - 1 and return 0", () => {
    expect(subtract(1, 1)).toBe(0);
  });
});
