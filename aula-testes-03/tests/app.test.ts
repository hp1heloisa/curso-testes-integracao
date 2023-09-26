import calculator from "../src/calculator"

describe ("testes de matemática", () => {
    it("soma", () => {
        expect(calculator.sum(2,3)).toBe(2+3);
    });

    it("subtracao", () => {
        expect(calculator.sub(5,2)).toBe(5-2);
    });

    it("multiplicacao", () => {
        expect(calculator.mul(5,2)).toBe(5*2);
    });
    it("divisao", () => {
        expect(calculator.div(10,2)).toBe(10/2);
    });
})